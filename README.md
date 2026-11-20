# EcoHuellitas Norte - Plataforma DevSecOps de Salubridad Urbana y Padron Canino

> **Caso:** Problematica de salubridad por desechos caninos, orina en fachadas y falta de fiscalizacion en **Lima Norte** (*Los Olivos, Comas, San Martin de Porres e Independencia*).

---

## Enlaces Oficiales del Proyecto
- **Repositorio en GitHub:** [https://github.com/Claudia-Fernanda-Rejas-Ruiz/ecohuellitas-norte](https://github.com/Claudia-Fernanda-Rejas-Ruiz/ecohuellitas-norte)
- **Tablero Scrum en Jira Cloud:** [https://psicoteddy-app.atlassian.net/jira/software/projects/EHN/boards/35](https://psicoteddy-app.atlassian.net/jira/software/projects/EHN/boards/35)
- **Integracion Continua (CI/CD):** [GitHub Actions Workflows](https://github.com/Claudia-Fernanda-Rejas-Ruiz/ecohuellitas-norte/actions)

---

## Capacidades y Modulos del Sistema (MVP)
1. **Padron y Ficha Sanitaria de Mascotas:** Registro distrital con generacion y validacion de carne digital con **Codigo QR**.
2. **Reporte Ciudadano Geolocalizado:** Captura de puntos criticos (heces, orina, mascota suelta) con GPS y fotos en tiempo real.
3. **Consola Municipal de Fiscalizacion:** Emision de actas preventivas y calculo automatizado de multas segun ordenanza distrital (% UIT).
4. **Dashboard y Mapa de Calor:** Mapa interactivo en Leaflet con capas termicas e indicadores de salubridad por distrito.
5. **Directorio de Puntos Limpios:** Tachos caninos y veterinarias municipales georreferenciadas.

---

## Controles de Calidad y DevSecOps
- **Tests Automatizados:** 24 pruebas unitarias y de integracion con **Jest + Supertest** (Cobertura > 80%).
- **Seguridad Shift-Left:** Rate limiting, cabeceras seguras con Helmet, JWT con hash Bcrypt, y escaneo de secretos con Gitleaks.
- **Pipeline CI/CD en GitHub Actions (6 Fases):**
  1. Fase 1: Construccion y Verificacion de Entorno (Build & Lint).
  2. Fase 2: Pruebas Automatizadas y Cobertura de Codigo (Jest > 80%).
  3. Fase 3: Analisis Estatico de Seguridad SAST (CodeQL).
  4. Fase 4: Escaneo y Deteccion de Secretos (Gitleaks).
  5. Fase 5: Auditoria de Vulnerabilidades en Dependencias (SCA - npm audit).
  6. Fase 6: Empaquetado y Verificacion de Despliegue en Entorno de Pruebas (Smoke Test y empaquetado de distribucion).

---

## Ejecucion Local
```bash
# Instalar dependencias
npm install

# Ejecutar suite de pruebas con cobertura
npm test

# Iniciar servidor
npm start
```
Acceso en navegador: `http://localhost:3000`
