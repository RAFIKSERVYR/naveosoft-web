# Guía: poner la web en www.forjia.es (y después la app en app.forjia.es)

Esta guía es para ti, Zacarias, paso a paso y sin tecnicismos. Está dividida en
dos fases:

- **Fase A (ahora):** la web nueva (este repositorio) pasa a verse en
  **https://www.forjia.es**, y `naveosoft.es` redirige ahí. La app sigue igual
  en https://forjia.es. **No se toca el correo** de ningún dominio.
- **Fase B (más adelante, cuando Google Play apruebe la app en producción):**
  la app se mueve a **app.forjia.es** y la web pasa a ocupar **forjia.es** (sin
  www). Esta fase requiere más cuidado; aquí solo se explica el plan.

> Antes de empezar, una idea clave: el **DNS** de `forjia.es` se gestiona en
> **DonDominio** (donde compraste el dominio). **Vercel** solo sirve las webs.
> El correo (info@forjia.es, info@naveosoft.es) también vive en DonDominio y no
> tiene nada que ver con lo que vamos a tocar, siempre que no borres ni edites
> los registros **MX**, **TXT/SPF** ni **DKIM**.

---

## Fase A — La web en www.forjia.es

Tiempo estimado: 20-30 minutos, más la espera de propagación (normalmente
minutos, a veces hasta unas horas).

### Paso 1. Añadir el dominio www.forjia.es en Vercel

1. Entra en https://vercel.com y abre el proyecto **`naveosoft-web`** (el de esta
   web, no el de la app).
2. Arriba, pestaña **Settings** → menú lateral **Domains**.
3. En la caja de texto escribe exactamente `www.forjia.es` y pulsa **Add**.
4. Si Vercel te pregunta qué hacer con `forjia.es` (sin www), elige la opción de
   **añadir solo `www.forjia.es`** o "No redirect". **No añadas `forjia.es` a
   este proyecto**: ese dominio lo usa hoy la app y lo romperías.
5. Vercel mostrará el dominio con un aviso ("Invalid Configuration" o "Pending")
   y te dirá qué registro DNS espera: un **CNAME** de `www` apuntando a
   **`cname.vercel-dns.com`**. Deja esa pestaña abierta.

### Paso 2. Comprobar el DNS en DonDominio (probablemente ya funciona)

En DonDominio, el dominio `forjia.es` tiene un registro **comodín**
(`*.forjia.es → cname.vercel-dns.com`). Un comodín significa "cualquier
subdominio que no esté definido aparte apunta aquí". Como `www` es un
subdominio, es muy probable que **ya apunte a Vercel sin hacer nada**.

**Cómo comprobarlo (elige una de las dos formas):**

- **Forma fácil (web):** entra en https://dnschecker.org, escribe
  `www.forjia.es`, elige el tipo **CNAME** y pulsa Search. Si en la mayoría de
  filas aparece `cname.vercel-dns.com`, ya está bien.
- **Forma rápida (Windows):** abre PowerShell y escribe:
  ```
  Resolve-DnsName www.forjia.es -Type CNAME
  ```
  Si la respuesta incluye `cname.vercel-dns.com`, ya está bien.

**Si NO aparece `cname.vercel-dns.com`**, crea el registro a mano:

1. Entra en https://www.dondominio.com → **Mis dominios** → `forjia.es` →
   **Zona DNS** (o "Gestión DNS").
2. Pulsa **Añadir registro**.
3. Rellena:
   - **Tipo:** `CNAME`
   - **Nombre / Host:** `www` (solo `www`; DonDominio añade `.forjia.es` solo)
   - **Destino / Valor:** `cname.vercel-dns.com`
   - **TTL:** deja el que venga por defecto
4. Guarda. Espera unos minutos y repite la comprobación de arriba.

### Paso 3. Lo que NO hay que tocar (muy importante)

En la zona DNS de `forjia.es` verás más registros. **No borres ni edites**:

- El registro **raíz** `forjia.es` (tipo A o CNAME sin nombre / con `@`): es el
  que hace funcionar la **app** en https://forjia.es.
- Los registros **MX** (`mx01.dondominio.com`...): son el correo info@forjia.es.
- Los **TXT** que empiezan por `v=spf1` o `v=DMARC1`, y los que tienen
  `_domainkey` en el nombre (DKIM, incluidos los de Resend `resend._domainkey`,
  `rsend`, `send`): también son del correo. Si se tocan, los emails dejan de
  llegar o van a spam.
- El **comodín** `*.forjia.es`: lo usa la web y, en el futuro, `app.forjia.es`.

Regla sencilla: en esta fase **solo se añade** (como mucho) un CNAME `www`. Nada
más.

### Paso 4. Comprobar que https://www.forjia.es funciona

1. Vuelve a Vercel → Settings → Domains. Al cabo de unos minutos el aviso de
   `www.forjia.es` debería cambiar a **"Valid Configuration"** con un tick.
   Vercel genera el certificado HTTPS solo; no hay que hacer nada.
2. Abre en el navegador **https://www.forjia.es**. Debe verse la web nueva de
   Forjia (esta web) con el candado de conexión segura.
3. Abre también **https://forjia.es** y comprueba que la **app sigue
   funcionando** como siempre (pantalla de login). Si algo de la app fallase,
   es que se ha tocado el registro raíz por error: revísalo en DonDominio.
4. Prueba en el móvil, que usa otra red, para confirmar que la propagación ha
   llegado.

Si pasadas 24 horas sigue en "Pending", lo más habitual es que el CNAME esté mal
escrito (una letra de más, o `www.forjia.es` en el campo Nombre en lugar de
solo `www`). Corrígelo y espera.

### Paso 5. Redirigir naveosoft.es a www.forjia.es (sin tocar su correo)

Hoy `naveosoft.es` y `www.naveosoft.es` están añadidos en este mismo proyecto de
Vercel. Vamos a decirle a Vercel que, cuando alguien entre ahí, lo mande a la
web nueva. **Esto no afecta al correo info@naveosoft.es**, porque el correo va
por los registros MX de su propio DNS, y Vercel solo gestiona la web.

1. Vercel → proyecto `naveosoft-web` → **Settings → Domains**.
2. Localiza `naveosoft.es` y pulsa **Edit** (icono de lápiz o los tres puntos).
3. En **Redirect to**, escribe `www.forjia.es` (Vercel puede pedirlo sin
   `https://`; si te deja elegir, marca **308 Permanent Redirect**).
4. Guarda. Repite lo mismo con `www.naveosoft.es` si aparece como dominio
   aparte.
5. Comprueba: escribe `naveosoft.es` en el navegador y debe llevarte solo a
   `https://www.forjia.es`.

> Nota: en `astro.config.mjs` el valor `site` ya está en `https://www.forjia.es`.
> De ahí salen las URL "canónicas" y el mapa del sitio (`sitemap`), así que
> Google entenderá que la web oficial es www.forjia.es y no naveosoft.es.

**Fin de la Fase A.** La web está en www.forjia.es, la app sigue en forjia.es y
los correos funcionan igual.

---

## Fase B — La app a app.forjia.es y la web a forjia.es (después de Google Play)

**Cuándo:** solo cuando la app Android esté **aprobada y publicada en producción**
en Google Play. Motivo: la app Android (TWA) lleva "grabada" la dirección
`https://forjia.es`, y cambiarla obliga a publicar una versión nueva; mejor no
mezclar ese cambio con la revisión de Google.

**Por qué merece la pena:** que la dirección "limpia" `forjia.es` sea la web
comercial (la que la gente busca en Google) y que la app tenga la suya propia,
`app.forjia.es`, como hacen la mayoría de servicios.

**Plan (en este orden):**

1. **Preparar la app en Vercel.** En el proyecto de Vercel de la app
   (repositorio `employee-time-tracker`), añadir el dominio `app.forjia.es`. Como
   el comodín `*.forjia.es` ya apunta a Vercel, no hace falta tocar DonDominio.
   Comprobar que https://app.forjia.es abre la app. De momento `forjia.es`
   sigue funcionando también; hay una temporada con las dos direcciones activas.

2. **Supabase (inicio de sesión y correos).** En el proyecto de Supabase →
   Authentication → URL Configuration: cambiar **Site URL** a
   `https://app.forjia.es` y añadir en **Redirect URLs** `https://app.forjia.es`
   y `https://app.forjia.es/**` (mantener las de `forjia.es` durante la
   transición). Sin esto, los enlaces de confirmación y recuperación de
   contraseña llevarían al sitio equivocado.

3. **Stripe.** Cambiar las URL de vuelta del pago (éxito/cancelación) y la del
   portal de cliente a `https://app.forjia.es/...`. En la app esto suele estar en
   el secreto `APP_URL` de las Edge Functions (`stripe-billing`) y en la
   configuración del portal en el panel de Stripe. Revisar también el enlace de
   pago de gestorías si lo hubiera.

4. **Nueva versión de la app Android.** Generar un nuevo APK/AAB (TWA con
   PWABuilder, misma keystore) apuntando a `https://app.forjia.es`, y publicar
   en `https://app.forjia.es/.well-known/assetlinks.json` el archivo de
   verificación con la huella de la firma (es lo que hace que la app se abra a
   pantalla completa sin barra de navegador). Subir la versión a Google Play
   como actualización normal.

5. **La web a la raíz `forjia.es`.** Una vez la app esté sirviéndose bien en
   `app.forjia.es`: en el proyecto de Vercel de la **app**, quitar el dominio
   `forjia.es`; en el proyecto de la **web** (`naveosoft-web`), añadir
   `forjia.es` y configurar `www.forjia.es` → `forjia.es` (o al revés, pero uno
   solo como principal). Si Vercel pide un registro DNS para la raíz (un
   registro **A** a `76.76.21.21` o el que indique), se cambia en DonDominio
   **solo ese registro raíz**, sin tocar MX/TXT. Actualizar `site` en
   `astro.config.mjs` a `https://forjia.es`.

6. **Redirecciones de los enlaces viejos de la app.** Como la web pasa a ocupar
   `forjia.es`, hay direcciones antiguas de la app que la gente sigue teniendo
   guardadas. En la **web** (creando un archivo `vercel.json` en la raíz de este
   repositorio con una sección `redirects`) hay que definir redirecciones
   permanentes hacia la app:
   - `forjia.es/?fichar=…` → `app.forjia.es/?fichar=…` (conservando el
     parámetro; es el enlace de los códigos QR de fichaje)
   - `forjia.es/registro` → `app.forjia.es/registro`
   - `forjia.es/privacidad` → `app.forjia.es/privacidad`
   - `forjia.es/precios` → `app.forjia.es/precios` (o a la página de precios de
     la web, si se decide que viva aquí)
   - `forjia.es/comparativa` → `app.forjia.es/comparativa`
   - `forjia.es/eliminar-cuenta` → `app.forjia.es/eliminar-cuenta` (esta URL está
     declarada en Google Play; si cambia, actualizar también la ficha de Play)
   - y en general cualquier ruta de la app que se haya compartido.

7. **Los carteles QR impresos siguen funcionando.** Los carteles con código QR
   que ya están en las paredes de los clientes apuntan a `forjia.es/?fichar=…`.
   Gracias a la redirección del punto 6, al escanearlos el móvil llegará a
   `app.forjia.es/?fichar=…` automáticamente. **No hay que reimprimir nada.**
   Eso sí: la redirección debe mantenerse para siempre (o al menos años), así
   que no hay que borrarla en futuras limpiezas.

8. **Actualizar textos y comprobaciones finales.** Revisar los enlaces de esta
   web hacia la app (`https://forjia.es/registro`, etc. → `app.forjia.es`), la
   política de privacidad, los emails automáticos (Resend/onboarding) y las
   plantillas de correo de Supabase que incluyan la URL. Probar de principio a
   fin: alta nueva → correo de confirmación → login → fichaje por QR → pago de
   prueba → vuelta a la app.

Cuando llegue el momento, pídeme "vamos con la Fase B" y la haremos juntos paso
a paso, comprobando cada punto antes de pasar al siguiente.
