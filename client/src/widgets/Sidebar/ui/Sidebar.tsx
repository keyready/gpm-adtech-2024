import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Text } from 'shared/UI/Text';
import { Divider } from 'primereact/divider';
import { HistoryItemsList } from 'entities/HistoryItem';
import { Button } from 'primereact/button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UserActions } from 'entities/User';
import classes from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const handleLogoutClick = useCallback(() => {
        dispatch(UserActions.logout());
    }, [dispatch]);

    return (
        <aside className={classNames(classes.Sidebar, {}, [className])}>
            <Text title="История" />
            <HistoryItemsList className={classes.list} />
            <Button onClick={handleLogoutClick} className={classes.logoutButton} severity="danger">
                <Text title="Выйти" size="small" align="right" />
            </Button>
        </aside>
    );
});
