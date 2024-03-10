import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Button } from 'primereact/button';
import { Text } from 'shared/UI/Text';
import { HStack } from 'shared/UI/Stack';
import { Icon } from 'shared/UI/Icon/Icon';
import YandexLoginIcon from 'shared/assets/icons/yandex-icon.svg';
import { useNavigate } from 'react-router-dom';
import classes from './YandexLoginButton.module.scss';

interface YandexLoginButtonProps {
    className?: string;
}

export const YandexLoginButton = memo((props: YandexLoginButtonProps) => {
    const { className } = props;

    const navigate = useNavigate();

    const handleYandexLoginClick = useCallback(() => {
        navigate(
            '//oauth.yandex.ru/authorize?response_type=code&client_id=61097da35dd74417b54cf98806b71cbd',
        );
    }, [navigate]);

    return (
        <Button
            severity="info"
            onClick={handleYandexLoginClick}
            className={classNames(classes.YandexLoginButton, {}, [className])}
        >
            <HStack maxW gap="16">
                <Icon Svg={YandexLoginIcon} className={classes.YandexLoginIcon} />
                <Text color="inverted" title="Войти с Яндекс ID" size="small" />
            </HStack>
        </Button>
    );
});
