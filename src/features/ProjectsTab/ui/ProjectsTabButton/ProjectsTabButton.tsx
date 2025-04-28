import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsTabButton.module.scss';
import RightArrow from '@/shared/assets/icons/rightArrow.svg'

interface ProjectsTabButtonProps {
    className?: string;
    selectedProject?: string;
    isOpen?: boolean;
}

export const ProjectsTabButton = (props: ProjectsTabButtonProps) => {
    const { className, selectedProject = 'Ваши проекты', isOpen } = props;

    return (
        <div className={classNames(cls.ProjectsTabButton, {}, [className])}>
            <p className={cls.ProjectText}>{selectedProject}</p>
            <span className={classNames(cls.IconWrapper, {[cls.ButtonIsActive]: isOpen}, [])}><RightArrow/></span>
        </div>
    )
};
