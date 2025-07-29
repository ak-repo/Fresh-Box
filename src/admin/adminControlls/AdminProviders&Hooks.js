import { useContext, createContext } from "react";

//context creation
export const AdminUsersContext = createContext();
export const AdminProductsContext = createContext();
export const AdminOrdersContext = createContext();
export const AdminRevenueContext = createContext();

//context convert into custom hook
export const useUsersData = () => useContext(AdminUsersContext);
export const useProductsData = () => useContext(AdminProductsContext);
export const useOrdersData = () => useContext(AdminOrdersContext);
export const useRevenueData = () => useContext(AdminRevenueContext);
