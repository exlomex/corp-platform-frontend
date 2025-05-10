import { classNames } from '@/shared/lib/classNames';
import cls from './AdditionalTaskInfo.module.scss';
import {EditableTaskStatus} from "../EditableTaskStatus/EditableTaskStatus.tsx";
import {Typography} from "@/shared/ui/Typography";
import {ReactElement} from "react";
import {AdditionalTaskAuthor} from "../AdditionalTaskAuthor/AdditionalTaskAuthor.tsx";
import {
    AdditionalEditableAssignee
} from "../AdditionalEditableAssignee/AdditionalEditableAssignee.tsx";
import {useSelector} from "react-redux";
import {getSelectedTaskInfo} from "@/entities/Task";
import {
    AdditionalEditableTaskParent
} from "../AdditionalEditableTaskParent/AdditionalEditableTaskParent.tsx";

interface AdditionalTaskInfoProps {
    className?: string;
}

export const AdditionalTaskInfo = (props: AdditionalTaskInfoProps) => {
    const { className } = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo)

    const additionalTaskOptions: {
        label: string,
        content: ReactElement
    }[] = [
        {
            label: 'Исполнитель',
            content: <AdditionalEditableAssignee/>
        },
        {
            label: 'Родитель',
            content: <AdditionalEditableTaskParent/>
        },
        {
            label: 'Автор',
            content: (
                <>
                    {selectedTaskInfo && <AdditionalTaskAuthor
                        firstName={selectedTaskInfo?.author?.firstName}
                        lastName={selectedTaskInfo?.author?.lastName}
                        imageUrl={selectedTaskInfo?.author?.imageUrl}
                    />}
                </>
            )
        },
    ]

    return (
        <div className={classNames(cls.AdditionalTaskInfo, {}, [className])}>
            <EditableTaskStatus/>

            <div className={cls.AdditionalTaskInfoWrapper}>
                <Typography className={cls.AdditionalHeading} size={'PARAGRAPH-16-REGULAR'}>Сведения</Typography>

                <div className={cls.additionalOptionsContainer}>
                    {additionalTaskOptions.map((additionalOption, index) => (
                        <div key={index} className={cls.additionalOption}>
                            <p className={cls.additionalOptionName}>{additionalOption.label}</p>

                            <div className={cls.additionalOptionContent}>{additionalOption.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};
