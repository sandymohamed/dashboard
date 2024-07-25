
import { AdminLayout, LoginLayout } from "@/layouts";
import { Login, PhoneNumber } from "@/pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: '/set-phoneNumber',
                element: <PhoneNumber />
            }
        ]
    }, 
    {
        path: "home",
        element: <AdminLayout />
    }
])

const Routes = () => {
    return <RouterProvider router={router} />
}

export default Routes