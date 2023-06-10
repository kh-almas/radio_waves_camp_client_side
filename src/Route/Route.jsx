import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main.jsx";
import Home from "../Pages/Home/Home.jsx";
import NotFound from "../Pages/NotFound/NotFound.jsx";
import Registration from "../Pages/Registration/Registration.jsx";
import Login from "../Pages/Login/Login.jsx";
import Dashboard from "../Layouts/Dashboard.jsx";
import AddClass from "../Dashboard/Instructor/AddClass/AddClass.jsx";
import DashboardHome from "../Dashboard/DashboardHome.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/registration',
                element: <Registration />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <NotFound />,
        children: [
            {
                path:'/dashboard',
                element: <DashboardHome />,
            },
            {
                path:'/dashboard/add-class',
                element: <AddClass />,
            }
        ]
    }
]);

export default router;