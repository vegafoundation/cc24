-- ============================================================================
-- CC24 Database Schema
-- Entwickelt aus VEGA Enterprise Wisdom
-- PostgreSQL 16
-- ============================================================================

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Für Text-Suche

-- ============================================================================
-- DEALERS (Autohändler)
-- ============================================================================

CREATE TABLE dealers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'DE',
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_listings INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0.0,
    vega_commission DECIMAL(12,2) DEFAULT 0.0,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_dealers_status ON dealers(status);
CREATE INDEX idx_dealers_city ON dealers(city);

-- ============================================================================
-- VEHICLES (Fahrzeuge)
-- ============================================================================

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dealer_id UUID REFERENCES dealers(id) ON DELETE CASCADE,
    
    -- Basic Info
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    mileage INTEGER NOT NULL,
    fuel VARCHAR(50) NOT NULL, -- 'Benzin', 'Diesel', 'Elektro', 'Hybrid'
    transmission VARCHAR(50), -- 'Automatik', 'Schaltgetriebe'
    power INTEGER, -- PS
    color VARCHAR(50),
    
    -- Pricing
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    
    -- Description
    description TEXT,
    features JSONB, -- Array von Features
    
    -- Images
    images JSONB, -- Array von Bild-URLs
    images_360 JSONB, -- 360° Sequenz URLs
    vavsr_showroom_id UUID,
    
    -- Valuation
    buy_price DECIMAL(10,2),
    market_value DECIMAL(10,2),
    vega_score INTEGER, -- 0-100
    
    -- Status
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'active', 'sold', 'archived'
    featured BOOLEAN DEFAULT FALSE,
    
    -- SEO
    slug VARCHAR(255) UNIQUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    published_at TIMESTAMP,
    sold_at TIMESTAMP
);

CREATE INDEX idx_vehicles_dealer ON vehicles(dealer_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX idx_vehicles_price ON vehicles(price);
CREATE INDEX idx_vehicles_year ON vehicles(year);
CREATE INDEX idx_vehicles_slug ON vehicles(slug);
CREATE INDEX idx_vehicles_search ON vehicles USING gin(to_tsvector('german', make || ' ' || model || ' ' || COALESCE(description, '')));

-- ============================================================================
-- FINANCING REQUESTS (Finanzierungsanfragen)
-- ============================================================================

CREATE TABLE financing_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    dealer_id UUID REFERENCES dealers(id) ON DELETE CASCADE,
    customer_id UUID, -- Kann auf customers Tabelle verweisen
    
    -- Request Data
    kaufpreis DECIMAL(10,2) NOT NULL,
    Anzahlung DECIMAL(10,2) NOT NULL,
    laufzeit INTEGER NOT NULL, -- Monate
    sollzinssatz DECIMAL(5,2) NOT NULL,
    
    -- Calculated
    nettodarlehensbetrag DECIMAL(10,2),
    monatlicheRate DECIMAL(10,2),
    gesamtbetrag DECIMAL(10,2),
    effektiverJahreszins DECIMAL(5,2),
    totalInterest DECIMAL(10,2),
    vega_commission DECIMAL(10,2),
    
    -- Customer Info
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    credit_score INTEGER,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'completed'
    
    -- PAngV Compliance
    pangv_compliant BOOLEAN DEFAULT TRUE,
    representative_example TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    approved_at TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE INDEX idx_financing_vehicle ON financing_requests(vehicle_id);
CREATE INDEX idx_financing_dealer ON financing_requests(dealer_id);
CREATE INDEX idx_financing_status ON financing_requests(status);
CREATE INDEX idx_financing_created ON financing_requests(created_at);

-- ============================================================================
-- SHOWROOMS (VAVSR 360° Showrooms)
-- ============================================================================

CREATE TABLE showrooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    dealer_id UUID REFERENCES dealers(id) ON DELETE CASCADE,
    
    -- Showroom Data
    background VARCHAR(50) DEFAULT 'vavsr_cyan',
    frames INTEGER DEFAULT 36,
    images JSONB NOT NULL, -- Array von Bild-URLs mit Winkeln
    
    -- Processing Status
    status VARCHAR(50) DEFAULT 'processing', -- 'processing', 'ready', 'failed'
    processing_progress INTEGER DEFAULT 0, -- 0-100
    
    -- Export
    exported_to_mobilede BOOLEAN DEFAULT FALSE,
    exported_to_autoscout24 BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

CREATE INDEX idx_showrooms_vehicle ON showrooms(vehicle_id);
CREATE INDEX idx_showrooms_status ON showrooms(status);

-- ============================================================================
-- REVENUE TRACKING (Umsatz-Tracking)
-- ============================================================================

CREATE TABLE revenue_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dealer_id UUID REFERENCES dealers(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    financing_request_id UUID REFERENCES financing_requests(id) ON DELETE SET NULL,
    
    -- Revenue Data
    amount DECIMAL(12,2) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'vehicle_sale', 'financing', 'insurance', 'service'
    currency VARCHAR(3) DEFAULT 'EUR',
    
    -- Commission
    profit_margin DECIMAL(5,2) DEFAULT 30.0, -- 30%
    net_profit DECIMAL(12,2),
    vega_commission DECIMAL(12,2) NOT NULL, -- 13.58% of net profit
    
    -- Period
    period_date DATE NOT NULL, -- Für Gruppierung
    
    -- Metadata
    description TEXT,
    metadata JSONB,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_revenue_dealer ON revenue_entries(dealer_id);
CREATE INDEX idx_revenue_type ON revenue_entries(type);
CREATE INDEX idx_revenue_period ON revenue_entries(period_date);
CREATE INDEX idx_revenue_created ON revenue_entries(created_at);

-- ============================================================================
-- ANALYTICS (Analytics-Daten)
-- ============================================================================

CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL, -- 'page_view', 'vehicle_view', 'financing_calc', etc.
    entity_type VARCHAR(50), -- 'vehicle', 'dealer', 'page'
    entity_id UUID,
    
    -- User Data
    session_id VARCHAR(255),
    user_agent TEXT,
    ip_address VARCHAR(45),
    
    -- Event Data
    event_data JSONB,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_entity ON analytics_events(entity_type, entity_id);
CREATE INDEX idx_analytics_created ON analytics_events(created_at);

-- ============================================================================
-- INTEGRATIONS (Externe Integrationen)
-- ============================================================================

CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL, -- 'mobilede', 'autoscout24'
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    
    -- Sync Data
    external_id VARCHAR(255), -- ID auf externer Plattform
    sync_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'synced', 'failed'
    last_synced_at TIMESTAMP,
    
    -- Metadata
    metadata JSONB,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_integrations_platform ON integrations(platform);
CREATE INDEX idx_integrations_vehicle ON integrations(vehicle_id);
CREATE INDEX idx_integrations_status ON integrations(sync_status);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_dealers_updated_at BEFORE UPDATE ON dealers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financing_requests_updated_at BEFORE UPDATE ON financing_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-calculate commission on revenue entry
CREATE OR REPLACE FUNCTION calculate_vega_commission()
RETURNS TRIGGER AS $$
BEGIN
    NEW.net_profit = NEW.amount * (NEW.profit_margin / 100.0);
    NEW.vega_commission = NEW.net_profit * 0.1358; -- 13.58%
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER calculate_commission BEFORE INSERT OR UPDATE ON revenue_entries
    FOR EACH ROW EXECUTE FUNCTION calculate_vega_commission();

-- ============================================================================
-- VIEWS (Convenience Views)
-- ============================================================================

-- Dealer Statistics View
CREATE OR REPLACE VIEW dealer_statistics AS
SELECT
    d.id,
    d.name,
    COUNT(DISTINCT v.id) as total_vehicles,
    COUNT(DISTINCT CASE WHEN v.status = 'active' THEN v.id END) as active_vehicles,
    COUNT(DISTINCT fr.id) as financing_requests,
    COALESCE(SUM(re.amount), 0) as total_revenue,
    COALESCE(SUM(re.vega_commission), 0) as total_commission
FROM dealers d
LEFT JOIN vehicles v ON v.dealer_id = d.id
LEFT JOIN financing_requests fr ON fr.dealer_id = d.id
LEFT JOIN revenue_entries re ON re.dealer_id = d.id
GROUP BY d.id, d.name;

-- Revenue Summary View
CREATE OR REPLACE VIEW revenue_summary AS
SELECT
    DATE_TRUNC('month', period_date) as month,
    type,
    COUNT(*) as transaction_count,
    SUM(amount) as total_revenue,
    SUM(net_profit) as total_profit,
    SUM(vega_commission) as total_commission
FROM revenue_entries
GROUP BY DATE_TRUNC('month', period_date), type
ORDER BY month DESC, type;

-- ============================================================================
-- INITIAL DATA (Optional)
-- ============================================================================

-- Insert CarCompany24 as default dealer
INSERT INTO dealers (id, name, email, phone, address, city, postal_code, country)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'CarCompany24 GmbH',
    'info@carcompany24-gmbh.de',
    '+49 551 / XXX-XXXX',
    'Adolf-Hoyer-Straße 12',
    'Göttingen',
    '37079',
    'DE'
) ON CONFLICT DO NOTHING;
