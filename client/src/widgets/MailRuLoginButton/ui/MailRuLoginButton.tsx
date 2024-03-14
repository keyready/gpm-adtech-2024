import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/UI/Text';
import { memo, useCallback } from 'react';
import { HStack } from 'shared/UI/Stack';
import { Icon } from 'shared/UI/Icon/Icon';
import MailRuLoginIcon from 'shared/assets/icons/mail-ru-icon.svg';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import classes from './MailRuLoginButton.module.scss';

interface MailRuLoginButtonProps {
    className?: string;
    type?: 'classic' | 'short';
}

export const MailRuLoginButton = memo((props: MailRuLoginButtonProps) => {
    const { className, type = 'classic' } = props;

    const navigate = useNavigate();

    const handleMailRuLoginClick = useCallback(() => {
        navigate(
            '//oauth.mail.ru/login?client_id=71a926e5495a4f78819250614611f3f9&response_type=code&scope=userinfo&redirect_uri=http://localhost:3000/oauth/mailru&state=some_state',
        );
    }, [navigate]);

    return (
        <Button
            severity="info"
            onClick={handleMailRuLoginClick}
            className={classNames('', {}, [className])}
        >
            <HStack maxW gap="16">
                <Icon Svg={MailRuLoginIcon} className={classes.MailRuLoginIcon} />
                {type === 'classic' && <Text color="inverted" title="MailRu" size="small" />}
            </HStack>
        </Button>
    );
});
