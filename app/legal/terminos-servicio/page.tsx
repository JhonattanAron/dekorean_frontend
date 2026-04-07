import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio | TuEcommerce",
  description:
    "Consulta nuestros términos y condiciones de servicio para compras online",
};

export default function TerminosServicio() {
  return (
    <div className="prose prose-invert max-w-none dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Términos de Servicio
      </h1>

      <p className="text-sm text-muted-foreground mb-8">
        <strong>Última actualización:</strong> Abril 2025
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          1. Introducción
        </h2>
        <p className="text-muted-foreground mb-4">
          Bienvenido a <strong>DEKORANS</strong> ("el Sitio", "nosotros" o "la
          Empresa"). Estos Términos de Servicio constituyen un acuerdo legal
          vinculante entre usted ("Usuario", "Cliente" o "Usted") y DEKORANS
          respecto al acceso y uso de nuestro sitio web, aplicaciones móviles, y
          todos los servicios relacionados.
        </p>
        <p className="text-muted-foreground mb-4">
          Al acceder, navegar o usar este sitio web, usted acepta de manera
          plena y sin reservas estos Términos de Servicio. Si no está de acuerdo
          con alguna parte de estos términos, le recomendamos que no continúe
          usando el sitio.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          2. Definiciones
        </h2>
        <ul className="space-y-3 text-muted-foreground list-disc list-inside">
          <li>
            <strong>Usuario/Cliente:</strong> Cualquier persona que accede o usa
            el sitio web.
          </li>
          <li>
            <strong>Producto:</strong> Artículos disponibles para compra en
            nuestro catálogo.
          </li>
          <li>
            <strong>Pedido:</strong> Solicitud formal de compra de productos
            realizada a través del sitio.
          </li>
          <li>
            <strong>Transacción:</strong> El proceso completo desde la selección
            del producto hasta la entrega.
          </li>
          <li>
            <strong>Precio:</strong> El valor económico del producto más
            impuestos y gastos de envío aplicables.
          </li>
          <li>
            <strong>Métodos de Pago:</strong> Formas de pago aceptadas en
            nuestra plataforma.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          3. Acceso al Sitio Web
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          3.1 Elegibilidad
        </h3>
        <p className="text-muted-foreground mb-4">
          Para acceder y utilizar este sitio web, debe cumplir con los
          siguientes requisitos:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Ser mayor de 18 años o mayor de edad según su jurisdicción.</li>
          <li>Tener la capacidad legal para formar contratos vinculantes.</li>
          <li>
            No estar prohibido de usar el sitio según las leyes de su país.
          </li>
          <li>Acceder desde una ubicación donde es legal usar el sitio.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          3.2 Licencia de Uso
        </h3>
        <p className="text-muted-foreground mb-4">
          Otorgamos una licencia limitada, no exclusiva, intransferible y
          revocable para usar este sitio web únicamente para fines personales,
          no comerciales. Usted no puede:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            Reproducir, distribuir, transmitir, modificar o adaptarse el
            contenido del sitio.
          </li>
          <li>Realizar "scraping" o extracción automática de datos.</li>
          <li>
            Acceder al sitio mediante bots o herramientas automatizadas no
            autorizadas.
          </li>
          <li>
            Usar el sitio para propósitos comerciales sin autorización
            explícita.
          </li>
          <li>Interferir con el funcionamiento normal del sitio web.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          4. Registro de Cuenta
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          4.1 Creación de Cuenta
        </h3>
        <p className="text-muted-foreground mb-4">
          Para realizar compras en DEKORANS, debe crear una cuenta
          proporcionando:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Nombre completo y válido.</li>
          <li>Dirección de correo electrónico válida y activa.</li>
          <li>Número de teléfono contacto (requerido para entregas).</li>
          <li>
            Contraseña segura (mínimo 8 caracteres con letras, números y
            símbolos).
          </li>
          <li>Información de facturación y envío correcta.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          4.2 Responsabilidad del Usuario
        </h3>
        <p className="text-muted-foreground mb-4">
          Usted es completamente responsable de:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Mantener la confidencialidad de sus credenciales de acceso.</li>
          <li>Toda actividad que ocurra bajo su cuenta.</li>
          <li>Notificarnos inmediatamente de accesos no autorizados.</li>
          <li>Mantener actualizada la información de su perfil.</li>
          <li>No permitir que terceros usen su cuenta.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          4.3 Suspensión de Cuenta
        </h3>
        <p className="text-muted-foreground mb-4">
          Nos reservamos el derecho de suspender o cancelar su cuenta si:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Viola estos Términos de Servicio.</li>
          <li>Proporciona información falsa o fraudulenta.</li>
          <li>Se detecta actividad sospechosa o fraudulenta.</li>
          <li>Realiza múltiples devoluciones sin justificación.</li>
          <li>Incumple con obligaciones de pago.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          5. Productos y Precios
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.1 Disponibilidad de Productos
        </h3>
        <p className="text-muted-foreground mb-4">
          Todos los productos se ofrecen sujetos a disponibilidad de inventario.
          Los precios, especificaciones, colores, tamaños y disponibilidad
          mostrados en el sitio se consideran ofertas para vender y no
          constituyen obligaciones vinculantes. Nos reservamos el derecho de:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Rechazar cualquier pedido por cualquier razón.</li>
          <li>Corregir errores de precio o información del producto.</li>
          <li>Suspender la venta de productos sin previo aviso.</li>
          <li>Modificar especificaciones de productos.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.2 Precisión de la Información
        </h3>
        <p className="text-muted-foreground mb-4">
          Si bien nos esforzamos por mantener información precisa, no
          garantizamos que todas las descripciones de productos, precios,
          imágenes o especificaciones sean exactas, completas o libres de
          errores. Se hacen esfuerzos razonables para actualizar la información
          del producto regularmente.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          5.3 Precios y Cambios
        </h3>
        <p className="text-muted-foreground mb-4">
          Los precios están sujetos a cambios sin previo aviso y pueden variar
          según:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Fluctuaciones del mercado.</li>
          <li>Cambios en costos de producción o importación.</li>
          <li>Promociones y descuentos especiales.</li>
          <li>Cambios impositivos o arancelarios.</li>
          <li>Disponibilidad regional.</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          El precio del pedido se congela una vez que el cliente ha completado
          el proceso de compra y ha realizado el pago.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          6. Pedidos y Compra
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          6.1 Proceso de Compra
        </h3>
        <p className="text-muted-foreground mb-4">
          El proceso de compra en nuestro sitio incluye los siguientes pasos:
        </p>
        <ol className="space-y-2 text-muted-foreground list-decimal list-inside mb-4">
          <li>Seleccionar productos y agregarlos al carrito.</li>
          <li>Revisar el carrito e indicar cantidad y variantes.</li>
          <li>
            Proporcionar dirección de envío (igual o distinta a la facturación).
          </li>
          <li>Seleccionar método de envío.</li>
          <li>Seleccionar método de pago.</li>
          <li>Completar el pago.</li>
          <li>Recibir confirmación de pedido por correo electrónico.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          6.2 Aceptación de Pedidos
        </h3>
        <p className="text-muted-foreground mb-4">
          Todos los pedidos están sujetos a aceptación y verificación. DEKORANS
          se reserva el derecho de aceptar o rechazar cualquier pedido por
          cualquier motivo, incluyendo pero no limitado a:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Datos de pago rechazados o inválidos.</li>
          <li>Dirección de entrega problemática o incompleta.</li>
          <li>Patrones sospechosos de compra.</li>
          <li>Violación de políticas de venta.</li>
          <li>Indisponibilidad de inventario confirmada.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          6.3 Confirmación de Pedido
        </h3>
        <p className="text-muted-foreground mb-4">
          Una vez procesado exitosamente el pago, recibirá un correo de
          confirmación con:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Número de pedido único.</li>
          <li>Resumen de productos ordenados.</li>
          <li>Precio total y desglose de costos.</li>
          <li>Método de envío seleccionado.</li>
          <li>Dirección de entrega confirmada.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          7. Métodos de Pago
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          7.1 Métodos Aceptados
        </h3>
        <p className="text-muted-foreground mb-4">
          Aceptamos los siguientes métodos de pago:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Tarjetas de Crédito:</strong> Visa, Mastercard, American
            Express.
          </li>
          <li>
            <strong>Tarjetas de Débito:</strong> Visa Débito, Mastercard Débito.
          </li>
          <li>
            <strong>Billeteras Digitales:</strong> PayPal, Google Pay, Apple
            Pay.
          </li>
          <li>
            <strong>Transferencia Bancaria:</strong> Transferencia directa a
            cuenta bancaria.
          </li>
          <li>
            <strong>Criptomonedas:</strong> Bitcoin, Ethereum (sujeto a
            disponibilidad regional).
          </li>
          <li>
            <strong>Compra Ahora, Paga Después:</strong> Servicios de
            financiamiento aprobado.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          7.2 Procesamiento de Pagos
        </h3>
        <p className="text-muted-foreground mb-4">
          Todos los pagos son procesados por procesadores de pago terceros
          autorizados. Al proporcionar información de pago, usted garantiza que:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Es el titular autorizado de la tarjeta o cuenta.</li>
          <li>Tiene fondos disponibles para completar la transacción.</li>
          <li>Autoriza el cargo del monto indicado.</li>
          <li>Toda información proporcionada es precisa y completa.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          7.3 Seguridad en Pagos
        </h3>
        <p className="text-muted-foreground mb-4">
          Utilizamos encriptación SSL/TLS (Secure Sockets Layer) de 256 bits
          para proteger la información sensible. Sin embargo, no podemos
          garantizar que la transmisión de datos sea completamente segura. Usted
          usa el sitio bajo su propio riesgo respecto a cualquier pérdida de
          información de pago durante la transmisión.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          7.4 Moneda y Conversión
        </h3>
        <p className="text-muted-foreground mb-4">
          Todos los precios se muestran en Pesos Mexicanos (MXN) o en la moneda
          de su país. Si paga desde otro país, su banco o proveedor de pago
          puede aplicar cargos adicionales por conversión de moneda. DEKORANS no
          es responsable de estos cargos.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          7.5 Fraude y Transacciones Sospechosas
        </h3>
        <p className="text-muted-foreground mb-4">
          Nos reservamos el derecho de:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Retener o rechazar pagos sospechosos.</li>
          <li>Solicitar documentación adicional para verificar identidad.</li>
          <li>Cancelar pedidos si se sospecha fraude.</li>
          <li>Reportar actividad fraudulenta a autoridades competentes.</li>
          <li>Bloquear usuarios con patrones fraudulentos.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          8. Envío y Entrega
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          8.1 Opciones de Envío
        </h3>
        <p className="text-muted-foreground mb-4">
          Ofrecemos varias opciones de envío según su ubicación:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            <strong>Envío Estándar:</strong> 5-7 días hábiles (gratis en compras
            mayores a $500).
          </li>
          <li>
            <strong>Envío Express:</strong> 2-3 días hábiles (costo adicional).
          </li>
          <li>
            <strong>Envío Next Day:</strong> Entrega al día siguiente
            (disponible en ciudades principales).
          </li>
          <li>
            <strong>Recogida en Sucursal:</strong> Disponible en tiendas
            seleccionadas (0 costo de envío).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          8.2 Costos de Envío
        </h3>
        <p className="text-muted-foreground mb-4">
          Los costos de envío se calculan en función de:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Peso y dimensiones del paquete.</li>
          <li>Código postal de destino.</li>
          <li>Método de envío seleccionado.</li>
          <li>Ubicación geográfica (nacional o internacional).</li>
          <li>Promociones o descuentos aplicables.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          8.3 Plazos de Entrega
        </h3>
        <p className="text-muted-foreground mb-4">
          Los plazos de entrega estimados son aproximados y no son garantías.
          Pueden variar por:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Condiciones climáticas adversas.</li>
          <li>Congestión en centros de distribución.</li>
          <li>Problemas de logística de terceros.</li>
          <li>Retrasos en customs (envíos internacionales).</li>
          <li>Direcciones incompletas o incorrectas.</li>
          <li>Festivos o días no laborales.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          8.4 Responsabilidad del Usuario
        </h3>
        <p className="text-muted-foreground mb-4">
          El usuario es responsable de:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Proporcionar dirección de entrega correcta y completa.</li>
          <li>Estar disponible para recibir el paquete.</li>
          <li>Inspeccionar el paquete al recibirlo.</li>
          <li>Reportar problemas inmediatamente.</li>
          <li>Mantener la información de contacto actualizada.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          8.5 Riesgo de Transporte
        </h3>
        <p className="text-muted-foreground mb-4">
          El riesgo de pérdida, daño o robo del paquete en tránsito se
          transfiere al cliente una vez que el paquete ha sido entregado al
          transportista, salvo que haya sido asegurado específicamente.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          8.6 Envíos Internacionales
        </h3>
        <p className="text-muted-foreground mb-4">
          Para envíos internacionales:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            El cliente es responsable de conocer las regulaciones de
            importación.
          </li>
          <li>
            El cliente es responsable de los aranceles, impuestos y aduanas.
          </li>
          <li>Los tiempos de entrega son aproximados y pueden ser mayores.</li>
          <li>
            Algunos productos pueden estar restringidos para ciertos países.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          9. Devoluciones y Reembolsos
        </h2>
        <p className="text-muted-foreground mb-4">
          Consulte nuestra Política de Devoluciones para obtener información
          completa sobre devoluciones, cambios, reembolsos y procedimientos. Las
          devoluciones están sujetas a condiciones específicas y plazos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          10. Impuestos
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          10.1 IVA y Otros Impuestos
        </h3>
        <p className="text-muted-foreground mb-4">
          Los precios mostrados incluyen IVA (Impuesto al Valor Agregado) al 16%
          o según la tasa aplicable en su jurisdicción. Impuestos adicionales,
          aranceles aduanales o cargos especiales pueden aplicarse según su
          ubicación.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          10.2 Responsabilidad Fiscal
        </h3>
        <p className="text-muted-foreground mb-4">
          El usuario es responsable de reportar compras a sus autoridades
          fiscales según sea necesario. Podemos proporcionar facturas detalladas
          para propósitos fiscales.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          11. Garantías de Productos
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          11.1 Garantía del Fabricante
        </h3>
        <p className="text-muted-foreground mb-4">
          Todos los productos incluyen la garantía del fabricante. La duración y
          cobertura varían según el fabricante. Proporcionaremos información de
          garantía al momento de la compra.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          11.2 Garantía de Satisfacción
        </h3>
        <p className="text-muted-foreground mb-4">
          Ofrecemos una garantía de satisfacción de 30 días. Si el producto no
          cumple con sus expectativas, puede devolverlo para obtener un
          reembolso completo.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          11.3 Disclaimer
        </h3>
        <p className="text-muted-foreground mb-4">
          SALVO LO EXPRESAMENTE INDICADO, TODOS LOS PRODUCTOS SE VENDEN "TAL
          CUAL" SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO
          GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR O
          NO INFRACCIÓN.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          12. Limitación de Responsabilidad
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          12.1 Limitación General
        </h3>
        <p className="text-muted-foreground mb-4">
          EN NINGÚN CASO, DEKORANS SERÁ RESPONSABLE POR:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>
            Daños directos, indirectos, incidentales, especiales o consecuentes.
          </li>
          <li>Pérdida de ganancias, ingresos, datos o información.</li>
          <li>Costo de sustitución o reemplazo de servicios.</li>
          <li>Interrupción del negocio o acceso al sitio.</li>
          <li>Errores, omisiones o inexactitudes en el contenido.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          12.2 Límite de Responsabilidad
        </h3>
        <p className="text-muted-foreground mb-4">
          La responsabilidad máxima de DEKORANS por cualquier reclamación no
          excederá el monto total pagado por el cliente en el producto
          específico que originó la reclamación.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          13. Privacidad y Datos Personales
        </h2>
        <p className="text-muted-foreground mb-4">
          El uso de información personal se rige por nuestra Política de
          Privacidad. Al usar este sitio, usted consiente el recopilación y uso
          de información como se describe en dicha política.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          14. Contenido del Usuario
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          14.1 Comentarios y Reseñas
        </h3>
        <p className="text-muted-foreground mb-4">
          Los usuarios pueden dejar comentarios, reseñas y calificaciones de
          productos. Al hacerlo, otorga a DEKORANS licencia perpetua para usar
          dicho contenido.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          14.2 Prohibiciones
        </h3>
        <p className="text-muted-foreground mb-4">
          No puede publicar contenido que sea:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Falso, engañoso o fraudulento.</li>
          <li>Violento, abusivo, amenazante o ofensivo.</li>
          <li>Obsceno, vulgar o sexualmente explícito.</li>
          <li>Que infrinja derechos de propiedad intelectual.</li>
          <li>Spam, publicidad o promoción no autorizada.</li>
          <li>Información personal de terceros sin consentimiento.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          15. Propiedad Intelectual
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          15.1 Derechos de Autor
        </h3>
        <p className="text-muted-foreground mb-4">
          Todo el contenido del sitio web (texto, imágenes, videos, logos,
          diseños) está protegido por derechos de autor y propiedad intelectual.
          El uso sin autorización está prohibido.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          15.2 Marca Comercial
        </h3>
        <p className="text-muted-foreground mb-4">
          Los nombres, logos y marcas de DEKORANS y sus proveedores son marcas
          comerciales registradas. Su uso requiere autorización explícita.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          16. Conducta del Usuario
        </h2>
        <p className="text-muted-foreground mb-4">
          El usuario se compromete a no:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Usar el sitio para actividades ilegales.</li>
          <li>Hostigar, amenazar o abusar de otros usuarios.</li>
          <li>Introducir virus, malware o código malicioso.</li>
          <li>Intentar acceder a sistemas sin autorización.</li>
          <li>Manipular precios o participar en fraude.</li>
          <li>Violar derechos de terceros.</li>
          <li>Spamear o hacer phishing.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          17. Terminación
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          17.1 Derechos de Terminación
        </h3>
        <p className="text-muted-foreground mb-4">
          DEKORANS puede terminar o suspender su acceso al sitio en cualquier
          momento, por cualquier razón, sin previo aviso o responsabilidad.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          17.2 Efecto de la Terminación
        </h3>
        <p className="text-muted-foreground mb-4">Tras la terminación:</p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Se cancelarán los derechos de acceso.</li>
          <li>Se puede eliminar información de la cuenta.</li>
          <li>Las obligaciones de pago previas permanecen.</li>
          <li>Se mantendrán ciertos derechos y obligaciones.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          18. Modificaciones a los Términos
        </h2>
        <p className="text-muted-foreground mb-4">
          Nos reservamos el derecho de modificar estos Términos de Servicio en
          cualquier momento. Los cambios entran en vigencia inmediatamente. El
          uso continuado del sitio constituyó aceptación de los términos
          modificados. Recomendamos revisar periodicamente estos términos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          19. Ley Aplicable y Jurisdicción
        </h2>
        <p className="text-muted-foreground mb-4">
          Estos Términos de Servicio se rigen por las leyes de México. Cualquier
          disputa se resolverá en los tribunales competentes de la Ciudad de
          México. Usted acepta someterse a la jurisdicción exclusiva de dichos
          tribunales.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
          20. Disposiciones Finales
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          20.1 Separabilidad
        </h3>
        <p className="text-muted-foreground mb-4">
          Si alguna disposición de estos Términos es inválida, las demás
          disposiciones permanecen en vigor.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          20.2 Acuerdo Completo
        </h3>
        <p className="text-muted-foreground mb-4">
          Estos Términos, junto con nuestra Política de Privacidad, constituyen
          el acuerdo completo entre usted y DEKORANS.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
          20.3 Contacto
        </h3>
        <p className="text-muted-foreground mb-4">
          Para preguntas sobre estos Términos de Servicio, contáctenos en:
        </p>
        <div className="bg-card/50 border border-border rounded p-4 mt-4">
          <p className="text-muted-foreground">
            <strong>Email:</strong> legal@DEKORANS
            <br />
            <strong>Teléfono:</strong> +52 (55) 1234-5678
            <br />
            <strong>Dirección:</strong> Avenida Reforma 505, Cuauhtémoc, México
            DF 06500
            <br />
            <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM (Hora
            de México)
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
