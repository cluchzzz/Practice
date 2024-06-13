import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import RootPage from "../pages/root-page/RootPage";
import ProfilePage from "../pages/profile-page/ProfilePage";
import AdminPage from "../pages/admin-page/AdminPage";
import AddWork from "../pages/add-work/AddWork";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <RootPage/>,
                index: true
            },
            {
                path: '/myworks',
                element: <AddWork/>
            },
            {
                path: '/profile',
                element: <ProfilePage/>
            },
            {
                path: '/admin',
                element: <AdminPage/>
            }
        ]
    },
])

export default router