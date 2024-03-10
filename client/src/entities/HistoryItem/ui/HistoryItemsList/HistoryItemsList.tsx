import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/UI/Stack';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { useUserHistory } from 'entities/HistoryItem/api/fetchHistory';
import { Skeleton } from 'primereact/skeleton';
import { Text } from 'shared/UI/Text';
import classes from './HistoryItemsList.module.scss';
import { HistoryItem } from '../HistoryItem/HistoryItem';

interface HistoryItemsListProps {
    className?: string;
}

export const HistoryItemsList = memo((props: HistoryItemsListProps) => {
    const { className } = props;

    const user = useSelector(getUserData);

    const {
        data: history,
        isLoading: isHistoryLoading,
        error: historyError,
    } = useUserHistory(user?.id || 0);

    if (isHistoryLoading) {
        return (
            <VStack maxW gap="8" className={classNames(classes.HistoryItem, {}, [className])}>
                {new Array(10).fill(0).map((_, index) => (
                    <Skeleton width="100%" height="30px" borderRadius="8px" key={index} />
                ))}
            </VStack>
        );
    }

    if (!history && !isHistoryLoading) {
        return (
            <VStack maxW gap="8" className={classNames(classes.HistoryItem, {}, [className])}>
                <Text size="small" text="Пока ничего нет" />
            </VStack>
        );
    }

    if (historyError) {
        return (
            <VStack maxW gap="8" className={classNames(classes.HistoryItem, {}, [className])}>
                <Text
                    size="small"
                    variant="error"
                    text="Во время загрузки данных произошла ошибка"
                />
            </VStack>
        );
    }

    return (
        <VStack maxW gap="0" className={classNames(classes.HistoryItem, {}, [className])}>
            {history?.length &&
                history.map((historyItem) => (
                    <HistoryItem item={historyItem} key={historyItem.id} />
                ))}
        </VStack>
    );
});
