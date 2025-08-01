import { Outlet } from "react-router-dom";

// Admin providers
import AdminUsersProvider from "./AdminUserController/AdminUsersProvider";
import AdminProductsProvider from "./AdminProductsController/AdminProductsProvider";
import AdminOrdersProvider from "./AdminOrderController/AdminOrdersProvider";
import AdminRevenueProvider from "./AdminRevenueController/AdminRevenueProvider";

//admin pages
import AdminMainPage from "../AdminPages/AdminMainPage/AdminMainPage";

export default function AdminLayout() {
  return (
    <AdminProviders>
      <AdminMainPage>
        <Outlet />
      </AdminMainPage>
    </AdminProviders>
  );
}

// src/admin/providers/AdminProviders.js

function AdminProviders({ children }) {
  return (
    <AdminProductsProvider>
      <AdminUsersProvider>
        <AdminOrdersProvider>
          <AdminRevenueProvider>{children}</AdminRevenueProvider>
        </AdminOrdersProvider>
      </AdminUsersProvider>
    </AdminProductsProvider>
  );
}

// <AppDataProvider>
//     <ProductsProvider>
//       <UsersProvider>
//         <OrdersProvider>
//           {children}
//         </OrdersProvider>
//       </UsersProvider>
//     </ProductsProvider>
//   </AppDataProvider>
