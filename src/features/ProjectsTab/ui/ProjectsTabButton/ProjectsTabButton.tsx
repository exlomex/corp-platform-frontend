import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsTabButton.module.scss';
import RightArrow from '@/shared/assets/icons/rightArrow.svg'

interface ProjectsTabButtonProps {
    className?: string;
    selectedProject?: string;
    isOpen?: boolean;
    isCollapsed: boolean
}

export const ProjectsTabButton = (props: ProjectsTabButtonProps) => {
    const { className, selectedProject = '', isOpen, isCollapsed } = props;

    return (
        <div className={classNames(cls.ProjectsTabButton, {[cls.IsCollapsed]: isCollapsed}, [className])}>
            <p className={cls.ProjectText}>{!selectedProject ? (isCollapsed ? 'Пр' : 'Ваши проекты') : selectedProject}</p>
            {!isCollapsed &&
                <span className={classNames(cls.IconWrapper, {[cls.ButtonIsActive]: isOpen}, [])}><RightArrow/></span>}
        </div>
    )
};
