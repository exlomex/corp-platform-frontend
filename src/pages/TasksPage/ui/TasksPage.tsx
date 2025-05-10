import { classNames } from '@/shared/lib/classNames';
import cls from './TasksPage.module.scss';
import {AsideMenu} from "@/widgets/AsideMenu";
import {MainLayout} from "@/shared/layouts/MainLayout";
import {ComboBox} from "@/shared/ui/ComboBox";
import {Select} from "@/shared/ui/Select";
import {useSelector} from "react-redux";
import {useState} from "react";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";

interface TasksPageProps {
    className?: string;
}

const Content = () => {
    const [selectValue, setSelectValue] = useState<ComboBoxOption>(null)

    return <div className={cls.Test}>

        <ComboBox
            options={[
                { label: 'React', value: 'react' },
                { label: 'Vue', value: 'vue' },
                { label: 'Angular', value: 'angular' },
            ]}
            onSelectAction={(item) => alert(`Сразу действие: ${item.label}`)}
        />

        <Select
            colorType={'PURPLE'}
            widthType={'FIT_CONTENT'}
            onSelectFunc={setSelectValue}
            value={selectValue}
            options={[
            { label: 'React', value: 'react' },
            { label: 'Vue', value: 'vue' },
            { label: 'Angular', value: 'angular' },
        ]}/>
    </div>
}

export function TasksPage(props: TasksPageProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.TasksPage, {}, [className])}>
            <MainLayout
                aside={<AsideMenu/>}
                content={<Content/>}
            />
        </div>
    )
}

export default TasksPage