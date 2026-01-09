#!/bin/bash

# DNS Setup Helper Script
# Prüft DNS-Konfiguration für CC24.ONLINE und CC24.VIP

echo "🌐 CC24 DNS Setup Helper"
echo "========================"
echo ""

# Farben
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

check_dns() {
    domain=$1
    echo "🔍 Prüfe DNS für $domain..."
    
    # A Record prüfen
    a_record=$(dig +short $domain A | head -n 1)
    if [ -z "$a_record" ]; then
        echo -e "${RED}❌ A Record nicht gefunden für $domain${NC}"
    else
        echo -e "${GREEN}✅ A Record: $a_record${NC}"
    fi
    
    # CNAME für www prüfen
    www_record=$(dig +short www.$domain CNAME | head -n 1)
    if [ -z "$www_record" ]; then
        echo -e "${YELLOW}⚠️  www.$domain CNAME nicht gefunden${NC}"
    else
        echo -e "${GREEN}✅ www.$domain CNAME: $www_record${NC}"
    fi
    
    echo ""
}

# Prüfe beide Domains
check_dns "cc24.online"
check_dns "cc24.vip"

echo "📋 DNS Records die gesetzt werden müssen:"
echo ""
echo "CC24.ONLINE:"
echo "  Type: A"
echo "  Name: @"
echo "  Value: 76.76.21.21"
echo ""
echo "  Type: CNAME"
echo "  Name: www"
echo "  Value: cname.vercel-dns.com"
echo ""
echo "CC24.VIP:"
echo "  Type: A"
echo "  Name: @"
echo "  Value: 76.76.21.21"
echo ""
echo "  Type: CNAME"
echo "  Name: www"
echo "  Value: cname.vercel-dns.com"
echo ""
