import {classNames} from '@/shared/lib/classNames';
import cls from './ProjectsAdditionalButton.module.scss';
import {DropDown} from "@/shared/ui/popups";
import DotsIcon from "@/shared/assets/icons/dots.svg";
import {Button} from "@/shared/ui/Button";
import {DropdownItem} from "@/shared/ui/popups/DropDown/DropDown.tsx";
import {Theme} from "@/shared/types/theme.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {DeleteUserProjectById} from "@/entities/Project/model/services/deleteUserProjectById.ts";
import {useSelector} from "react-redux";
import {getProjectIsDeleteProjectFetching, ProjectActions} from "@/entities/Project";

interface ProjectsAdditionalButtonProps {
    className?: string;
    id: number
}

export const ProjectsAdditionalButton = (props: ProjectsAdditionalButtonProps) => {
    const { className, id } = props;

    const dispatch = useAppDispatch()

    const isDeleteFetching = useSelector(getProjectIsDeleteProjectFetching)
    const onDeleteProjectHandler = async () => {
        await dispatch(DeleteUserProjectById({id: id})).unwrap()
        await dispatch(ProjectActions.initProjects())
    }

    const AdditionalButtonItems: DropdownItem[] = [
        {
            content: 'Удалить',
            onClick: onDeleteProjectHandler,
            isLoading: isDeleteFetching
        },
        {
            content: 'Редактировать',
        }
    ]

    return (
        <DropDown
            className={classNames(cls.ProjectsAdditionalButton, {}, [className])}
            items={AdditionalButtonItems}
            trigger={<Button buttonType={'SMART_ICON_BTN_FILLED'}><DotsIcon/></Button>}
            direction={'bottom end'}
            theme={Theme.LIGHT_THEME}
        />
    )
};
