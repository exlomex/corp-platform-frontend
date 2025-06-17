import { classNames } from '@/shared/lib/classNames';
import cls from './TasksFilters.module.scss';
import {ChangeEvent, useEffect, useState} from "react";
import {Option} from "@/shared/ui/MultiSelect";
import {CheckBoxFilter} from "@/features/TasksFilters/ui/CheckBoxFilter/CheckBoxFilter.tsx";
import {useSelector} from "react-redux";
import {getUserBoardsBySelectedProject} from "@/entities/Board";
import {Resolution, ResolutionKeys} from "@/entities/Task/const/Resolution.tsx";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {FetchUsersByProjectIdService, getProjectUsers} from "@/entities/User";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import SearchIcon from "@/shared/assets/icons/searchIcon.svg";
import {Button} from "@/shared/ui/Button";
import AvatarIcon from "@/shared/assets/icons/userAvatarIcon.svg";
import {
    FetchProjectTreeTasksService,
} from "@/entities/Task/model/services/fetchProjectTreeTasksService.ts";
import {ExtraFilters} from "../ExtraFilters/ExtraFilters.tsx";
import {Priority, PriorityKeys} from "@/entities/Task";
import {CreateExtendedTaskButton} from "@/features/CreateNewTask";
import {useIsMobile} from "@/shared/hooks/useIsMobile";
import {
    getDeadlineFrom,
    getDeadlineTo,
    getSearchQuery,
    getSelectedAuthorIds,
    getSelectedPriority,
    getSelectedResolution,
    getStoryPointsFrom,
    getStoryPointsTo,
    getSelectedAssigneeIds,
    getTaskFiltersState,
    getSelectedBoardIds
} from "../../model/selectors/getTaskFilters.ts";
import {prepareFiltersFromState} from "../../lib/PrepareFiltersBody.ts";
import {taskFiltersActions} from "../../model/slice/taskFiltersSlice.ts";

interface TasksFiltersProps {
    className?: string;
}

export const TasksFilters = (props: TasksFiltersProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const selectedProject = useSelector(getProjectSelectedProject)

    const {isMobile} = useIsMobile()

    // Global Task Filters
    const selectedResolution = useSelector(getSelectedResolution);
    const selectedAuthorIds = useSelector(getSelectedAuthorIds);
    const selectedAssigneeIds = useSelector(getSelectedAssigneeIds);
    const searchQuery = useSelector(getSearchQuery);
    const selectedPriority = useSelector(getSelectedPriority);
    const deadlineFrom = useSelector(getDeadlineFrom);
    const deadlineTo = useSelector(getDeadlineTo);
    const storyPointsFrom = useSelector(getStoryPointsFrom);
    const storyPointsTo = useSelector(getStoryPointsTo);
    const selectedBoardsIds = useSelector(getSelectedBoardIds)

    // boards
    // const [selectedBoardsIds, setSelectedBoarIds] = useState<(string | number)[]>([]);
    const projectBoard = useSelector(getUserBoardsBySelectedProject)
    const [boardOptions, setBoardOptions] = useState<Option[]>([])

    useEffect(() => {
        if (projectBoard.length >= 1) {
            setBoardOptions(projectBoard.map(board => {
                return {
                    label: board.title,
                    value: board.id
                }
            }))
        }
    }, [projectBoard]);

    // resolutions
    const normalizedResolutionsOptions: Option<ResolutionKeys>[] = [
        {
            label: Resolution.OPEN,
            value: 'OPEN'
        },
        {
            label: Resolution.ACTIVE,
            value: 'ACTIVE'
        },
        {
            label: Resolution.DONE,
            value: 'DONE'
        },
        {
            label: Resolution.ARCHIVED,
            value: 'ARCHIVED'
        }
    ]

    // const [selectedResolution, setSelectedResolution] = useState<(string | number)[]>([])

    // author
    // const [selectedAuthorIds, setSelectedAuthorIds] = useState<(string | number)[]>([]);
    const [authorOptions, setAuthorOptions] = useState<Option[]>([])

    // Assignee
    useEffect(() => {
        if (selectedProject) {
            dispatch(FetchUsersByProjectIdService({ProjectId: selectedProject.id}))
        }
    }, [dispatch, selectedProject]);

    // const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<(string | number)[]>([]);
    const projectUsers = useSelector(getProjectUsers)
    const [assigneeOptions, setAssigneeOptions] = useState<Option[]>([])

    useEffect(() => {
        if (projectUsers.length >= 1) {
            const userOptions = projectUsers.map(user => {
                return {
                    label: (
                        <div className={cls.UserWrapper}>
                            {user.imageUrl
                                ? <img className={cls.AvatarIcon} src={user.imageUrl} alt="assignee"/>
                                : <div className={cls.AvatarIcon}><AvatarIcon/></div>}
                            <span>{user.firstName} {user.lastName}</span>
                        </div>),
                    value: user.id
                }
            })

            setAssigneeOptions(
                [
                    {
                        label: 'Не назначен',
                        value: null
                    },
                    ...userOptions
                ]
            )

            setAuthorOptions(userOptions)
        }
    }, [projectUsers]);

    // search
    // const [searchQuery, setSearchQuery] = useState<string>('')

    // priority
    const normalizedPriorityOptions: Option<PriorityKeys>[] = [
        {
            label: Priority.HIGHEST,
            value: 'HIGHEST'
        },
        {
            label: Priority.HIGH,
            value: 'HIGH'
        },
        {
            label: Priority.MEDIUM,
            value: 'MEDIUM'
        },
        {
            label: Priority.LOW,
            value: 'LOW'
        }
    ]

    // const [selectedPriority, setSelectedPriority] = useState<(string | number)[]>([])

    // const [deadlineFrom, setDeadlineFrom] = useState<Date>(null)
    // const [deadlineTo, setDeadlineTo] = useState<Date>(null)

    // storyPoints
    // const [storyPointsFrom, setStoryPointsFrom] = useState<string>('')
    // const [storyPointsTo, setStoryPointsTo] = useState<string>('')

    const filtersState = useSelector(getTaskFiltersState);

    // finally
    const onSearchButtonClickHandler = async () => {
        const preparedBody = prepareFiltersFromState(filtersState)
        await dispatch(FetchProjectTreeTasksService({projectId: selectedProject.id, filters: preparedBody}))
    }
    const onClearFiltersClickHandler = () => {

        dispatch(taskFiltersActions.resetAllFilters())

        dispatch(FetchProjectTreeTasksService({projectId: selectedProject.id}))
    }


    return (
        <div className={classNames(cls.TasksFilters, {}, [className])}>
            <CheckBoxFilter
                options={boardOptions}
                setSelectedValues={(v) => dispatch(taskFiltersActions.setSelectedBoardsIds(v))}
                selectedValues={selectedBoardsIds}
                placeholder={'Доска'}
            />

            <CheckBoxFilter
                options={normalizedResolutionsOptions}
                setSelectedValues={(v) => dispatch(taskFiltersActions.setSelectedResolution(v))}
                selectedValues={selectedResolution}
                placeholder={'Резолюция'}
            />

            <CheckBoxFilter
                options={assigneeOptions}
                setSelectedValues={(v) => dispatch(taskFiltersActions.setSelectedAssigneeIds(v))}
                selectedValues={selectedAssigneeIds}
                placeholder={'Исполнитель'}
            />

            <div className={cls.SearchInputWrapper}>
                <span className={cls.SearchIcon}><SearchIcon/></span>

                <input
                    type="text"
                    placeholder="Содержит текст"
                    value={searchQuery}
                    onChange={(e) => dispatch(taskFiltersActions.setSearchQuery(e.target.value))}
                    className={cls.SearchInput}
                />
            </div>

            <ExtraFilters
                // author
                authorOptions={authorOptions}
                authorSelectedValues={selectedAuthorIds}
                authorSetSelectedValues={(v) => dispatch(taskFiltersActions.setSelectedAuthorIds(v))}

                // priority
                priorityOptions={normalizedPriorityOptions}
                prioritySelectedValues={selectedPriority}
                prioritySetSelectedValues={(v) => dispatch(taskFiltersActions.setSelectedPriority(v))}

                // deadline
                deadlineFrom={deadlineFrom}
                setDeadlineFrom={(v) => dispatch(taskFiltersActions.setDeadlineFrom(v))}

                deadlineTo={deadlineTo}
                setDeadlineTo={(v) => dispatch(taskFiltersActions.setDeadlineTo(v))}

                // storyPoints
                storyPointsFrom={storyPointsFrom}
                setStoryPointsFrom={(v) => dispatch(taskFiltersActions.setStoryPointsFrom(v))}

                storyPointsTo={storyPointsTo}
                setStoryPointsTo={(v) => dispatch(taskFiltersActions.setStoryPointsTo(v))}
            />

            <Button buttonType={'SMART_TEXT_BTN_FILLED'} onClick={onSearchButtonClickHandler}>Поиск</Button>
            <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onClearFiltersClickHandler}>Очистить</Button>

            {isMobile && <CreateExtendedTaskButton/>}
        </div>
    )
};
