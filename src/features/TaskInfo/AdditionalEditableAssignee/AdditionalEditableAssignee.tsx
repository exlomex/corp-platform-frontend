import { classNames } from '@/shared/lib/classNames';
import cls from './AdditionalEditableAssignee.module.scss';
import {useEffect, useState} from "react";
import {ComboBox, ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {useSelector} from "react-redux";
import {
    FetchUsersByCompanyIdService,
    FetchUsersByProjectIdService,
    getProjectUsers,
    getUserCompanyId
} from "@/entities/User";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {getUserCompanyUsers} from "@/entities/User/model/selectors/getUserValues.ts";
import {AdditionalTaskAuthor} from "@/features/TaskInfo/AdditionalTaskAuthor/AdditionalTaskAuthor.tsx";
import {
    addTaskAssigneeInputData,
    AddTaskAssigneeService,
    FetchProjectTreeTasksService,
    getSelectedTaskInfo
} from "@/entities/Task";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";
import {FetchBoardTasks} from "@/entities/Task/model/services/fetchBoardTasks.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {Skeleton} from "@/shared/ui/Skeleton";
import {getRouteMain} from "@/shared/const/router.ts";
import {useLocation} from "react-router";
import {prepareFiltersFromState} from "@/features/TasksFilters";
import {getTaskFiltersState} from "@/features/TasksFilters/model/selectors/getTaskFilters.ts";

interface AdditionalEditableAssigneeProps {
    className?: string;
    editIsPossible: boolean
}

export const AdditionalEditableAssignee = (props: AdditionalEditableAssigneeProps) => {
    const {className, editIsPossible} = props;

    const dispatch = useAppDispatch()
    const selectedCompanyId = useSelector(getUserCompanyId)
    const selectedTaskInfo = useSelector(getSelectedTaskInfo)
    const selectedProject = useSelector(getProjectSelectedProject)

    const [normalizedUser, setNormalizedUser] = useState<ComboBoxOption[]>(null)
    const [pickedUser, setPickedUser] = useState<ComboBoxOption>(null)

    useEffect(() => {
        const currentAssignee = selectedTaskInfo?.assignee
        if (currentAssignee) {
            setPickedUser(
                {
                    id: currentAssignee.id,
                    label: `${currentAssignee.firstName} ${currentAssignee.lastName}`,
                    value: `${currentAssignee.firstName} ${currentAssignee.lastName}`,
                    data: {
                        image: currentAssignee.imageUrl
                    }
                }
            )
        }
    }, [selectedTaskInfo]);

    useEffect(() => {
        if (selectedProject) dispatch(FetchUsersByProjectIdService({ProjectId: selectedProject?.id}));
    }, [dispatch, selectedProject]);

    const projectUsers = useSelector(getProjectUsers)

    useEffect(() => {
        if (projectUsers?.length) {
            setNormalizedUser(
                [{label: 'Не выбрано', value: ''},
                    ...projectUsers.map(user => {
                        return {
                            id: user.id,
                            label: `${user.firstName} ${user.lastName}`,
                            value: `${user.firstName} ${user.lastName}`,
                            data: {
                                image: user.imageUrl
                            }
                        }
                    })
                ]
            )
        } else {
            setNormalizedUser(
                [{label: 'Не выбрано', value: ''}]
            )
        }
    }, [projectUsers]);

    const [fieldIsActive, setFieldIsActive] = useState<boolean>(false)

    const onFieldClickHandler = () => {
        setFieldIsActive(true)
    }

    const location = useLocation()

    const filtersState = useSelector(getTaskFiltersState);

    const onSelectNewAssigneeHandler = async (options: ComboBoxOption) => {
        if (selectedTaskInfo && selectedTaskInfo.id && selectedTaskInfo.uniqueTitle && options) {
            const addAssigneeBody: addTaskAssigneeInputData = {
                assigneeId: options.id || undefined,
                taskId: selectedTaskInfo.id,
                projectId: selectedProject.id
            }

            const filters = prepareFiltersFromState({
                ...filtersState,
            });

            try {
                if (selectedTaskInfo?.assignee?.id === options.id) {
                    setFieldIsActive(false)
                    return
                }

                await dispatch(AddTaskAssigneeService(addAssigneeBody)).unwrap()
                await dispatch(fetchTaskInfoService({uniqueTitle: selectedTaskInfo.uniqueTitle, projectId: selectedProject.id})).unwrap()

                if (location.pathname === getRouteMain()) {
                    await dispatch(FetchProjectTreeTasksService({projectId: selectedProject?.id,filters:filters}))
                } else {
                    await dispatch(FetchBoardTasks({boardId: selectedTaskInfo?.boardId, projectId: selectedProject.id})).unwrap()
                }

                setFieldIsActive(false)
                setPickedUser(options)

            } catch (e) {
                console.error(e)
            }
        }
    }

    return (
        <div className={classNames(cls.AdditionalEditableAssignee, {}, [className])}>
            {
                !fieldIsActive ? (
                    selectedTaskInfo ? (
                        selectedTaskInfo.assignee?.id ? (
                            <AdditionalTaskAuthor
                                editIsPossible={editIsPossible}
                                onClick={onFieldClickHandler}
                                firstName={selectedTaskInfo.assignee.firstName}
                                lastName={selectedTaskInfo.assignee.lastName}
                                imageUrl={selectedTaskInfo.assignee.imageUrl}
                            />
                        ) : (
                            <AdditionalTaskAuthor
                                editIsPossible={editIsPossible}
                                firstName="Не"
                                lastName="назначено"
                                onClick={onFieldClickHandler}
                            />
                        )
                    ) : (
                        <Skeleton height={30} width={140} border={6} />
                    )
                ) : (
                    <div>
                        {normalizedUser && (
                            <ComboBox
                                onSelectAction={onSelectNewAssigneeHandler}
                                withImage
                                value={pickedUser}
                                options={normalizedUser}
                            />
                        )}
                    </div>
                )
            }
        </div>

    )
};
