import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({allowedRoles}) {

    const {isLoggedIn, role} = useSelector((state)=>state.auth);

    if (isLoggedIn) {
        if (allowedRoles.find((myRole) => myRole === role)) {
            return <Outlet />;
        } else {
            enqueueSnackbar('Access Denied', { variant: 'error' });
            return <Navigate to="/" />;
        }
    } else {
        return <Navigate to="/user/login" />;
    }
}

export default RequireAuth