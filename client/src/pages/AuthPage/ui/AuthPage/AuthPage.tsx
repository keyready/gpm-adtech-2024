import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainLogoIcon from 'shared/assets/icons/main-logo.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Text } from 'shared/UI/Text';
import { YandexLoginButton } from 'widgets/YandexLoginButton';
import { HStack, VStack } from 'shared/UI/Stack';
import { MailRuLoginButton } from 'widgets/MailRuLoginButton';
import { GoogleLoginButton } from 'widgets/GoogleLoginButton';
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
            <Icon Svg={MainLogoIcon} className={classes.logo} />
            <VStack maxW gap="32" align="center">
                <Text title="Авторизация" className={classes.title} />

                <VStack maxW align="center">
                    <Text size="large" text="Войти с" className={classes.title} />
                    <HStack maxW gap="16" justify="center">
                        <YandexLoginButton type="short" />
                        <MailRuLoginButton type="short" />
                        <GoogleLoginButton type="short" />
                    </HStack>
                </VStack>
            </VStack>
        </Page>
    );
});

export default AuthPage;
