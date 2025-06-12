import { classNames } from '@/shared/lib/classNames';
import cls from './SettingsContent.module.scss';
import {TabPanelsItem, TabListItem, Tabs} from "@/shared/ui/Tabs";
import {Typography} from "@/shared/ui/Typography";
import {useNavigate, useParams} from "react-router";
import {useEffect, useMemo, useState} from "react";
import {getRouteSettings} from "@/shared/const/router.ts";
import {InviteToCompanyForm} from "@/features/InviteToCompany";
import {SettingsCompanyTab} from "@/pages/SettingsPage/ui/SettingsCompanyTab/SettingsCompanyTab.tsx";
import {SettingsProfileTab} from "@/pages/SettingsPage/ui/SettingsProfileTab/SettingsProfileTab.tsx";
import {SettingsProjectsTab} from "@/pages/SettingsPage/ui/SettingsProjectsTab/SettingsProjectsTab.tsx";
import {Helmet} from "react-helmet";

interface SettingsContentProps {
    className?: string;
}

type TabItems = 'Компания' | 'Проекты' | 'Доски' | 'Тема' | 'Настройки пользователя'

export const SettingsContent = (props: SettingsContentProps) => {
    const { className } = props;

    const navigate = useNavigate()
    const params = useParams()

    const TabListMapper = useMemo<Record<string, TabItems>>(() => ({
        'company': 'Компания',
        'projects': 'Проекты',
        'boards': 'Доски',
        'theme': 'Тема',
        'userSettings': 'Настройки пользователя'
    }), []);

    const TabListItems = useMemo<TabListItem[]>(() => [
        {
            content: 'Компания',
            onClick: () => navigate(getRouteSettings('company'))
        },
        {
            content: 'Проекты',
            onClick: () => navigate(getRouteSettings('projects'))
        },
        {
            content: 'Настройки пользователя',
            onClick: () => navigate(getRouteSettings('userSettings'))
        },
        // {
        //     content: 'Доски',
        //     onClick: () => navigate(getRouteSettings('boards'))
        // },
        // {
        //     content: 'Тема',
        //     onClick: () => navigate(getRouteSettings('theme'))
        // },
    ], [navigate]);

    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    useEffect(() => {
        const findTabIndexByName = (): number => {
            const tab = params.tab

            const tabName = TabListMapper[tab]

            if (!tabName) return 0

            let index = 0
            for (const listItem of TabListItems) {
                if (listItem.content === tabName) {
                    return index
                }
                index++
            }
            return 0
        }
        setSelectedIndex(findTabIndexByName())
    }, [TabListItems, TabListMapper, params.tab]);

    const TabPanelsItems: TabPanelsItem[] = [
        {
            content: (<SettingsCompanyTab/>)
        },
        {
            content: (<SettingsProjectsTab/>)
        },
        {
            content: (<SettingsProfileTab/>)
        }
    ]

    return (
        <div className={classNames(cls.SettingsContent, {}, [className])}>
            <Helmet>
                <title>{`Настройки`}</title>
            </Helmet>

            <Typography size={'TEXT-26-MEDIUM'} className={cls.Heading}>Настройки</Typography>
            <Tabs
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
                TabListItems={TabListItems}
                TabPanelsItems={TabPanelsItems}
                className={cls.SettingsTabs}
            />
        </div>
    )
};
