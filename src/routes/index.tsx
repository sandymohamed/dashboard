import AdminLayout from "@/layouts/AdminLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLayout />
    }
])

const Routes = () => {
    return <RouterProvider router={router} />
}

export default Routes