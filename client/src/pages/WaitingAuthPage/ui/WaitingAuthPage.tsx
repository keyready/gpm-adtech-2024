import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { memo, useEffect } from 'react';
import { useURLParams } from 'shared/url/useSearchParams/useSearchParams';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { checkYandexCode } from 'pages/WaitingAuthPage/model/services/checkYandexCode';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { WaitingAuthReducer } from 'pages/WaitingAuthPage/model/slice/WaitingAuth';
import classes from './WaitingAuthPage.module.scss';

interface WaitingAuthPageProps {
    className?: string;
}

const WaitingAuthPage = memo((props: WaitingAuthPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Авторизация';
    }, []);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { getParam } = useURLParams();
    const { pathname, hash } = useLocation();

    useEffect(() => {
        async function checkCode() {
            const hashCode = hash?.match(/access_token=([^&]+)/);
            const code = getParam('code') || hashCode?.[1];
            const service = pathname.split('/oauth/')[1];
            if (!code || !service) {
                navigate(RoutePath.authorization);
                return;
            }
            const result = await dispatch(checkYandexCode({ code, service }));
            if (result.meta.requestStatus === 'fulfilled') navigate(RoutePath.main);
        }

        checkCode();
    }, [dispatch, hash, navigate, pathname]);

    return (
        <DynamicModuleLoader reducers={{ waitingAuthPage: WaitingAuthReducer }}>
            <Page className={classNames(classes.WaitingAuthPage, {}, [className])}>
                <h1>Пожалуйста, ожидайте авторизации</h1>
            </Page>
        </DynamicModuleLoader>
    );
});

export default WaitingAuthPage;
