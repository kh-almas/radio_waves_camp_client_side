import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main.jsx";
import Home from "../Pages/Home/Home.jsx";
import NotFound from "../Pages/NotFound/NotFound.jsx";
import Registration from "../Pages/Registration/Registration.jsx";
import Login from "../Pages/Login/Login.jsx";
import Dashboard from "../Layouts/Dashboard.jsx";
import AddClass from "../Dashboard/Instructor/AddClass/AddClass.jsx";
import DashboardHome from "../Dashboard/DashboardHome.jsx";
import MyClass from "../Dashboard/Instructor/MyClass/MyClass.jsx";
import UpdateClass from "../Dashboard/Instructor/UpdateClass/UpdateClass.jsx";
import ManageUser from "../Dashboard/Admin/User/ManageUser.jsx";
import ManageClass from "../Dashboard/Admin/Class/ManageClass.jsx";
import AllClass from "../Pages/AllClass/AllClass.jsx";
import Cart from "../Dashboard/Student/Cart.jsx";
import AllInstructor from "../Pages/AllInstructor/AllInstructor.jsx";
import EnrolledClass from "../Dashboard/Student/EnrolledClass/EnrolledClass.jsx";

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
                path: '/all-class',
                element: <AllClass />
            },
            {
                path: '/instructor',
                element: <AllInstructor />
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
                path:'/dashboard/student/cart',
                element: <Cart />,
            },
            {
                path:'/dashboard/student/class',
                element: <EnrolledClass />,
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
            },
            {
                path:'/dashboard/my-class',
                element: <MyClass />,
            },
            {
                path:'/dashboard/update-class/:id',
                element: <UpdateClass />,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <NotFound />,
        children: [
            {
                path:'/dashboard/admin',
                element: <DashboardHome />,
            },
            {
                path:'/dashboard/admin/users',
                element: <ManageUser />,
            },
            {
                path:'/dashboard/admin/class',
                element: <ManageClass />,
            },
        ]
    }
]);

export default router;