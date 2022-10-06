
import { Outlet} from "react-router-dom";
import { getIsAuth } from "../../store/userAuth/selectors";
import {useSelector} from "react-redux";
import { LogInPage } from "../../pages/LogInPage";

export const ProtectedRoute = () => {
    const isAuthed = useSelector(getIsAuth)
    return (
        isAuthed ? <Outlet/> : <LogInPage/>
    )
}