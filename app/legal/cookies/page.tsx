import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | TuEcommerce",
  description: "Información sobre el uso de cookies en TuEcommerce",
};

export default function Cookies() {
  return (
    <div className="prose prose-invert max-w-none dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Política de Cookies
      </h1>

      <p className="text-sm text-muted-foreground mb-8">
        <strong>Última actualización:</strong> Abril 2025
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          1. Qué Son las Cookies
        </h2>
        <p className="text-muted-foreground mb-4">
          Las cookies son pequeños archivos de texto que se almacenan en su
          dispositivo (computadora, tablet, teléfono) cuando visita nuestro
          sitio web. Contienen información que el servidor web puede leer cada
          vez que regresa al sitio.
        </p>
        <p className="text-muted-foreground mb-4">
          Las cookies no contienen programas, virus o malware. No pueden acceder
          a otros archivos en su dispositivo ni transmitir información personal
          sin consentimiento.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          2. Tipos de Cookies que Usamos
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          2.1 Cookies Técnicas/Esenciales
        </h3>
        <p className="text-muted-foreground mb-4">
          Estas cookies son necesarias para que el sitio funcione correctamente:
        </p>
        <table className="w-full text-sm border-collapse">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-2">Nombre</th>
              <th className="text-left py-2">Propósito</th>
              <th className="text-left py-2">Duración</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-2">session_id</td>
              <td>Identifica la sesión del usuario</td>
              <td>Sesión</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">csrf_token</td>
              <td>Protección contra ataques CSRF</td>
              <td>Sesión</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">cart_id</td>
              <td>Identifica su carrito de compra</td>
              <td>30 días</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">auth_token</td>
              <td>Mantiene su sesión de acceso</td>
              <td>Sesión/30 días</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">language</td>
              <td>Recuerda el idioma seleccionado</td>
              <td>1 año</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          2.2 Cookies de Preferencia
        </h3>
        <p className="text-muted-foreground mb-4">
          Guardan sus preferencias para mejorar la experiencia:
        </p>
        <table className="w-full text-sm border-collapse">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-2">Nombre</th>
              <th className="text-left py-2">Propósito</th>
              <th className="text-left py-2">Duración</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-2">theme_preference</td>
              <td>Modo oscuro/claro preferido</td>
              <td>1 año</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">currency</td>
              <td>Moneda seleccionada</td>
              <td>1 año</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">notification_settings</td>
              <td>Preferencias de notificaciones</td>
              <td>1 año</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">view_history</td>
              <td>Productos recientemente vistos</td>
              <td>90 días</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          2.3 Cookies de Análisis
        </h3>
        <p className="text-muted-foreground mb-4">
          Nos ayudan a entender cómo los usuarios interactúan con el sitio:
        </p>
        <table className="w-full text-sm border-collapse">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-2">Nombre/Proveedor</th>
              <th className="text-left py-2">Propósito</th>
              <th className="text-left py-2">Duración</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-2">_ga, _gat (Google Analytics)</td>
              <td>Rastrear uso del sitio, comportamiento</td>
              <td>2 años</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">_fbp (Facebook Pixel)</td>
              <td>Medir conversiones, audiencia</td>
              <td>90 días</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">hotjar_id (Hotjar)</td>
              <td>Grabar sesiones, mapas de calor</td>
              <td>1 año</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          2.4 Cookies de Marketing/Publicidad
        </h3>
        <p className="text-muted-foreground mb-4">
          Se usan para mostrar publicidad relevante:
        </p>
        <table className="w-full text-sm border-collapse">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-2">Nombre/Proveedor</th>
              <th className="text-left py-2">Propósito</th>
              <th className="text-left py-2">Duración</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-2">ads_conversion_id</td>
              <td>Rastrear conversiones de anuncios</td>
              <td>30 días</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">user_segment</td>
              <td>Categorizar para publicidad dirigida</td>
              <td>90 días</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2">_fbp, _ttp (Meta, TikTok)</td>
              <td>Publicidad personalizada en redes</td>
              <td>90 días</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          3. Tecnologías Similares a Cookies
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          3.1 Beacons/Pixels
        </h3>
        <p className="text-muted-foreground mb-4">
          Pequeños archivos 1x1 que se cargan en páginas para rastrear acciones:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Facebook Pixel para conversiones.</li>
          <li>Google Ads tracking para campañas.</li>
          <li>Email tracking para abrir/clic.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          3.2 Local Storage
        </h3>
        <p className="text-muted-foreground mb-4">
          Almacenamiento local en el navegador (sin expiración automática):
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Preferencias de usuario (tema, idioma).</li>
          <li>Datos de sesión.</li>
          <li>Historial de búsqueda.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          3.3 Session Storage
        </h3>
        <p className="text-muted-foreground mb-4">
          Similar al local storage, pero se elimina al cerrar el navegador:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Datos temporales de formularios.</li>
          <li>Información de sesión actual.</li>
          <li>Caché de búsqueda.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          4. Cookies de Terceros
        </h2>
        <p className="text-muted-foreground mb-4">
          Servicios de terceros colocan sus propias cookies:
        </p>
        <ul className="space-y-3 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Google Analytics:</strong> www.google.com/policies/privacy
          </li>
          <li>
            <strong>Facebook/Meta:</strong> www.facebook.com/policies/cookies
          </li>
          <li>
            <strong>Stripe (Pagos):</strong> stripe.com/privacy
          </li>
          <li>
            <strong>Hotjar (Análisis):</strong>{" "}
            hotjar.com/legal/policies/cookie-information
          </li>
          <li>
            <strong>Redes Sociales:</strong> Políticas propias de cada red.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          5. Cómo Controlar Cookies
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.1 Configuración del Navegador
        </h3>
        <p className="text-muted-foreground mb-4">
          Puede controlar cookies en la configuración de su navegador:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Google Chrome:</strong> Configuración → Privacidad y
            seguridad → Cookies
          </li>
          <li>
            <strong>Firefox:</strong> Preferencias → Privacidad → Cookies
          </li>
          <li>
            <strong>Safari:</strong> Preferencias → Privacidad → Cookies
          </li>
          <li>
            <strong>Edge:</strong> Configuración → Privacidad → Cookies
          </li>
          <li>
            <strong>Internet Explorer:</strong> Herramientas → Opciones de
            Internet → Privacidad
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.2 Opciones de Control
        </h3>
        <p className="text-muted-foreground mb-4">Puede:</p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Aceptar todas las cookies.</li>
          <li>Aceptar solo cookies esenciales.</li>
          <li>Rechazar todas las cookies no esenciales.</li>
          <li>Personalizcar qué cookies permiti.</li>
          <li>Borrar cookies existentes.</li>
          <li>Ser notificado cuando una cookie se coloca.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.3 Do Not Track (DNT)
        </h3>
        <p className="text-muted-foreground mb-4">
          La mayoría de navegadores modernos incluyen opción DNT. Si está
          habilitada, no colocaremos cookies de rastreo no esenciales.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.4 Gestor de Consentimiento de Cookies
        </h3>
        <p className="text-muted-foreground mb-4">
          Nuestro sitio muestra un banner de cookies cuando accede. Puede:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Aceptar todas las cookies.</li>
          <li>Rechazar cookies no esenciales.</li>
          <li>Personalizar preferencias.</li>
          <li>
            Cambiar preferencias en cualquier momento en Preferencias de
            Cookies.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          6. Impacto de Rechazar Cookies
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          6.1 Cookies Esenciales
        </h3>
        <p className="text-muted-foreground mb-4">
          Si rechaza cookies esenciales, el sitio puede no funcionar
          correctamente:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>No podrá mantener sesión abierta.</li>
          <li>El carrito de compra no funcionará.</li>
          <li>No se completarán transacciones.</li>
          <li>Verá muchos errores.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          6.2 Cookies de Marketing
        </h3>
        <p className="text-muted-foreground mb-4">
          Si rechaza cookies de marketing:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Verá anuncios menos relevantes.</li>
          <li>No recibirá recomendaciones personalizadas.</li>
          <li>El sitio funcionará normalmente.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          7. Persistencia de Opciones
        </h2>
        <p className="text-muted-foreground mb-4">
          Almacenamos sus preferencias de cookies en:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Una cookie especial "cookie_preferences" (válida 1 año).</li>
          <li>Su cuenta de usuario si está registrado.</li>
          <li>Local storage del navegador.</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Si borra todas las cookies del navegador, deberá volver a configurar
          preferencias.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          8. Publicidad Personalizada
        </h2>
        <p className="text-muted-foreground mb-4">
          Usamos cookies para mostrar anuncios relevantes en:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Google Display Network.</li>
          <li>Facebook e Instagram.</li>
          <li>TikTok.</li>
          <li>Otros sitios web asociados.</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Puede optar por no recibir anuncios personalizados en:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Google Ads Settings: myaccount.google.com/ads</li>
          <li>Facebook Ads Preferences: facebook.com/ads/preferences</li>
          <li>TikTok Privacy Settings: tiktok.com/privacy</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          9. Seguridad de Cookies
        </h2>
        <p className="text-muted-foreground mb-4">
          Implementamos medidas de seguridad:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            Cookies marcadas como "HttpOnly" no son accesibles por JavaScript.
          </li>
          <li>Cookies marcadas como "Secure" solo se transmiten por HTTPS.</li>
          <li>Usamos SameSite policy para proteger contra CSRF.</li>
          <li>No almacenamos información sensible en cookies.</li>
          <li>Encriptación de datos sensibles en cookies.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          10. Privacidad en Relación a Cookies
        </h2>
        <p className="text-muted-foreground mb-4">
          Las cookies pueden contener información que se vincula a su identidad:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>ID de usuario si está registrado.</li>
          <li>Dirección IP (hash de IP).</li>
          <li>Historial de navegación.</li>
          <li>Información de compra.</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Consulte nuestra Política de Privacidad para obtener más información
          sobre cómo protegemos sus datos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          11. Cookies en Dispositivos Móviles
        </h2>
        <p className="text-muted-foreground mb-4">
          En aplicaciones móviles, usamos equivalentes a cookies:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Identificadores únicos de dispositivo.</li>
          <li>UserDefaults (iOS) o SharedPreferences (Android).</li>
          <li>Almacenamiento local de aplicación.</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Puede deshabilitarlos en configuración de aplicación o dispositivo.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          12. Cumplimiento Legal
        </h2>
        <p className="text-muted-foreground mb-4">Cumplimos con:</p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>GDPR (UE):</strong> Requerimos consentimiento explícito para
            cookies no esenciales.
          </li>
          <li>
            <strong>CCPA (California):</strong> Respetamos Do Not Sell My
            Personal Information.
          </li>
          <li>
            <strong>Ley Mexicana:</strong> Protección de datos conforme a
            LFPDPPP.
          </li>
          <li>
            <strong>ePrivacy Directive:</strong> Cumplimiento de normas
            europeas.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          13. Cambios a Esta Política
        </h2>
        <p className="text-muted-foreground mb-4">
          Podemos actualizar esta política. Notificaremos cambios
          significativos. El uso continuado implica aceptación de cambios.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          14. Contacto sobre Cookies
        </h2>
        <p className="text-muted-foreground mb-4">
          Para preguntas sobre nuestra política de cookies:
        </p>
        <div className="bg-card/50 border border-border rounded p-4 mt-4">
          <p className="text-muted-foreground">
            <strong>Email:</strong> privacy@dekorans.com
            <br />
            <strong>Teléfono:</strong> +52 (55) 1234-5678
            <br />
            <strong>Dirección:</strong> Avenida Reforma 505, Cuauhtémoc, México
            DF 06500
            <br />
            <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM
          </p>
        </div>
      </section>

      <div className="mt-8 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Documento versión 1.0 - Última actualización: Abril 2025
          <br />© 2025 DEKORANS - Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
