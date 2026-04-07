import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Devoluciones | TuEcommerce',
  description: 'Política de devoluciones, cambios y reembolsos de TuEcommerce',
}

export default function Devolucion() {
  return (
    <div className="prose prose-invert max-w-none dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Política de Devoluciones</h1>
      
      <p className="text-sm text-muted-foreground mb-8">
        <strong>Última actualización:</strong> Abril 2025
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">1. Introducción</h2>
        <p className="text-muted-foreground mb-4">
          En DEKORANS, queremos asegurar su satisfacción con cada compra. 
          Esta Política de Devoluciones detalla cómo puede devolver productos, solicitar cambios 
          y obtener reembolsos. Nuestro objetivo es hacer el proceso tan simple y sin complicaciones como sea posible.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">2. Período de Devolución</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">2.1 Plazo Estándar</h3>
        <p className="text-muted-foreground mb-4">
          Tiene <strong>30 días naturales</strong> a partir de la fecha de entrega del producto 
          para solicitar una devolución, cambio o reembolso.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">2.2 Cálculo del Plazo</h3>
        <p className="text-muted-foreground mb-4">
          El plazo se calcula como:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>30 días desde la fecha de entrega confirmada.</li>
          <li>Si se entrega un sábado, domingo o festivo, el plazo continúa.</li>
          <li>Se cuenta hasta las 23:59 horas del trigésimo día.</li>
          <li>Se deben solicitar devoluciones antes del vencimiento del plazo.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">2.3 Excepciones al Plazo</h3>
        <p className="text-muted-foreground mb-4">
          Extensiones especiales de plazo:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>Defectos Ocultos:</strong> Hasta 1 año si descubre defecto después de 30 días.</li>
          <li><strong>Productos Perecederos:</strong> Deben devolverse inmediatamente (típicamente 5 días).</li>
          <li><strong>Artículos Personalizados:</strong> Generalmente no retornables (a menos que lleguen defectuosos).</li>
          <li><strong>Ropas y Accesorios:</strong> Plazo estándar de 30 días.</li>
          <li><strong>Electrónica:</strong> 30 días en condición de nuevo.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">3. Productos Retornables</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">3.1 Productos que SÍ Pueden Devolverse</h3>
        <p className="text-muted-foreground mb-4">
          Puede devolver la mayoría de productos siempre que:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Estén en condición de nuevo o como se recibieron.</li>
          <li>Tengan todas las etiquetas originales intactas.</li>
          <li>No hayan sido usados, lavados o modificados.</li>
          <li>Se devuelvan dentro del plazo de 30 días.</li>
          <li>Vengan con el embalaje original (si es posible).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">3.2 Productos NO Retornables</h3>
        <p className="text-muted-foreground mb-4">
          Los siguientes productos NO pueden devolverse:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>Artículos Perecederos:</strong> Alimentos, bebidas, medicinas (una vez abiertos).</li>
          <li><strong>Productos Personalizados/Made-to-Order:</strong> Gravados, bordados, personalizaciones.</li>
          <li><strong>Ropa Interior/Traje de Baño:</strong> Por razones de higiene (si se removieron etiquetas).</li>
          <li><strong>Productos Usados/Dañados:</strong> Si han sido usados significativamente.</li>
          <li><strong>Ítems Descontinuados:</strong> Algunos especiales o últimas unidades.</li>
          <li><strong>Descargas Digitales:</strong> Software, música, videos, ebooks (no retornables).</li>
          <li><strong>Servicios Completados:</strong> Instalaciones, reparaciones, personalizaciones completadas.</li>
          <li><strong>Productos a Granel:</strong> Compras a precio especial de liquidación (verificar al comprar).</li>
          <li><strong>Productos Etiquetados "Final Sale":</strong> Se venden sin derecho a devolución.</li>
          <li><strong>Regalos Abiertos:</strong> Si fueron regalados y no pueden probarse.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">4. Proceso de Devolución</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">4.1 Pasos para Devolver</h3>
        <ol className="space-y-3 text-muted-foreground list-decimal list-inside mb-4">
          <li>
            <strong>Iniciar Solicitud:</strong> Entre a "Mi Cuenta" → "Mis Pedidos" y seleccione el producto.
          </li>
          <li>
            <strong>Seleccionar Razón:</strong> Indique por qué devuelve (no satisfecho, defectuoso, equivocado, etc.).
          </li>
          <li>
            <strong>Describir el Problema:</strong> Proporcione detalles y fotos si lo requiere.
          </li>
          <li>
            <strong>Autorización de RMA:</strong> Recibirá número de autorización de devolución (RMA).
          </li>
          <li>
            <strong>Imprimir Etiqueta:</strong> Descargue etiqueta de envío prepagada.
          </li>
          <li>
            <strong>Empacar el Producto:</strong> Coloque el producto en el embalaje original si es posible.
          </li>
          <li>
            <strong>Enviar Devolución:</strong> Entregue en centro de envío con su etiqueta.
          </li>
          <li>
            <strong>Rastrear Envío:</strong> Use número de seguimiento para monitorear devolución.
          </li>
          <li>
            <strong>Recibimiento y Inspección:</strong> Nuestro centro verifica condición de producto.
          </li>
          <li>
            <strong>Procesamiento de Reembolso:</strong> Una vez aprobada, se procesa el reembolso.
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">4.2 Requisitos para Devolución</h3>
        <p className="text-muted-foreground mb-4">
          Cada devolución debe incluir:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>Número RMA:</strong> Escrito claramente en la caja exterior.</li>
          <li><strong>Producto Original:</strong> El artículo que desea devolver.</li>
          <li><strong>Embalaje Original:</strong> Si es posible, en condición original.</li>
          <li><strong>Etiquetas:</strong> Todas las etiquetas de precio y productos intactas.</li>
          <li><strong>Accesorios:</strong> Cables, baterías, manuales, etc. incluidos.</li>
          <li><strong>Comprobante de Compra:</strong> Número de pedido visible.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">4.3 Métodos de Devolución</h3>
        <p className="text-muted-foreground mb-4">
          Opciones para devolver productos:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>Envío Prepagado:</strong> Usamos correos/mensajería con etiqueta incluida.</li>
          <li><strong>Recogida en Sucursal:</strong> Podemos recoger en tienda (según ubicación).</li>
          <li><strong>Centro de Devolución:</strong> Llevar directamente a nuestro almacén.</li>
          <li><strong>Asociados de Logística:</strong> En puntos autorizados de FedEx, DHL, etc.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">5. Inspección y Aprobación</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">5.1 Proceso de Inspección</h3>
        <p className="text-muted-foreground mb-4">
          Al recibir la devolución:
        </p>
        <ol className="space-y-2 text-muted-foreground list-decimal list-inside mb-4">
          <li>Verificamos que el número RMA coincida.</li>
          <li>Inspeccionamos condición física del producto.</li>
          <li>Verificamos que todas las partes estén presentes.</li>
          <li>Comprobamos que funciona correctamente.</li>
          <li>Evaluamos si cumple criterios de "condición de nuevo".</li>
          <li>Documentamos cualquier daño o deficiencia.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">5.2 Criterios de Aceptación</h3>
        <p className="text-muted-foreground mb-4">
          Devoluciones se aceptan si:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>El producto está en condición de nuevo.</li>
          <li>No hay signos de uso o desgaste.</li>
          <li>El embalaje original está intacto.</li>
          <li>Todas las etiquetas están presentes.</li>
          <li>Todos los accesorios se incluyen.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">5.3 Devoluciones Rechazadas</h3>
        <p className="text-muted-foreground mb-4">
          Rechazaremos devoluciones si:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>El producto muestra signos de uso.</li>
          <li>Faltan componentes u accesorios.</li>
          <li>Las etiquetas han sido removidas o dañadas.</li>
          <li>El embalaje está roto o usado.</li>
          <li>Pasó el plazo de 30 días.</li>
          <li>No incluye número RMA.</li>
          <li>Está fuera de categoría retornable.</li>
        </ul>
        <p className="text-muted-foreground mb-4 mt-4">
          Si se rechaza la devolución, le notificaremos por correo con explicación. 
          Puede apelar dentro de 10 días proporcionando más información o fotos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">6. Reembolsos</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">6.1 Monto del Reembolso</h3>
        <p className="text-muted-foreground mb-4">
          El reembolso incluye:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>Precio del Producto:</strong> Lo que pagó por el artículo.</li>
          <li><strong>IVA:</strong> Impuesto cobrado en la compra.</li>
          <li><strong>Gastos de Envío Original:</strong> Si es elegible (ver próxima sección).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">6.2 Gastos de Envío</h3>
        <p className="text-muted-foreground mb-4">
          Los gastos de envío se reembolsan así:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>Producto Defectuoso:</strong> Reembolso completo de envío original + retorno.</li>
          <li><strong>Producto Incorrecto:</strong> Reembolso completo de envío original + retorno.</li>
          <li><strong>Cambio de Opinión:</strong> El cliente paga costo de retorno.</li>
          <li><strong>Devolución Elegible:</strong> Proporcionamos etiqueta de envío prepagada.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">6.3 Deducciones de Reembolso</h3>
        <p className="text-muted-foreground mb-4">
          Podemos deducir del reembolso:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>Costo de Retorno:</strong> Si el cliente lo solicita.</li>
          <li><strong>Daño por Negligencia:</strong> Si dañó el producto intencionalmente.</li>
          <li><strong>Uso Significativo:</strong> Desgaste más allá de inspección.</li>
          <li><strong>Componentes Faltantes:</strong> Si faltan accesorios originales.</li>
          <li><strong>Deprecación por Uso:</strong> En ciertos casos de electrónica (hasta 20%).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">6.4 Procesamiento de Reembolso</h3>
        <p className="text-muted-foreground mb-4">
          Plazos para procesar reembolsos:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>Aprobación Inicial:</strong> 5-10 días hábiles después de recibir devolución.</li>
          <li><strong>Procesamiento de Pago:</strong> 3-5 días hábiles después de aprobación.</li>
          <li><strong>Reflejado en Cuenta:</strong> 5-10 días hábiles (depende de banco).</li>
          <li><strong>Total:</strong> Entre 13-25 días hábiles en promedio.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">6.5 Método de Reembolso</h3>
        <p className="text-muted-foreground mb-4">
          El reembolso se procesa a:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>Tarjeta/Billetera Original:</strong> Se revierte a la tarjeta de pago usada.</li>
          <li><strong>Crédito en Cuenta:</strong> Opcionalmente, como crédito de tienda.</li>
          <li><strong>Transferencia Bancaria:</strong> Si lo solicita (se puede cobrar comisión).</li>
          <li><strong>Billetera Digital:</strong> Si pagó con PayPal, se reembolsa a PayPal.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">7. Cambios</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">7.1 Cambio por Talla/Color Diferente</h3>
        <p className="text-muted-foreground mb-4">
          Si desea cambiar por una talla o color diferente:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Siga el mismo proceso de devolución.</li>
          <li>Indique en "Razón" que es un cambio.</li>
          <li>Especifique qué variante desea.</li>
          <li>Si el nuevo producto cuesta más, debe pagar la diferencia.</li>
          <li>Si el nuevo producto cuesta menos, se reembolsa la diferencia.</li>
          <li>Costos de envío se cubren si producto original era defectuoso.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">7.2 Producto no Disponible</h3>
        <p className="text-muted-foreground mb-4">
          Si el producto solicitado para cambio no está disponible:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Le ofrecemos alternativas similares.</li>
          <li>Puede esperar a que vuelva a stock.</li>
          <li>Puede optar por reembolso completo.</li>
          <li>Se ofrece crédito de tienda con descuento.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">8. Devoluciones por Defecto</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">8.1 Productos Defectuosos</h3>
        <p className="text-muted-foreground mb-4">
          Si recibe un producto defectuoso:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Contáctenos inmediatamente con fotos del defecto.</li>
          <li>Tendrá derecho a reembolso o cambio sin restricciones.</li>
          <li>Proporcionaremos etiqueta de envío prepagada.</li>
          <li>Procesaremos reembolso rápidamente (5 días).</li>
          <li>No se aplicará ninguna deducción.</li>
          <li>Cubrimos costos de envío ida y vuelta.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">8.2 Producto Incorrecto o Faltante</h3>
        <p className="text-muted-foreground mb-4">
          Si recibe producto incorrecto o le falta algo:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Contacte al servicio dentro de 5 días.</li>
          <li>Proporcione pruebas (fotos, número de seguimiento).</li>
          <li>Reemplacemos el producto sin costo.</li>
          <li>O procesaremos reembolso completo.</li>
          <li>Sin deducción de gastos de envío.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">9. Política de Garantía</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">9.1 Garantía Estándar</h3>
        <p className="text-muted-foreground mb-4">
          Todos los productos incluyen garantía:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>30 Días:</strong> Garantía de satisfacción (derecho a devolución).</li>
          <li><strong>1 Año:</strong> Garantía contra defectos de fabricación.</li>
          <li><strong>Variación por Producto:</strong> Algunos tienen garantía mayor.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">9.2 Qué Cubre Garantía</h3>
        <p className="text-muted-foreground mb-4">
          La garantía cubre:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Defectos de fabricación y materiales.</li>
          <li>Funcionamiento incorrecto bajo uso normal.</li>
          <li>Defectos en componentes internos.</li>
          <li>Costura, ajustes, construcción defectuosa.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">9.3 Qué NO Cubre Garantía</h3>
        <p className="text-muted-foreground mb-4">
          La garantía NO cubre:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Daño por accidente o negligencia.</li>
          <li>Uso indebido o abuso.</li>
          <li>Desgaste normal por uso.</li>
          <li>Modificaciones o reparaciones no autorizadas.</li>
          <li>Daño por exposición al agua (salvo específicamente).</li>
          <li>Batería gastada o envejecimiento.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">10. Productos en Liquidación/Oferta</h2>
        <p className="text-muted-foreground mb-4">
          Algunos productos se venden con restricciones de devolución:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li><strong>"Final Sale":</strong> No retornables bajo ninguna circunstancia.</li>
          <li><strong>Liquidación:</strong> 50% restituible de reembolso.</li>
          <li><strong>Clearance:</strong> Retorno solo si defectuoso.</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Estas restricciones aparecen claramente en la página del producto.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">11. Política de Comprador Protegido</h2>
        <p className="text-muted-foreground mb-4">
          Si paga con tarjeta de crédito o servicios como PayPal, tiene protección adicional:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Protección contra fraude del comerciante.</li>
          <li>Disputa de cargo si no recibe producto.</li>
          <li>Reembolso garantizado por transacciones no autorizadas.</li>
          <li>Contacte a su banco o proveedor de pago para detalles.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">12. Compras Internacionales</h2>
        <p className="text-muted-foreground mb-4">
          Para compras desde el extranjero:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Se aplica la misma política de 30 días.</li>
          <li>El cliente es responsable de aranceles de importación en devoluciones.</li>
          <li>Los costos de envío de retorno pueden ser mayores.</li>
          <li>Puede haber retrasos por aduanas.</li>
          <li>Consulte sobre restricciones de envío a su país.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">13. Contacto para Devoluciones</h2>
        <p className="text-muted-foreground mb-4">
          Para iniciar una devolución:
        </p>
        <div className="bg-card/50 border border-border rounded p-4 mt-4">
          <p className="text-muted-foreground">
            <strong>Método 1:</strong> En línea en su cuenta: Mi Cuenta → Mis Pedidos<br/>
            <strong>Método 2:</strong> Email: devueltas@DEKORANS<br/>
            <strong>Método 3:</strong> Chat en vivo: Disponible en horario de atención<br/>
            <strong>Método 4:</strong> Teléfono: +52 (55) 1234-5678<br/>
            <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM<br/>
            <strong>Tiempo de Respuesta:</strong> Dentro de 24 horas
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">14. Excepciones y Casos Especiales</h2>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">14.1 Productos Frágiles</h3>
        <p className="text-muted-foreground mb-4">
          Para vidrio, cerámica o artículos frágiles:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Reportar daño inmediatamente al recibir.</li>
          <li>No abrir el paquete completamente.</li>
          <li>Tomar fotos del daño en el embalaje.</li>
          <li>Contactar al servicio dentro de 24 horas.</li>
          <li>Puede ser elegible para reembolso o reemplazo sin devolver.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">14.2 Artículos de Alto Valor</h3>
        <p className="text-muted-foreground mb-4">
          Para productos de alto valor (>$5000):
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Requiere firma de aceptación al recibir.</li>
          <li>Puede solicitar inspección profesional.</li>
          <li>Devolución requiere validación adicional.</li>
          <li>Puede requerir seguro para envío de retorno.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">14.3 Bienes Usados o Reacondicionados</h3>
        <p className="text-muted-foreground mb-4">
          Productos marcados como "Usado" o "Reacondicionado":
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Se venden "tal cual" en la condición descrita.</li>
          <li>Plazo de devolución: 15 días (en lugar de 30).</li>
          <li>Deben devolverse en condición similar a la recibida.</li>
          <li>Sujetos a mayor deducción por desgaste.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">15. Cambios a Esta Política</h2>
        <p className="text-muted-foreground mb-4">
          DEKORANS se reserva el derecho de cambiar esta Política de Devoluciones:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Cambios entran en vigencia inmediatamente.</li>
          <li>Se notificará a clientes registrados.</li>
          <li>El uso continuado implica aceptación.</li>
          <li>Devoluciones en proceso se rigen por política vigente al comprar.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">16. Derechos de Consumidor</h2>
        <p className="text-muted-foreground mb-4">
          En México, conforme a la Ley Federal de Protección al Consumidor:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
          <li>Tiene derecho a cambio o devolución dentro de 30 días.</li>
          <li>Incluso si no está defectuoso (cambio de opinión).</li>
          <li>Tiene derecho a información clara y precisa.</li>
          <li>Tiene derecho a recurrir ante PROCON en caso de disputa.</li>
        </ul>
      </section>

      <div className="mt-8 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Documento versión 1.0 - Última actualización: Abril 2025<br/>
          © 2025 DEKORANS - Todos los derechos reservados
        </p>
      </div>
    </div>
  )
}
