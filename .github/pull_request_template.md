### 📋 Checklist de Validación de Pull Request — EcoHuellitas Norte

#### 📌 1. Historia de Usuario / Ticket Vinculado
- **Ticket Jira:** [EHN-XX](https://psicoteddy-app.atlassian.net/browse/EHN-XX)
- **Épica Asociada:** [EP-XX]
- **Sprint:** Sprint [1 | 2 | 3 | 4]

---

#### 🔍 2. Descripción de los Cambios Implementados
- [ ] Breve resumen de los cambios introducidos en el frontend / backend / base de datos.
- [ ] ¿Afecta a ordenanzas municipales de Lima Norte (Los Olivos, Comas, SMP, Independencia)?

---

#### 🧪 3. Pruebas y Calidad de Código
- [ ] Se ejecutaron pruebas unitarias e integración localmente (`npm test`).
- [ ] Cobertura de código superior al **80%** verificada.
- [ ] Todos los tests pasan sin errores ni advertencias.

---

#### 🛡️ 4. Seguridad Shift-Left (DevSecOps)
- [ ] **Secretos:** Verificado que no se incluyan contraseñas, tokens JWT ni API keys en el código (`.env.example` actualizado).
- [ ] **SAST / CodeQL:** El código no contiene vulnerabilidades de inyección SQL ni XSS.
- [ ] **Dependencias:** Ejecutado `npm audit` con 0 vulnerabilidades críticas.
- [ ] **Control de Acceso:** Endpoints protegidos con middleware de roles (`citizen`, `inspector`, `admin`).

---

#### 🌐 5. Despliegue y Validación
- [ ] Probado localmente en `http://localhost:3000`.
- [ ] Despliegue en la nube verificado sin errores de CORS o headers.
