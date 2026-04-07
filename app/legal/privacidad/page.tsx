import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | TuEcommerce",
  description:
    "Política de privacidad y protección de datos personales de TuEcommerce",
};

export default function Privacidad() {
  return (
    <div className="prose prose-invert max-w-none dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Política de Privacidad
      </h1>

      <p className="text-sm text-muted-foreground mb-8">
        <strong>Última actualización:</strong> Abril 2025
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          1. Introducción
        </h2>
        <p className="text-muted-foreground mb-4">
          DEKORANS respeta la privacidad de nuestros usuarios. Esta Política de
          Privacidad explica cómo recopilamos, usamos, compartimos y protegemos
          la información personal que proporcionan nuestros clientes.
        </p>
        <p className="text-muted-foreground mb-4">
          Cumplimos con la Ley Federal de Protección de Datos Personales en
          Posesión de Particulares (LFPDPPP) y otras leyes de protección de
          datos aplicables.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          2. Información que Recopilamos
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          2.1 Información Proporcionada Directamente
        </h3>
        <p className="text-muted-foreground mb-4">
          Recopilamos información que proporciona voluntariamente, incluyendo:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Información de Registro:</strong> Nombre, correo
            electrónico, contraseña, teléfono.
          </li>
          <li>
            <strong>Información de Facturación:</strong> Dirección, código
            postal, país.
          </li>
          <li>
            <strong>Información de Envío:</strong> Dirección de entrega,
            instrucciones especiales.
          </li>
          <li>
            <strong>Información de Pago:</strong> Número de tarjeta (procesado
            por terceros seguros), tipo de pago.
          </li>
          <li>
            <strong>Información Demográfica:</strong> Edad, género,
            preferencias.
          </li>
          <li>
            <strong>Comunicaciones:</strong> Comentarios, reseñas, mensajes de
            soporte.
          </li>
          <li>
            <strong>Información de Contacto:</strong> Números de teléfono
            alternativos, información de emergencia.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          2.2 Información Recopilada Automáticamente
        </h3>
        <p className="text-muted-foreground mb-4">
          Recopilamos automáticamente cierta información cuando usa nuestro
          sitio:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Datos de Navegación:</strong> Páginas visitadas, clics,
            tiempo en el sitio.
          </li>
          <li>
            <strong>Información de Dispositivo:</strong> Tipo de dispositivo,
            sistema operativo, navegador.
          </li>
          <li>
            <strong>Dirección IP:</strong> Para ubicación aproximada y
            seguridad.
          </li>
          <li>
            <strong>Cookies:</strong> Identificadores para recordar
            preferencias.
          </li>
          <li>
            <strong>Logs de Servidor:</strong> Solicitudes, errores, accesos al
            sitio.
          </li>
          <li>
            <strong>Análisis de Comportamiento:</strong> Patrones de compra,
            preferencias de producto.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          2.3 Información de Terceros
        </h3>
        <p className="text-muted-foreground mb-4">
          Podemos recibir información sobre usted de terceros, incluyendo:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Proveedores de pago y servicios financieros.</li>
          <li>Empresas de envío y logística.</li>
          <li>Redes sociales (si vincula su cuenta).</li>
          <li>Proveedores de verificación de identidad.</li>
          <li>Agencias de antifraude.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          3. Cookies y Tecnología Similares
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          3.1 Tipos de Cookies
        </h3>
        <p className="text-muted-foreground mb-4">
          Utilizamos varios tipos de cookies:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Cookies Esenciales:</strong> Necesarias para funcionamiento
            básico del sitio.
          </li>
          <li>
            <strong>Cookies de Preferencia:</strong> Guardan preferencias e
            idioma.
          </li>
          <li>
            <strong>Cookies de Análisis:</strong> Miden uso del sitio con Google
            Analytics.
          </li>
          <li>
            <strong>Cookies de Publicidad:</strong> Para mostrar anuncios
            personalizados.
          </li>
          <li>
            <strong>Cookies de Sesión:</strong> Temporal, se elimina al cerrar
            navegador.
          </li>
          <li>
            <strong>Cookies Persistentes:</strong> Se mantienen durante meses o
            años.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          3.2 Control de Cookies
        </h3>
        <p className="text-muted-foreground mb-4">
          Puede controlar cookies a través de:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Configuración del navegador (aceptar/rechazar).</li>
          <li>Do Not Track (DNT) si tu navegador lo soporta.</li>
          <li>Configuración de privacidad en nuestro sitio.</li>
          <li>Limpiar cookies en las opciones del navegador.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          4. Uso de la Información
        </h2>
        <p className="text-muted-foreground mb-4">
          Usamos su información para:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Procesar Transacciones:</strong> Completar pedidos, procesar
            pagos, enviar productos.
          </li>
          <li>
            <strong>Comunicación:</strong> Confirmaciones, actualizaciones,
            notificaciones importantes.
          </li>
          <li>
            <strong>Mejora del Servicio:</strong> Análisis de uso,
            identificación de problemas.
          </li>
          <li>
            <strong>Personalización:</strong> Recomendaciones de productos,
            ofertas personalizadas.
          </li>
          <li>
            <strong>Marketing:</strong> Boletines, promociones (si consiente).
          </li>
          <li>
            <strong>Seguridad:</strong> Detectar fraude, prevenir actividades
            maliciosas.
          </li>
          <li>
            <strong>Cumplimiento Legal:</strong> Obligaciones fiscales y
            regulatorias.
          </li>
          <li>
            <strong>Servicio al Cliente:</strong> Responder consultas y resolver
            problemas.
          </li>
          <li>
            <strong>Investigación y Análisis:</strong> Estudios, encuestas,
            mejora de productos.
          </li>
          <li>
            <strong>Cumplimiento de Derechos:</strong> Proteger derechos legales
            y seguridad.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          5. Compartir Información
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.1 Con Quién Compartimos
        </h3>
        <p className="text-muted-foreground mb-4">
          Compartimos información con terceros en siguientes casos:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Proveedores de Servicios:</strong> Empresas de envío,
            procesadores de pago, hosting.
          </li>
          <li>
            <strong>Socios Comerciales:</strong> Fabricantes, distribuidores
            (solo información necesaria).
          </li>
          <li>
            <strong>Autoridades Legales:</strong> Si lo requiere la ley o para
            proteger derechos.
          </li>
          <li>
            <strong>Análisis y Marketing:</strong> Google Analytics, redes
            sociales (datos anonimizados).
          </li>
          <li>
            <strong>Sucesión Empresarial:</strong> En caso de venta, fusión o
            adquisición.
          </li>
          <li>
            <strong>Proveedores de Almacenamiento:</strong> Servidores en la
            nube (con medidas de seguridad).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.2 No Vendemos Datos
        </h3>
        <p className="text-muted-foreground mb-4">
          DEKORANS NO vende información personal a terceros con fines
          comerciales. La información se comparte únicamente para propósitos
          operacionales legítimos.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.3 Datos Internacionales
        </h3>
        <p className="text-muted-foreground mb-4">
          Si nos transfiere datos desde fuera de México, la información puede
          procesarse y almacenarse en México o en otros países. Al usar nuestro
          sitio, consiente dicha transferencia.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          6. Seguridad de Datos
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          6.1 Medidas de Seguridad
        </h3>
        <p className="text-muted-foreground mb-4">
          Implementamos medidas de seguridad razonables:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Encriptación SSL/TLS 256 bits para transmisiones.</li>
          <li>Firewalls y sistemas de detección de intrusiones.</li>
          <li>
            Acceso restringido a datos personales (solo personal autorizado).
          </li>
          <li>Servidores seguros y actualizados.</li>
          <li>Evaluaciones periódicas de seguridad.</li>
          <li>Auditorías de cumplimiento.</li>
          <li>Tokenización de datos de tarjeta de crédito.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          6.2 Limitaciones de Seguridad
        </h3>
        <p className="text-muted-foreground mb-4">
          Aunque implementamos medidas robustas, ningún sistema es 100% seguro.
          Transmite información bajo su propio riesgo.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          6.3 Brechas de Seguridad
        </h3>
        <p className="text-muted-foreground mb-4">
          Si ocurre una brecha que afecte su información personal, lo
          notificaremos conforme a la ley en el plazo más breve posible, junto
          con pasos recomendados.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          7. Retención de Datos
        </h2>
        <p className="text-muted-foreground mb-4">
          Mantenemos su información personal durante:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Información de Cuenta:</strong> Mientras su cuenta sea
            activa, más 1 año después de cierre.
          </li>
          <li>
            <strong>Registros de Transacciones:</strong> 5-7 años (por
            obligaciones fiscales).
          </li>
          <li>
            <strong>Cookies:</strong> Según su tipo (sesión hasta 2 años).
          </li>
          <li>
            <strong>Logs de Servidor:</strong> 90 días.
          </li>
          <li>
            <strong>Comunicaciones:</strong> 3 años o conforme a retención
            legal.
          </li>
          <li>
            <strong>Datos de Marketing:</strong> Hasta que se opte por no
            participar.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          8. Sus Derechos
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          8.1 Derechos ARCO
        </h3>
        <p className="text-muted-foreground mb-4">
          Conforme a la ley de protección de datos, tiene derecho a:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Acceso (A):</strong> Solicitar copia de sus datos
            personales.
          </li>
          <li>
            <strong>Rectificación (R):</strong> Corregir información inexacta o
            incompleta.
          </li>
          <li>
            <strong>Cancelación (C):</strong> Solicitar eliminación de datos
            (bajo ciertas condiciones).
          </li>
          <li>
            <strong>Oposición (O):</strong> Oponerse al procesamiento de datos
            (ej: marketing).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          8.2 Cómo Ejercer Sus Derechos
        </h3>
        <p className="text-muted-foreground mb-4">
          Para ejercer derechos ARCO, contáctenos con:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Solicitud escrita especificando el derecho.</li>
          <li>Identificación válida (cédula, pasaporte).</li>
          <li>Domicilio para notificación.</li>
          <li>Descripción clara de lo solicitado.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          8.3 Plazo de Respuesta
        </h3>
        <p className="text-muted-foreground mb-4">
          Responderemos en un plazo máximo de 20 días hábiles a partir de
          recibida la solicitud.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          8.4 Derechos Adicionales
        </h3>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Portabilidad:</strong> Recibir sus datos en formato
            estructurado.
          </li>
          <li>
            <strong>Retirar Consentimiento:</strong> Optar por no recibir
            marketing.
          </li>
          <li>
            <strong>No Discriminación:</strong> No podemos discriminar por
            ejercer derechos.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          9. Marketing y Comunicaciones
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          9.1 Comunicaciones de Marketing
        </h3>
        <p className="text-muted-foreground mb-4">Podemos enviarle:</p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Boletines con ofertas y promociones.</li>
          <li>Notificaciones de productos nuevos.</li>
          <li>Invitaciones a eventos y ventas especiales.</li>
          <li>Información personalizada basada en compras previas.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          9.2 Opt-Out
        </h3>
        <p className="text-muted-foreground mb-4">
          Puede optar por no recibir comunicaciones de marketing en cualquier
          momento:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Haciendo clic en "Desuscribirse" en el correo.</li>
          <li>Modificando preferencias en su perfil.</li>
          <li>Contactándonos directamente.</li>
        </ul>

        <p className="text-muted-foreground mb-4">
          Nota: Seguirá recibiendo comunicaciones operacionales (confirmación de
          pedidos, actualizaciones).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          10. Información de Menores
        </h2>
        <p className="text-muted-foreground mb-4">
          Nuestro sitio no está dirigido a menores de 18 años. No recopilamos
          intencionalmente información de menores. Si descubrimos que hemos
          recopilado datos de un menor, los eliminaremos inmediatamente.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          11. Redes Sociales
        </h2>
        <p className="text-muted-foreground mb-4">
          Si vincula su cuenta de red social con DEKORANS:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Accedemos solo a información que autoriza la red social.</li>
          <li>No publicamos en sus redes sin consentimiento.</li>
          <li>Puede desvincularse en cualquier momento.</li>
          <li>Se aplica la política de privacidad de la red social también.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          12. Enlaces Externos
        </h2>
        <p className="text-muted-foreground mb-4">
          Nuestro sitio contiene enlaces a sitios de terceros. No somos
          responsables de sus políticas de privacidad. Recomendamos revisar sus
          políticas antes de proporcionar información.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          13. California Consumer Privacy Act (CCPA)
        </h2>
        <p className="text-muted-foreground mb-4">
          Si reside en California, tiene derechos especiales bajo CCPA:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Derecho a saber qué datos se recopilan y cómo se usan.</li>
          <li>Derecho a solicitar eliminación de datos.</li>
          <li>Derecho a optar por no vender información.</li>
          <li>Derecho a no discriminación por ejercer derechos CCPA.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          14. GDPR (Régimen General de Datos)
        </h2>
        <p className="text-muted-foreground mb-4">
          Si reside en la Unión Europea, sus datos se procesan conforme a GDPR.
          Tiene derechos de acceso, rectificación, eliminación y portabilidad de
          datos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          15. Cambios a Esta Política
        </h2>
        <p className="text-muted-foreground mb-4">
          Podemos actualizar esta Política de Privacidad periódicamente. Los
          cambios entran en vigencia inmediatamente. Recomendamos revisar esta
          política regularmente. El uso continuado del sitio implica aceptación
          de cambios.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          16. Responsable de Datos
        </h2>
        <p className="text-muted-foreground mb-4">
          DEKORANS es responsable del tratamiento de sus datos personales según
          esta política.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          17. Contacto para Privacidad
        </h2>
        <p className="text-muted-foreground mb-4">
          Para consultas sobre privacidad, derechos de datos o esta política,
          contáctenos:
        </p>
        <div className="bg-card/50 border border-border rounded p-4 mt-4">
          <p className="text-muted-foreground">
            <strong>Correo de Privacidad:</strong> privacy@DEKORANS
            <br />
            <strong>Oficial de Protección de Datos:</strong> dpo@DEKORANS
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

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          18. Autoridades de Protección
        </h2>
        <p className="text-muted-foreground mb-4">
          Si considera que sus derechos no han sido respetados, puede presentar
          reclamación ante:
        </p>
        <div className="bg-card/50 border border-border rounded p-4 mt-4">
          <p className="text-muted-foreground">
            <strong>
              Instituto Nacional de Transparencia, Acceso a la Información y
              Protección de Datos Personales (INAI)
            </strong>
            <br />
            Sitio: www.inai.org.mx
            <br />
            Teléfono: 01-800-835-4324
            <br />
            Dirección: Avenida Universidad 1200, Coyoacán, México DF
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
