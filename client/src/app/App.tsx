import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/Navbar';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UserActions } from 'entities/User';
import { AppRouter } from './providers/AppRouter';
import { useTheme } from './providers/ThemeProvider';

export const App = () => {
    const { theme } = useTheme();

    const dispatch = useAppDispatch();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            dispatch(UserActions.setUserData(parsedUser));
        }
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <AppRouter />
            </Suspense>
        </div>
    );
};
