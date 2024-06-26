import MainLayout from "@/layouts/MainLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />
    }
])

const Routes = () => {
    return <RouterProvider router={router} />
}

export default Routes