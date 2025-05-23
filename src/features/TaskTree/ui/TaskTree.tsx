import { classNames } from '@/shared/lib/classNames';
import cls from './TaskTree.module.scss';
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {
    FetchProjectTreeTasksService,
    getProjectsTreeTasksIsFetching,
    getProjectsTreeTasksIsFirstLoading,
    getProjectTreeTasks
} from "@/entities/Task";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {useSelector} from "react-redux";
import {NormalizedTreeItem, NormalizeTree} from "@/features/TaskTree/lib/normalizeTree.tsx";
import {Column, Table} from "@/shared/ui/Table/Table.tsx";
import NoDataIllustration from "@/shared/assets/illustations/noDataIllustration.svg";
import {Typography} from "@/shared/ui/Typography";

interface TaskTreeProps {
    className?: string;
}

export const TaskTree = (props: TaskTreeProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const selectedProject = useSelector(getProjectSelectedProject)

    useEffect(() => {
        if (selectedProject?.id) {
            dispatch(FetchProjectTreeTasksService({projectId: selectedProject?.id }))
        }
    }, [dispatch, selectedProject?.id]);

    const treeTasksOriginal = useSelector(getProjectTreeTasks)

    const [normalizedTreeTasks, setNormalizedTreeTasks] = useState<NormalizedTreeItem[]>(null)

    useEffect(() => {
        if (treeTasksOriginal.length >= 1) {
            setNormalizedTreeTasks(NormalizeTree(treeTasksOriginal))
        }
    }, [treeTasksOriginal]);

    const treeColumns: Column<NormalizedTreeItem>[] = [
        {
            title: 'Доска',
            key: 'boardTitle',
            width: '16%'
        },
        {
            title: 'Код',
            key: 'uniqueTitle',
            width: '10%'
        },
        {
            title: 'Название',
            key: 'title',
            width: '30%'
        },
        {
            title: 'Исполнитель',
            key: 'assigneeFullName',
            width: '18%'
        },
        {
            title: 'Приоритет',
            key: 'priority',
            width: '16%'
        },
        {
            title: 'Резолюция',
            key: 'statusResolution',
            width: '10%',
        },
    ]

    const tasksIsFetching = useSelector(getProjectsTreeTasksIsFetching)
    const tasksIsFirstLoading = useSelector(getProjectsTreeTasksIsFirstLoading)

    return (
        <div className={classNames(cls.TaskTree, {}, [className])}>

            {
                tasksIsFetching || tasksIsFirstLoading
                    ? <></>
                    : (
                        treeTasksOriginal?.length >= 1
                            ? (normalizedTreeTasks?.length >= 1 && treeTasksOriginal.length >= 1 && <Table<NormalizedTreeItem> columns={treeColumns} data={normalizedTreeTasks}/>)
                            : (<div className={cls.NoDataContainer}>
                                    <div className={cls.NoData}>
                                        <NoDataIllustration/>
                                        <Typography size={'PARAGRAPH-18-REGULAR'}>Задачи не найдены</Typography>
                                    </div>
                            </div>)
                    )
            }
        </div>
    )
};
