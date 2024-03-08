import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { HStack } from '../../Stack';
import classes from './Tabs.module.scss';

export interface TabsItem {
    header: string;
    element: ReactNode;
}

interface TabsProps {
    className?: string;
    items: TabsItem[];
    activeIndex: number;
}

export const Tabs = memo((props: TabsProps) => {
    const { className, items, activeIndex } = props;

    return (
        <HStack maxW justify="center">
            <TabView
                activeIndex={activeIndex}
                onTabChange={() => {}}
                className={classNames(classes.Tabs, {}, [className])}
            >
                {items.map((item, index) => (
                    <TabPanel header={item.header} key={index}>
                        {item.element}
                    </TabPanel>
                ))}
            </TabView>
        </HStack>
    );
});
