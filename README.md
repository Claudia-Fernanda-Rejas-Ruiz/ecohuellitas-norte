# 🐾 EcoHuellitas Norte — Plataforma DevSecOps de Salubridad Urbana y Padrón Canino

> **Caso:** Problemática de salubridad por desechos caninos, orina en fachadas y falta de fiscalización en **Lima Norte** (*Los Olivos, Comas, San Martín de Porres e Independencia*).

---

## 🔗 Enlaces Oficiales del Proyecto
- **Repositorio en GitHub:** [https://github.com/Claudia-Fernanda-Rejas-Ruiz/ecohuellitas-norte](https://github.com/Claudia-Fernanda-Rejas-Ruiz/ecohuellitas-norte)
- **Tablero Scrum en Jira Cloud:** [https://psicoteddy-app.atlassian.net/jira/software/projects/EHN/boards/35](https://psicoteddy-app.atlassian.net/jira/software/projects/EHN/boards/35)
- **Integración Continua (CI/CD):** [GitHub Actions Workflows](https://github.com/Claudia-Fernanda-Rejas-Ruiz/ecohuellitas-norte/actions)

---

## 🚀 Capacidades y Módulos del Sistema (MVP)
1. **Padrón y Ficha Sanitaria de Mascotas:** Registro distrital con generación y validación de carné digital con **Código QR**.
2. **Reporte Ciudadano Geolocalizado:** Captura de puntos críticos (heces, orina, mascota suelta) con GPS y fotos en tiempo real.
3. **Consola Municipal de Fiscalización:** Emisión de actas preventivas y cálculo automatizado de multas según ordenanza distrital (% UIT).
4. **Dashboard y Mapa de Calor:** Mapa interactivo en Leaflet con capas térmicas e indicadores de salubridad por distrito.
5. **Directorio de Puntos Limpios:** Tachos caninos y veterinarias municipales georreferenciadas.

---

## 🛡️ Controles de Calidad y DevSecOps
- **Tests Automatizados:** 24 pruebas unitarias y de integración con **Jest + Supertest** (Cobertura > 80%).
- **Seguridad Shift-Left:** Rate limiting, cabeceras seguras con Helmet, JWT con hash Bcrypt, y escaneo de secretos con Gitleaks.
- **Pipeline CI/CD:** GitHub Actions con 6 etapas automatizadas.

---

## 🛠️ Ejecución Local
```bash
# Instalar dependencias
npm install

# Ejecutar suite de pruebas con cobertura
npm test

# Iniciar servidor
npm start
```
Acceso en navegador: `http://localhost:3000`
