import AdminLayout from "@/components/admin/admin-layout";
import CrudTable from "@/components/admin/table-admin";

export default function Admin() {
  return (
    <div>
      <AdminLayout>
        <CrudTable />
      </AdminLayout>
    </div>
  );
}
