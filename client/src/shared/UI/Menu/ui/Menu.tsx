import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Fragment, memo, ReactNode } from 'react';
import { Menu as HMenu } from '@headlessui/react';
import { AppLink } from '../../AppLink';
import { VStack } from '../../Stack';
import classes from './Menu.module.scss';

interface MenuItems {
    content: ReactNode;
    href?: string;
    disabled?: boolean;
}
interface MenuProps {
    className?: string;
    title: ReactNode;
    items: MenuItems[];
}

export const Menu = memo((props: MenuProps) => {
    const { className, items, title } = props;
    const { t } = useTranslation();

    return (
        <HMenu as={VStack} className={classNames(classes.Menu, {}, [className])}>
            <HMenu.Button as={Fragment}>{title}</HMenu.Button>
            <HMenu.Items className={classes.items}>
                {items.map((item) => (
                    <HMenu.Item disabled={item.disabled}>
                        {({ active }) =>
                            item.href ? (
                                <AppLink
                                    className={classNames(classes.item, {
                                        [classes.active]: active,
                                    })}
                                    to={item.href}
                                >
                                    Account settings
                                </AppLink>
                            ) : (
                                <span
                                    className={classNames(classes.item, {
                                        [classes.active]: active,
                                    })}
                                >
                                    {item.content}
                                </span>
                            )
                        }
                    </HMenu.Item>
                ))}
            </HMenu.Items>
        </HMenu>
    );
});
