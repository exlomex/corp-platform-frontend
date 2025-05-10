import { classNames } from '@/shared/lib/classNames';
import cls from './AdditionalEditableAssignee.module.scss';
import {useEffect, useState} from "react";
import {ComboBox, ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {useSelector} from "react-redux";
import {FetchUsersByCompanyIdService, getUserCompanyId} from "@/entities/User";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {getUserCompanyUsers} from "@/entities/User/model/selectors/getUserValues.ts";
import {AdditionalTaskAuthor} from "@/features/TaskInfo/AdditionalTaskAuthor/AdditionalTaskAuthor.tsx";
import {addTaskAssigneeInputData, AddTaskAssigneeService, getSelectedTaskInfo} from "@/entities/Task";
import {fetchTaskInfoService} from "@/entities/Task/model/services/fetchTaskInfoService.ts";

interface AdditionalEditableAssigneeProps {
    className?: string;
}

export const AdditionalEditableAssignee = (props: AdditionalEditableAssigneeProps) => {
    const {className} = props;

    const dispatch = useAppDispatch()
    const selectedCompanyId = useSelector(getUserCompanyId)
    const selectedTaskInfo = useSelector(getSelectedTaskInfo)

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
        if (selectedCompanyId) dispatch(FetchUsersByCompanyIdService({companyId: selectedCompanyId}));
    }, [dispatch, selectedCompanyId]);

    const companyUsers = useSelector(getUserCompanyUsers)

    useEffect(() => {
        if (companyUsers?.length) {
            setNormalizedUser(
                [{label: 'Не выбрано', value: ''},
                    ...companyUsers.map(user => {
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
        }
    }, [companyUsers]);

    const [fieldIsActive, setFieldIsActive] = useState<boolean>(false)

    const onFieldClickHandler = () => {
        setFieldIsActive(true)
    }

    const onSelectNewAssigneeHandler = async (options: ComboBoxOption) => {
        if (selectedTaskInfo && selectedTaskInfo.id && selectedTaskInfo.uniqueTitle && options) {
            const addAssigneeBody: addTaskAssigneeInputData = {
                assigneeId: options.id || undefined,
                taskId: selectedTaskInfo.id
            }

            try {
                console.log(1313);
                if (selectedTaskInfo?.assignee?.id === options.id) {
                    setFieldIsActive(false)
                    return
                }

                await dispatch(AddTaskAssigneeService(addAssigneeBody)).unwrap()
                await dispatch(fetchTaskInfoService({uniqueTitle: selectedTaskInfo.uniqueTitle})).unwrap()
                setFieldIsActive(false)
                setPickedUser(options)

            } catch (e) {
                console.error(e)
            }
        }
    }

    return (
        <div className={classNames(cls.AdditionalEditableAssignee, {}, [className])}>
            {!fieldIsActive ? (
                selectedTaskInfo?.assignee?.id ? (
                    <AdditionalTaskAuthor
                        onClick={onFieldClickHandler}
                        firstName={selectedTaskInfo?.assignee?.firstName}
                        lastName={selectedTaskInfo?.assignee?.lastName}
                        imageUrl={selectedTaskInfo?.assignee?.imageUrl}
                    />
                ) : (
                    <AdditionalTaskAuthor
                        firstName={'Не'}
                        lastName={'назначено'}
                        onClick={onFieldClickHandler}
                    />
                )
            ) : (
                <div>
                    {normalizedUser
                        && <ComboBox onSelectAction={onSelectNewAssigneeHandler} withImage value={pickedUser} options={normalizedUser}/>}
                </div>
            )}
        </div>

    )
};
