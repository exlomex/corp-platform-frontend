import { classNames } from '@/shared/lib/classNames';
import cls from './TaskInfoTabs.module.scss';
import {useMemo, useState} from "react";
import {TabListItem, TabPanelsItem, Tabs} from "@/shared/ui/Tabs";
import {CommentsContent} from "../Comments/ui/CommentsContent/CommentsContent.tsx";
import {SnapshotsTab} from "../Snapshots/ui/SnapshotsTab/SnapshotsTab.tsx";

interface TaskInfoTabsProps {
    className?: string;
    editIsPossible: boolean;
}

export const TaskInfoTabs = (props: TaskInfoTabsProps) => {
    const { className, editIsPossible } = props;

    const TabListItems = useMemo<TabListItem[]>(() => [
        {
            content: 'Комментарии',
        },
        {
            content: 'История версий',
        }
    ], []);

    const TabPanelsItems: TabPanelsItem[] = [
        {
            content: (<CommentsContent editIsPossible={editIsPossible}/>)
        },
        {
            content: (<SnapshotsTab/>)
        },
    ]

    const [selectedTaskTab, setSelectedTaskTab]= useState<number>(0)

    return (
        <Tabs
            tabsVariant={'smart'}
            className={classNames(cls.TaskInfoTabs, {}, [className])}
            TabListItems={TabListItems}
            TabPanelsItems={TabPanelsItems}
            setSelectedIndex={setSelectedTaskTab}
            selectedIndex={selectedTaskTab}
        />
    )
};
