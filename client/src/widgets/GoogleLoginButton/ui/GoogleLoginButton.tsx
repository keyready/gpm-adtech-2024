import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/UI/Text';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HStack } from 'shared/UI/Stack';
import { Icon } from 'shared/UI/Icon/Icon';
import GoogleLoginIcon from 'shared/assets/icons/google-icon.svg';
import { Button } from 'primereact/button';
import classes from './GoogleLoginButton.module.scss';

interface GoogleLoginButtonProps {
    className?: string;
    type?: 'classic' | 'short';
}

export const GoogleLoginButton = memo((props: GoogleLoginButtonProps) => {
    const { className, type = 'classic' } = props;

    const navigate = useNavigate();

    const handleGoogleLoginClick = useCallback(() => {
        navigate(
            '//accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/oauth/google&client_id=957978342734-5m2n3p3b5jodbpdnkkco8ptv0vncjmf6.apps.googleusercontent.com',
        );
    }, [navigate]);

    return (
        <Button
            severity="info"
            onClick={handleGoogleLoginClick}
            className={classNames(classes.YandexLoginButton, {}, [className])}
        >
            <HStack maxW gap="16">
                <Icon Svg={GoogleLoginIcon} className={classes.GoogleLoginButton} />
                {type === 'classic' && <Text color="inverted" title="Google" size="small" />}
            </HStack>
        </Button>
    );
});
