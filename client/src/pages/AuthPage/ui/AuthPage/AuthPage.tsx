import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import React, { memo, useEffect } from 'react';
import { Text } from 'shared/UI/Text';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import classes from './AuthPage.module.scss';

interface AuthPageProps {
    className?: string;
}

const AuthPage = memo((props: AuthPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = '403 | Нет доступа';
    }, []);

    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate(RoutePath.main);
        }
    }, [navigate]);

    return (
        <Page className={classNames(classes.AuthPage, {}, [className])}>
            <a
                href="//oauth.yandex.ru/authorize?response_type=code&client_id=61097da35dd74417b54cf98806b71cbd"
                rel="noreferrer"
            >
                войти через яндекс
            </a>
        </Page>
    );
});

export default AuthPage;
