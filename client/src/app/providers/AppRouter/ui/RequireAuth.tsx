import { useSelector } from 'react-redux';
// import { getUserAuthData } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getUserData } from 'entities/User';

interface RequireAuthProps {
    children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
    const auth = useSelector(getUserData);
    const location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePath.authorization} state={{ from: location }} replace />;
    }

    return children;
}
