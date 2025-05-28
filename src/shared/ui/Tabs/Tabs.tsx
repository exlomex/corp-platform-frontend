import { classNames } from '@/shared/lib/classNames';
import cls from './Tabs.module.scss';
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import {Dispatch, ReactElement, SetStateAction, useState} from "react";


export interface TabListItem {
    content: string;
    onClick?: () => void
}

export interface TabPanelsItem {
    content: ReactElement;
}

interface TabsProps {
    className?: string;
    TabListItems: TabListItem[];
    TabPanelsItems: TabPanelsItem[];
    selectedIndex?: number;
    setSelectedIndex: Dispatch<SetStateAction<number>>
    tabsVariant?: 'default' | 'smart'
}

export const Tabs = (props: TabsProps) => {
    const { className, TabListItems, TabPanelsItems, selectedIndex, setSelectedIndex, tabsVariant = 'default' } = props;

    return (
        <div className={classNames(cls.Tabs, {[cls.SmartTabs]: tabsVariant === 'smart'}, [className])}>
            <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <TabList className={cls.TabsListWrapper}>
                    {TabListItems.map((tab, index) => (
                        <Tab
                            className={cls.Tab}
                            onClick={tab.onClick}
                            key={index}
                        >
                            {tab.content}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {TabPanelsItems.map((TabPanelItem, index) => (
                        <TabPanel key={index}>
                            {TabPanelItem.content}
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </div>
    )
};
