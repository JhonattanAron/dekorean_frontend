// app/dashboard/page.tsx

import AdminLayout from "@/components/admin/admin-layout";

export default async function Dashboard() {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-2">Accede a tus páginas HTML</p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <a
            href="/la-fresa-de-alex/index.html"
            className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition duration-300 border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-black">
              🍓 La Fresca de Alex
            </h2>

            <p className="text-gray-500 mt-2">Landing principal del negocio</p>

            <div className="mt-6 text-sm font-medium text-gray-400 group-hover:text-gray-700">
              Ver página →
            </div>
          </a>

          {/* Card 2 */}
          <a
            href="/la-barra-de-majareta/index.html"
            className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition duration-300 border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-black">
              🍓 La Barra de Majareta
            </h2>

            <p className="text-gray-500 mt-2">Landing principal del negocio</p>

            <div className="mt-6 text-sm font-medium text-gray-400 group-hover:text-gray-700">
              Ver página →
            </div>
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}
