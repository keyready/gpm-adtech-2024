import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserData, UserActions } from 'entities/User';
import { useSelector } from 'react-redux';
import { Sidebar } from 'widgets/Sidebar';
import { HStack } from 'shared/UI/Stack';
import { AppRouter } from './providers/AppRouter';
import { useTheme } from './providers/ThemeProvider';

export const App = () => {
    const { theme } = useTheme();

    const user = useSelector(getUserData);
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
                {user && <Sidebar />}
                <AppRouter />
            </Suspense>
        </div>
    );
};
