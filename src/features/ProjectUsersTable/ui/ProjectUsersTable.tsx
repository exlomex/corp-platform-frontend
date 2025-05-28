import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectUsersTable.module.scss';
import {
    DeleteUserFromProject,
    FetchUsersInProject,
    getProjectUserProjects,
    getSettingProjectUsers, getSettingsSelectedProject, ProjectActions,
} from "@/entities/Project";
import {Table} from "@/shared/ui/Table";
import {Column} from "@/shared/ui/Table/Table.tsx";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {UserI} from "@/entities/User";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {Typography} from "@/shared/ui/Typography";
import {Select} from "@/shared/ui/Select";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {Button} from "@/shared/ui/Button";
import {LOCAL_STORAGE_USER_TOKEN} from "@/shared/const/localstorage.ts";
import {jwtDecode} from "jwt-decode";
import {tokenInfoTypes} from "@/entities/User/model/types/userSliceSchema.ts";

interface ProjectUsersTableProps {
    className?: string;
}

export const ProjectUsersTable = (props: ProjectUsersTableProps) => {
    const { className } = props;

    const dispatch = useAppDispatch()

    const currentUserInfo: tokenInfoTypes = jwtDecode(localStorage.getItem(LOCAL_STORAGE_USER_TOKEN))

    const onDeleteUserFromProjectHandler = async (userId: number) => {
        try {
            await dispatch(DeleteUserFromProject({userId: userId, projectId: +settingSelectedProject.id})).unwrap()
            await dispatch(FetchUsersInProject({projectId: +settingSelectedProject.value}))
        } catch (e) {
            console.error(e)
        }
    }

    const tableColumns: Column<UserI>[] = [
        {
            title: 'Имя',
            key: 'firstName',
            width: '20%'
        },
        {
            title: 'Фамилия',
            key: 'lastName',
            width: '20%'
        },
        {
            title: 'Email',
            key: 'email',
            width: '40%'
        },
        {
            key: 'action',
            title: 'Дополнительные действия',
            element: (row) => row.id !== currentUserInfo.id ? <Button onClick={() => onDeleteUserFromProjectHandler(row.id)} buttonType={'SMART_TEXT_BTN_TRANSPARENT'}>Удалить</Button> : <span></span>,
            width: '10%',
            alignColumn: 'right',
            alignTableData: 'right'
        }
    ]

    const companyProjects = useSelector(getProjectUserProjects)
    const settingSelectedProject = useSelector(getSettingsSelectedProject)
    const [normalizedProjectOptions, setNormalizedProjectOptions] = useState<ComboBoxOption[]>([])

    useEffect(() => {
        if (companyProjects?.length >= 1) {
            const pickedProject = companyProjects[0]

            dispatch(ProjectActions.setSettingsSelectedProject({
                id: pickedProject.id,
                label: pickedProject.title,
                value: String(pickedProject.id)
            }))

            setNormalizedProjectOptions(
                companyProjects.map(project => {
                    return {
                        id: project.id,
                        value: String(project.id),
                        label: project.title
                    }
                })
            )
        }
    }, [companyProjects, dispatch]);

    useEffect(() => {
        if (settingSelectedProject?.value) {
            console.log(settingSelectedProject.value);
            dispatch(FetchUsersInProject({projectId: +settingSelectedProject.value}))
        }
    }, [dispatch, settingSelectedProject]);

    const settingProjectUsers = useSelector(getSettingProjectUsers)

    const onSelectNewProjectHandler = (option: ComboBoxOption) => {
        dispatch(ProjectActions.setSettingsSelectedProject(option))
        // dispatch(FetchUsersInProject({projectId: +option.value}))
    }

    const onAddButtonClick = () => {
        dispatch(ProjectActions.setAddUserToProjectModalIsOpen(true))
    }

    return (
        <div className={classNames(cls.ProjectUsersTable, {}, [className])}>
            <div className={cls.ProjectPicker}>
                <Typography size={'PARAGRAPH-18-REGULAR'}>Добавить пользователя в проект</Typography>

                <div className={cls.ProjectPickerBottomLine}>
                    <div className={cls.ProjectSelect}>
                        <Typography size={'PARAGRAPH-16-REGULAR'} className={cls.SelectHeading}>Выберите проект</Typography>
                        <Select options={normalizedProjectOptions} value={settingSelectedProject} onSelectFunc={onSelectNewProjectHandler}/>
                    </div>

                    <Button buttonType={'SMART_TEXT_BTN_FILLED'} onClick={onAddButtonClick}>Добавить доступ</Button>
                </div>
            </div>

            <Table<UserI>
                columns={tableColumns}
                data={settingProjectUsers}
            />
        </div>
    )
};
