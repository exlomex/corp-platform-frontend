import { classNames } from '@/shared/lib/classNames';
import cls from './TasksFilters.module.scss';
import {ChangeEvent, useEffect, useState} from "react";
import {MultiSelect, Option} from "@/shared/ui/MultiSelect";
import {FilterButton} from "@/features/TasksFilters/ui/FilterButton/FilterButton.tsx";
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
    TasksTreeFilters
} from "@/entities/Task/model/services/fetchProjectTreeTasksService.ts";
import {ExtraFilters} from "../ExtraFilters/ExtraFilters.tsx";
import {Priority, PriorityKeys} from "@/entities/Task";
import {dateConverter} from "@/features/TasksFilters/lib/DateConverter.ts";

interface TasksFiltersProps {
    className?: string;
}

export const TasksFilters = (props: TasksFiltersProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const selectedProject = useSelector(getProjectSelectedProject)

    // boards
    const [selectedBoardsIds, setSelectedBoarIds] = useState<(string | number)[]>([]);
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

    const [selectedResolution, setSelectedResolution] = useState<(string | number)[]>([])

    // author
    const [selectedAuthorIds, setSelectedAuthorIds] = useState<(string | number)[]>([]);
    const [authorOptions, setAuthorOptions] = useState<Option[]>([])

    // Assignee
    useEffect(() => {
        if (selectedProject) {
            dispatch(FetchUsersByProjectIdService({ProjectId: selectedProject.id}))
        }
    }, [dispatch, selectedProject]);

    const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<(string | number)[]>([]);
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
    const [searchQuery, setSearchQuery] = useState<string>('')

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

    const [selectedPriority, setSelectedPriority] = useState<(string | number)[]>([])

    const [deadlineFrom, setDeadlineFrom] = useState<Date>(null)
    const [deadlineTo, setDeadlineTo] = useState<Date>(null)

    // storyPoints
    const [storyPointsFrom, setStoryPointsFrom] = useState<string>('')
    const [storyPointsTo, setStoryPointsTo] = useState<string>('')

    // finally
    const onSearchButtonClickHandler = async () => {
        const preparedBody: TasksTreeFilters = {
            boardIds: selectedBoardsIds,
            authorIds: selectedAuthorIds,
            assigneeIds: selectedAssigneeIds,
            priorities: selectedPriority as PriorityKeys[],
            text: searchQuery,
            resolutions: selectedResolution as ResolutionKeys[],
            deadlineStart: deadlineFrom ? dateConverter(deadlineFrom) : null,
            deadlineEnd: deadlineTo ? dateConverter(deadlineTo) : null,
            storyPointsFrom: storyPointsFrom ? +storyPointsFrom : null,
            storyPointsTo: storyPointsTo ? +storyPointsTo : null
        }
        await dispatch(FetchProjectTreeTasksService({projectId: selectedProject.id, filters: preparedBody}))
    }
    const onClearFiltersClickHandler = () => {
        setSearchQuery('')
        setSelectedAssigneeIds([])
        setSelectedResolution([])
        setSelectedBoarIds([])
        setDeadlineFrom(null)
        setDeadlineTo(null)
        setSelectedPriority([])
        setSelectedAuthorIds([])
        setStoryPointsFrom('')
        setStoryPointsTo('')

        dispatch(FetchProjectTreeTasksService({projectId: selectedProject.id}))
    }

    return (
        <div className={classNames(cls.TasksFilters, {}, [className])}>
            <CheckBoxFilter
                options={boardOptions}
                setSelectedValues={setSelectedBoarIds}
                selectedValues={selectedBoardsIds}
                placeholder={'Доска'}
            />

            <CheckBoxFilter
                options={normalizedResolutionsOptions}
                setSelectedValues={setSelectedResolution}
                selectedValues={selectedResolution}
                placeholder={'Резолюция'}
            />

            <CheckBoxFilter
                options={assigneeOptions}
                setSelectedValues={setSelectedAssigneeIds}
                selectedValues={selectedAssigneeIds}
                placeholder={'Исполнитель'}
            />

            <div className={cls.SearchInputWrapper}>
                <span className={cls.SearchIcon}><SearchIcon/></span>

                <input
                    type="text"
                    placeholder="Содержит текст"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className={cls.SearchInput}
                />
            </div>

            <ExtraFilters
                // author
                authorOptions={authorOptions}
                authorSelectedValues={selectedAuthorIds}
                authorSetSelectedValues={setSelectedAuthorIds}

                // priority
                priorityOptions={normalizedPriorityOptions}
                prioritySelectedValues={selectedPriority}
                prioritySetSelectedValues={setSelectedPriority}

                // deadline
                deadlineFrom={deadlineFrom}
                setDeadlineFrom={setDeadlineFrom}

                deadlineTo={deadlineTo}
                setDeadlineTo={setDeadlineTo}

                // storyPoints
                storyPointsFrom={storyPointsFrom}
                setStoryPointsFrom={setStoryPointsFrom}

                storyPointsTo={storyPointsTo}
                setStoryPointsTo={setStoryPointsTo}
            />

            <Button buttonType={'SMART_TEXT_BTN_FILLED'} onClick={onSearchButtonClickHandler}>Поиск</Button>
            <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onClearFiltersClickHandler}>Очистить</Button>
        </div>
    )
};
