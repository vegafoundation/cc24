# 🔄 GitHub Pages Workflow Engine Integration

## 🎯 Übersicht

Integration der Workflow-Engines (Temporal & Argo) mit GitHub Pages Deployment.

## 📋 Verfügbare Optionen

### Option 1: Standard GitHub Actions (Default)
- ✅ Keine zusätzliche Infrastruktur
- ✅ Einfach und schnell
- ✅ Bereits implementiert

**Workflow:** `.github/workflows/deploy-pages.yml`

### Option 2: Temporal Workflow Engine
- ✅ TypeScript-native
- ✅ Durable Execution
- ✅ Retry-Mechanismen

**Workflow:** `.github/workflows/deploy-pages-with-workflow-engine.yml`  
**Trigger:** `use_temporal: true`

### Option 3: Argo Workflows
- ✅ Kubernetes-native
- ✅ Container-basiert
- ✅ DAG-Visualisierung

**Workflow:** `.github/workflows/deploy-pages-with-workflow-engine.yml`  
**Trigger:** `use_argo: true`

## 🚀 Verwendung

### Standard Deployment (GitHub Actions)
```bash
# Automatisch bei Push zu main
git push origin main

# Oder manuell triggern
gh workflow run "Deploy to GitHub Pages"
```

### Mit Temporal Workflow Engine
```bash
# Manuell mit Temporal
gh workflow run "Deploy to GitHub Pages (with Workflow Engine)" \
  -f use_temporal=true
```

**Voraussetzungen:**
- Temporal Server konfiguriert
- Secrets: `TEMPORAL_ADDRESS`, `TEMPORAL_NAMESPACE`

### Mit Argo Workflows
```bash
# Manuell mit Argo
gh workflow run "Deploy to GitHub Pages (with Workflow Engine)" \
  -f use_argo=true
```

**Voraussetzungen:**
- Kubernetes Cluster
- Argo Workflows installiert
- Secret: `KUBECONFIG`

## 🔧 Konfiguration

### Temporal Setup

1. **Temporal Server installieren:**
```bash
# Docker Compose
docker-compose -f temporal-docker-compose.yml up -d
```

2. **Secrets in GitHub setzen:**
- `TEMPORAL_ADDRESS`: `localhost:7233` (oder Cloud URL)
- `TEMPORAL_NAMESPACE`: `default`

3. **Worker starten:**
```bash
npm run temporal:worker
```

### Argo Workflows Setup

1. **Argo installieren:**
```bash
kubectl create namespace argo
kubectl apply -n argo -f https://github.com/argoproj/argo-workflows/releases/download/v3.5.0/install.yaml
```

2. **KUBECONFIG Secret:**
```bash
# Base64 encoded kubeconfig
echo "$(cat ~/.kube/config)" | base64 > kubeconfig.txt
# In GitHub Secrets als KUBECONFIG einfügen
```

## 📊 Vergleich

| Feature | Standard | Temporal | Argo |
|---------|---------|----------|------|
| **Setup** | ✅ Kein Setup | ⚠️ Server nötig | ⚠️ K8s nötig |
| **Durable Execution** | ❌ | ✅ | ⚠️ Begrenzt |
| **Retry** | ⚠️ Basic | ✅ Advanced | ✅ Advanced |
| **Visualisierung** | ⚠️ GitHub UI | ✅ Temporal UI | ✅ Argo UI |
| **Best für** | Standard Deployments | Komplexe Workflows | K8s Deployments |

## 🎯 Empfehlung

### Für CC24 jetzt:
**Standard GitHub Actions** ✅
- Bereits implementiert
- Funktioniert zuverlässig
- Keine zusätzliche Infrastruktur

### Für zukünftige Erweiterungen:
**Temporal** wenn:
- Komplexe Orchestrierung nötig
- Durable Execution wichtig
- TypeScript-native gewünscht

**Argo Workflows** wenn:
- Kubernetes-Cluster vorhanden
- Container-basierte Deployments
- DAG-Visualisierung gewünscht

## 📋 Workflow-Dateien

- `.github/workflows/deploy-pages.yml` - Standard
- `.github/workflows/deploy-pages-with-workflow-engine.yml` - Mit Engines
- `workflows/temporal-cc24-deploy.ts` - Temporal Workflow
- `workflows/argo-cc24-deploy.yaml` - Argo Workflow

## 🔗 Links

- [Temporal Documentation](https://docs.temporal.io/)
- [Argo Workflows Documentation](https://argoproj.github.io/workflows/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Status:** ✅ Integration implementiert  
**Bereit für:** Testing und Evaluation  
**Datum:** 2026-01-09
