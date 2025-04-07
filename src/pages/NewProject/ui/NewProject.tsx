import { classNames } from '@/shared/lib/classNames';
import cls from './NewProject.module.scss';

interface NewProjectProps {
    className?: string;
}

export function NewProject(props: NewProjectProps) {
    const { className } = props;
    return (
        <div className={classNames(cls.NewProject, {}, [className])}>
            новый проект
        </div>
    )
}

export default NewProject