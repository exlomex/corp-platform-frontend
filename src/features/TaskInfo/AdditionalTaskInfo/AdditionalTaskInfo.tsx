import { classNames } from '@/shared/lib/classNames';
import cls from './AdditionalTaskInfo.module.scss';
import {EditableTaskStatus} from "../EditableTaskStatus/EditableTaskStatus.tsx";
import {Typography} from "@/shared/ui/Typography";
import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import {AdditionalTaskAuthor} from "../AdditionalTaskAuthor/AdditionalTaskAuthor.tsx";
import {
    AdditionalEditableAssignee
} from "../AdditionalEditableAssignee/AdditionalEditableAssignee.tsx";
import {useSelector} from "react-redux";
import {getSelectedTaskInfo} from "@/entities/Task";
import {
    AdditionalEditableTaskParent
} from "../AdditionalEditableTaskParent/AdditionalEditableTaskParent.tsx";
import {formatCustomDate} from "@/shared/lib/formatCustomDate";
import {getSelectedTaskSnapshots} from "@/entities/Task/model/selectors/getTaskValues.ts";
import {useTaskSearchParams} from "@/shared/hooks/useTaskSearchParams";
import {TaskSnapshots} from "@/entities/Task/model/types/taskSliceSchema.ts";
import {useIsMobile} from "@/shared/hooks/useIsMobile";
import {Button} from "@/shared/ui/Button";
import CloseIcon from "@/shared/assets/icons/closeArrow.svg";
import {Skeleton} from "@/shared/ui/Skeleton";

interface AdditionalTaskInfoProps {
    className?: string;
    editIsPossible: boolean;
    onClose?: () => void;
}

export const AdditionalTaskInfo = (props: AdditionalTaskInfoProps) => {
    const { className, editIsPossible, onClose } = props;

    const selectedTaskInfo = useSelector(getSelectedTaskInfo)

    const taskSnapshots = useSelector(getSelectedTaskSnapshots)
    const [selectedSnapshot, setSelectedSnapshot] = useState<TaskSnapshots>(null)

    const {selectedTaskType, selectedSnapshotVersion} = useTaskSearchParams()

    useEffect(() => {
        if (taskSnapshots) {
            const currentSnapshot = taskSnapshots.find(
                snapshot => String(snapshot.version) === selectedSnapshotVersion
            );

            if (currentSnapshot) {
                setSelectedSnapshot(currentSnapshot);
            }
        }
    }, [selectedSnapshotVersion, taskSnapshots]);

    const additionalTaskOptions: {
        label: string,
        content: ReactElement
    }[] = [
        {
            label: 'Исполнитель',
            content: <AdditionalEditableAssignee editIsPossible={editIsPossible}/>
        },
        {
            label: 'Автор',
            content: (
                <>
                    {selectedTaskInfo ? <AdditionalTaskAuthor
                        firstName={selectedTaskInfo?.author?.firstName}
                        lastName={selectedTaskInfo?.author?.lastName}
                        imageUrl={selectedTaskInfo?.author?.imageUrl}
                    /> : <Skeleton height={30} width={140} border={6} />}
                </>
            )
        },
        {
            label: 'Родитель',
            content: <AdditionalEditableTaskParent editIsPossible={editIsPossible}/>
        },
    ]

    const additionalDatesOptions: {
        label: string,
        content: ReactNode
    }[] = [
        {
            label: 'Создано',
            content: selectedTaskInfo ? selectedTaskInfo?.createdAt ?
                formatCustomDate(selectedTaskInfo?.createdAt) : '' : <Skeleton height={20} width={150} border={6} />
        },
        {
            label: 'Обновлено',
            content: selectedTaskInfo ? selectedTaskInfo?.updatedAt ?
                formatCustomDate(selectedTaskInfo?.updatedAt) : '' : <Skeleton height={20} width={150} border={6} />
        },
    ]

    const {isMobile} = useIsMobile()

    return (
        <div className={classNames(cls.AdditionalTaskInfo, {}, [className])}>
            <div className={cls.AdditionalTaskTopContainer}>
                {!isMobile && <div className={cls.AdditionalTaskTopLine}>
                    <EditableTaskStatus editIsPossible={editIsPossible}/>
                    <Button onClick={onClose} className={cls.CloseModalIcon} buttonType={'SMART_ICON_BTN_FILLED'}><CloseIcon/></Button>
                </div>}

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

                    <Typography size={'PARAGRAPH-16-REGULAR'} className={cls.DateHeading}>Даты</Typography>

                    <div className={cls.DateContainer}>
                        {additionalDatesOptions.map((date, index) => (
                            <div className={cls.DateWrapper} key={index}>
                                <div className={cls.DateLabel}>{date.label}</div>
                                <div className={cls.DateContent}>{date.content}</div>
                            </div>
                        ))}
                    </div>

                    {selectedTaskType === 'snapshot' && <p className={cls.SnapshotVersion}>Снапшот v.{selectedSnapshot?.version}</p>}
                </div>
            </div>

        </div>
    )
};
