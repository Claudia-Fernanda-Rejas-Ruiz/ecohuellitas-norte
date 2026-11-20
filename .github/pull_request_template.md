### Checklist de Validacion de Pull Request - EcoHuellitas Norte

#### 1. Historia de Usuario / Ticket Vinculado
- **Ticket Jira:** [EHN-XX](https://psicoteddy-app.atlassian.net/browse/EHN-XX)
- **Epica Asociada:** [EP-XX]
- **Sprint:** Sprint [1 | 2 | 3 | 4]

---

#### 2. Descripcion de los Cambios Implementados
- [ ] Breve resumen de los cambios introducidos en el frontend / backend / base de datos.
- [ ] ¿Afecta a ordenanzas municipales de Lima Norte (Los Olivos, Comas, SMP, Independencia)?

---

#### 3. Pruebas y Calidad de Codigo
- [ ] Se ejecutaron pruebas unitarias e integracion localmente (`npm test`).
- [ ] Cobertura de codigo superior al **80%** verificada.
- [ ] Todos los tests pasan sin errores ni advertencias.

---

#### 4. Seguridad Shift-Left (DevSecOps)
- [ ] **Secretos:** Verificado que no se incluyan contrasenas, tokens JWT ni API keys en el codigo (`.env.example` actualizado).
- [ ] **SAST / CodeQL:** El codigo no contiene vulnerabilidades de inyeccion SQL ni XSS.
- [ ] **Dependencias:** Ejecutado `npm audit` con 0 vulnerabilidades criticas.
- [ ] **Control de Acceso:** Endpoints protegidos con middleware de roles (`citizen`, `inspector`, `admin`).

---

#### 5. Despliegue y Validacion
- [ ] Probado localmente en `http://localhost:3000`.
- [ ] Verificacion de despliegue y smoke test ejecutados exitosamente.
