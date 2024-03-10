import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/UI/Text';
import { VStack } from 'shared/UI/Stack';
import { AppLink } from 'shared/UI/AppLink';
import { Divider } from 'primereact/divider';
import { HistoryItemType } from '../../model/types/HistoryItemType';
import classes from './HistoryItem.module.scss';

interface HistoryItemProps {
    className?: string;
    item: HistoryItemType;
}

export const HistoryItem = memo((props: HistoryItemProps) => {
    const { className, item } = props;

    return (
        <VStack gap="0" maxW className={classNames(classes.HistoryItemsList, {}, [className])}>
            <Divider className={classes.divider} />
            <Text title={item.title} size="small" />
            <AppLink target="_blank" to={item.url}>
                {item.url.slice(0, 27)}...
            </AppLink>
        </VStack>
    );
});
