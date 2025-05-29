import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {classNames} from "@/shared/lib/classNames";
import {Typography} from "@/shared/ui/Typography";
import cls from './AddUserToProjectForm.module.scss'
import {Button} from "@/shared/ui/Button";
import {ComboBox} from "@/shared/ui/ComboBox";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {FetchUsersByCompanyIdService, getUserCompanyId} from "@/entities/User";
import {getUserCompanyUsers} from "@/entities/User/model/selectors/getUserValues.ts";
import {AddUserInProject, getSettingsSelectedProject} from "@/entities/Project";


interface CreateNewBoardFormProps {
    className?: string;
    onModalClose: () => void
}

export const AddUserToProjectForm = (props: CreateNewBoardFormProps) => {
    const { className, onModalClose} = props;

    const dispatch = useAppDispatch()

    // users
    const [normalizedUser, setNormalizedUser] = useState<ComboBoxOption[]>(null)
    const [pickedUser, setPickedUser] = useState<ComboBoxOption>(null)

    const selectedCompanyId = useSelector(getUserCompanyId)

    const companyUsers = useSelector(getUserCompanyUsers)

    useEffect(() => {
        if (selectedCompanyId) {dispatch(FetchUsersByCompanyIdService({companyId: selectedCompanyId}))}
    }, [dispatch, selectedCompanyId]);

    useEffect(() => {
        if (companyUsers?.length) {
            setNormalizedUser(
                [{ label: 'Не выбрано', value: '' },
                    ...companyUsers.map(user => {
                        return {
                            id: user.id,
                            label: `${user.firstName} ${user.lastName}`,
                            value: user.firstName,
                            data: {
                                image: user.imageUrl
                            }
                        }})
                ]
            )
        } else {
            setNormalizedUser(
                [{label: 'Не выбрано', value: ''}]
            )
        }
    }, [companyUsers]);

    const settingSelectedProject = useSelector(getSettingsSelectedProject)

    const onAddUserButtonClickHandler = async () => {
        if (pickedUser.value === '') {onModalClose()}
        console.log(settingSelectedProject);
        if (settingSelectedProject.id) {
            try {
                await dispatch(AddUserInProject({projectId: settingSelectedProject.id, userId: pickedUser.id})).unwrap()
                await onModalClose()
            } catch (e) {
                console.error(e?.message())
            }
        }
    }

    return (
        <div className={classNames(cls.AddUserToProjectForm, {}, [className])}>
            <Typography className={cls.AddUserHeading} size={'PARAGRAPH-18-REGULAR'}>Добавить пользователя в
                проект</Typography>
            <p className={cls.AddUserSubtitle}>Для добавления выберите пользователя из списка ниже.</p>

            <div>{normalizedUser &&
                <ComboBox position={'RELATIVE'} withImage value={pickedUser} setStateFunc={setPickedUser} options={normalizedUser}/>}
            </div>

            <div className={cls.BottomLine}>
                <Button buttonType={'SMART_TEXT_BTN_FILLED'} onClick={onAddUserButtonClickHandler}>Добавить в проект</Button>
                <Button buttonType={'SMART_TEXT_BTN_TRANSPARENT'} onClick={onModalClose}>Отмена</Button>
            </div>
        </div>
    )
};
