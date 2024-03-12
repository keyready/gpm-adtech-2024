import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classes from './UserCard.module.scss';

interface UserCardProps {
    className?: string;
}

export const UserCard = memo((props: UserCardProps) => {
    const { t } = useTranslation();

    const { className } = props;

    return <div className={classNames(classes.UserCard, {}, [className])}>{t('UserCard')}</div>;
});
