import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal | TuEcommerce",
  description: "Aviso legal e información sobre TuEcommerce",
};

export default function AvisoLegal() {
  return (
    <div className="prose prose-invert max-w-none dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Aviso Legal</h1>

      <p className="text-sm text-muted-foreground mb-8">
        <strong>Última actualización:</strong> Abril 2025
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          1. Identificación del Titular del Sitio
        </h2>
        <div className="bg-card/50 border border-border rounded p-4 mb-4">
          <p className="text-muted-foreground mb-2">
            <strong>Nombre de la Empresa:</strong> DEKORANS, S.A. de C.V.
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>RFC:</strong> TUE012345ABC
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Domicilio:</strong> Avenida Reforma 505, Cuauhtémoc, México
            DF 06500
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Teléfono:</strong> +52 (55) 1234-5678
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Correo:</strong> info@dekorans.com
          </p>
          <p className="text-muted-foreground">
            <strong>Sitio Web:</strong> www.dekorans.es
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          2. Registro Mercantil
        </h2>
        <p className="text-muted-foreground mb-4">
          DEKORANS está duly registrada en:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Registro Público de Comercio:</strong> Folio Mercantil No.
            123456789
          </li>
          <li>
            <strong>Clave del Registro:</strong> DFXXMXDFO000001
          </li>
          <li>
            <strong>Fecha de Inscripción:</strong> 15 de enero de 2020
          </li>
          <li>
            <strong>Órgano Regulador:</strong> Secretaría de Economía (SE)
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          3. Autoridades Fiscales y Regulatorias
        </h2>
        <p className="text-muted-foreground mb-4">
          DEKORANS cumple con las siguientes regulaciones:
        </p>
        <ul className="space-y-3 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Impuesto Sobre la Renta (ISR):</strong> Registrado ante el
            SAT
          </li>
          <li>
            <strong>Impuesto al Valor Agregado (IVA):</strong> Tasa estándar 16%
          </li>
          <li>
            <strong>Profesional Independiente:</strong> Registrado como
            ecommerce
          </li>
          <li>
            <strong>Autorización CNBV:</strong> Para transacciones de pago (si
            aplica)
          </li>
          <li>
            <strong>Registro INAI:</strong> Conforme a LFPDPPP
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          4. Propiedad Intelectual
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          4.1 Derechos de Autor
        </h3>
        <p className="text-muted-foreground mb-4">
          Todos los elementos del sitio web están protegidos por derechos de
          autor:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Texto, imágenes, vídeos y gráficos.</li>
          <li>Código fuente y estructura del sitio.</li>
          <li>Diseño y aspecto visual.</li>
          <li>Contenido de bases de datos.</li>
          <li>Logos y marcas comerciales.</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          © 2025 DEKORANS - Todos los derechos reservados.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          4.2 Marcas Registradas
        </h3>
        <p className="text-muted-foreground mb-4">
          Las siguientes marcas son propiedad de DEKORANS:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>DEKORANS™ - Registro IMPI No. 1234567</li>
          <li>Logo de DEKORANS - Registro IMPI No. 1234568</li>
          <li>Slogan corporativo - Registro IMPI No. 1234569</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          4.3 Prohibiciones
        </h3>
        <p className="text-muted-foreground mb-4">
          Está prohibido sin autorización expresa:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Reproducir o copiar contenido del sitio.</li>
          <li>Usar marcas o logos sin permiso.</li>
          <li>Crear obras derivadas.</li>
          <li>Comercializar contenido.</li>
          <li>Distribuir sin licencia.</li>
          <li>Modificar o descompilar el código.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          5. Disclaimer - Exención de Responsabilidad
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.1 Contenido del Sitio
        </h3>
        <p className="text-muted-foreground mb-4">
          AUNQUE NOS ESFORZAMOS POR MANTENER INFORMACIÓN PRECISA Y ACTUALIZADA:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>No garantizamos que todo contenido sea exacto o completo.</li>
          <li>La información se proporciona "tal cual" sin garantías.</li>
          <li>No somos responsables por errores, omisiones o inexactitudes.</li>
          <li>El contenido puede cambiar sin previo aviso.</li>
          <li>No ofrecemos garantía de disponibilidad continua del sitio.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.2 Productos y Servicios
        </h3>
        <p className="text-muted-foreground mb-4">
          Respecto a productos y servicios ofrecidos:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Las imágenes son representativas, pueden variar ligeramente.</li>
          <li>Las descripciones están sujetas a cambios.</li>
          <li>La disponibilidad depende del inventario actual.</li>
          <li>Los precios pueden cambiar en cualquier momento.</li>
          <li>Nos reservamos derecho de rechazar pedidos.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.3 Garantías
        </h3>
        <p className="text-muted-foreground mb-4">
          SE PROPORCIONAN "TAL CUAL" SIN GARANTÍAS:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Expresas o implícitas de ningún tipo.</li>
          <li>De comerciabilidad o idoneidad.</li>
          <li>De precisión o integridad.</li>
          <li>De cumplimiento de derechos de terceros.</li>
          <li>De ausencia de virus o malware.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          6. Limitación de Responsabilidad
        </h2>
        <p className="text-muted-foreground mb-4">
          BAJO NINGUNA CIRCUNSTANCIA SEREMOS RESPONSABLES POR:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Daños directos, indirectos o consecuentes.</li>
          <li>Pérdida de datos, información o ingresos.</li>
          <li>Daño a reputación o negocio.</li>
          <li>Interrupción de servicio.</li>
          <li>Costo de reemplazo o recuperación.</li>
          <li>Cualquier reclamación de terceros.</li>
        </ul>
        <p className="text-muted-foreground mb-4 mt-4">
          Aunque hayamos sido advertidos de la posibilidad de tales daños.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          7. Responsabilidad del Usuario
        </h2>
        <p className="text-muted-foreground mb-4">
          El usuario es responsable de:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Uso adecuado del sitio conforme a la ley.</li>
          <li>No violar derechos de terceros.</li>
          <li>No introducir malware o virus.</li>
          <li>No intentar acceder sin autorización.</li>
          <li>Mantener la confidencialidad de credenciales.</li>
          <li>Proporcionar información veraz y completa.</li>
          <li>Cumplir con estas condiciones legales.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          8. Enlaces Externos
        </h2>
        <p className="text-muted-foreground mb-4">
          Respecto a enlaces a sitios terceros:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>No somos responsables por contenido externo.</li>
          <li>No respaldamos necesariamente sitios enlazados.</li>
          <li>No controlamos políticas de privacidad externas.</li>
          <li>Se proporcionan solo por conveniencia.</li>
          <li>Los usuarios usan enlaces bajo su propio riesgo.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          9. Modificación de Términos
        </h2>
        <p className="text-muted-foreground mb-4">
          Nos reservamos el derecho de modificar:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Este aviso legal en cualquier momento.</li>
          <li>Contenido y servicios del sitio.</li>
          <li>Disponibilidad del sitio (total o parcial).</li>
          <li>Términos y condiciones.</li>
          <li>Política de precios.</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Cambios entran en vigencia inmediatamente. El uso continuado implica
          aceptación.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          10. Disponibilidad del Sitio
        </h2>
        <p className="text-muted-foreground mb-4">
          Aunque nos esforzamos por mantener el sitio disponible:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>No garantizamos disponibilidad 24/7.</li>
          <li>Pueden ocurrir interrupciones por mantenimiento.</li>
          <li>Puede haber problemas técnicos fuera de nuestro control.</li>
          <li>No somos responsables por interrupciones.</li>
          <li>Nos reservamos derecho de desconexión sin aviso.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          11. Acceso al Sitio
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          11.1 Términos de Acceso
        </h3>
        <p className="text-muted-foreground mb-4">
          El acceso al sitio está condicionado a:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Aceptación de este aviso legal.</li>
          <li>Cumplimiento de leyes aplicables.</li>
          <li>Respeto a estos términos.</li>
          <li>No interferencia con operaciones.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          11.2 Acceso Restringido
        </h3>
        <p className="text-muted-foreground mb-4">Podemos denegar acceso a:</p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Usuarios que violen estos términos.</li>
          <li>Personas no autorizadas legalmente.</li>
          <li>Robots o scraping automatizado.</li>
          <li>Intentos de hacking o intrusión.</li>
          <li>Abuso repetido del servicio.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          12. Ley Aplicable
        </h2>
        <p className="text-muted-foreground mb-4">
          Este aviso legal y todas las relaciones entre usuario y DEKORANS se
          rigen por:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Leyes de los Estados Unidos Mexicanos.</li>
          <li>Específicamente, leyes del Distrito Federal/CDMX.</li>
          <li>Código Civil Federal.</li>
          <li>Código de Comercio.</li>
          <li>Ley Federal de Protección al Consumidor.</li>
          <li>LFPDPPP (Datos Personales).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          13. Jurisdicción y Competencia
        </h2>
        <p className="text-muted-foreground mb-4">
          Cualquier disputa se resolverá:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>En tribunales competentes de la Ciudad de México.</li>
          <li>Bajo las reglas de procedimiento civil federal.</li>
          <li>O a través de arbitraje conforme a LACCM si aplica.</li>
          <li>Ambas partes se someten a esta jurisdicción.</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          El usuario renuncia a derechos de litigio en otra jurisdicción.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          14. Resolución de Disputas
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          14.1 Procedimiento de Reclamación
        </h3>
        <p className="text-muted-foreground mb-4">Si tiene disputa, puede:</p>
        <ol className="space-y-2 text-muted-foreground list-decimal list-inside mb-4">
          <li>Contactar al servicio al cliente para resolver.</li>
          <li>Presentar reclamación formal por escrito.</li>
          <li>Solicitar mediación si está disponible.</li>
          <li>Iniciar arbitraje si procede.</li>
          <li>Acudir a tribunales como último recurso.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          14.2 PROCON (Protección al Consumidor)
        </h3>
        <p className="text-muted-foreground mb-4">
          En México, el usuario tiene derechos ante PROCON:
        </p>
        <div className="bg-card/50 border border-border rounded p-4 mt-4">
          <p className="text-muted-foreground">
            <strong>Procuraduría Federal del Consumidor (PROCON)</strong>
            <br />
            Sitio: www.gob.mx/procon
            <br />
            Teléfono: 01-800-468-8000
            <br />
            Correo: contacto@procon.gob.mx
            <br />
            Puede presentar reclamaciones por incumplimiento de ley.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          15. Cumplimiento Legal
        </h2>
        <p className="text-muted-foreground mb-4">DEKORANS cumple con:</p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Ley de Comercio Electrónico:</strong> Información clara en
            transacciones.
          </li>
          <li>
            <strong>Ley Federal de Protección al Consumidor:</strong> Derecho a
            retracto.
          </li>
          <li>
            <strong>Ley de Impuesto al Valor Agregado:</strong> IVA 16% (cuando
            aplique).
          </li>
          <li>
            <strong>Ley de Protección de Datos:</strong> Cumplimiento LFPDPPP e
            INAI.
          </li>
          <li>
            <strong>Ley de Seguridad de Datos:</strong> Encriptación y medidas
            de seguridad.
          </li>
          <li>
            <strong>Leyes Antilavado de Dinero:</strong> Compliance con
            OFAC/SAT.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          16. Seguridad y Contraseñas
        </h2>
        <p className="text-muted-foreground mb-4">
          El usuario es responsable de:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Mantener confidencialidad de contraseñas.</li>
          <li>No compartir credenciales con terceros.</li>
          <li>Cambiar contraseña regularmente.</li>
          <li>Reportar acceso no autorizado inmediatamente.</li>
          <li>Usar navegadores y dispositivos seguros.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          17. Separabilidad
        </h2>
        <p className="text-muted-foreground mb-4">
          Si alguna cláusula de este aviso es inválida:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Las demás cláusulas permanecen vigentes.</li>
          <li>Se interpretará conforme a ley.</li>
          <li>Los efectos legales se mantendrán en la medida posible.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          18. Acuerdo Completo
        </h2>
        <p className="text-muted-foreground mb-4">
          Este aviso legal, junto con nuestros Términos de Servicio y Política
          de Privacidad, constituye el acuerdo completo entre usted y DEKORANS.
          Prevalece sobre cualquier otra comunicación previa.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          19. Enmiendas
        </h2>
        <p className="text-muted-foreground mb-4">
          Las enmiendas a este aviso legal se realizan mediante:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Publicación en el sitio web.</li>
          <li>Cambio de fecha de actualización.</li>
          <li>Aviso por correo a clientes registrados.</li>
          <li>Solicitud de confirmación de aceptación en transacciones.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          20. Contacto para Cuestiones Legales
        </h2>
        <p className="text-muted-foreground mb-4">
          Para consultas sobre este aviso legal:
        </p>
        <div className="bg-card/50 border border-border rounded p-4 mt-4">
          <p className="text-muted-foreground">
            <strong>Departamento Legal:</strong> legal@dekorans.es
            <br />
            <strong>Teléfono:</strong> +52 (55) 1234-5678
            <br />
            <strong>Dirección:</strong> Avenida Reforma 505, Cuauhtémoc, México
            DF 06500
            <br />
            <strong>Horario Atención:</strong> Lunes a Viernes, 9:00 AM - 6:00
            PM (Hora de México)
            <br />
            <strong>Tiempo de Respuesta:</strong> 48 horas hábiles
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
