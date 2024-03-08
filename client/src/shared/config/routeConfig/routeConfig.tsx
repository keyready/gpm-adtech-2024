import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { NotFound } from 'pages/NotFound';
import { AuthPage } from 'pages/AuthPage';
import { WaitingAuthPage } from 'pages/WaitingAuthPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    AUTHORIZATION = 'authorization',
    WAITINGAUTH = 'waitingauth',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.WAITINGAUTH]: '/oauth',
    [AppRoutes.AUTHORIZATION]: '/forbidden',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        authOnly: true,
    },
    [AppRoutes.AUTHORIZATION]: {
        path: RoutePath.authorization,
        element: <AuthPage />,
    },
    [AppRoutes.WAITINGAUTH]: {
        path: RoutePath.waitingauth,
        element: <WaitingAuthPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
