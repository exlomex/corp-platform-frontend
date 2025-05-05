import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectBoardContent.module.scss';
import {AgileBoard} from "@/widgets/AgileBoard";

interface ProjectBoardContentProps {
    className?: string;
}

export const ProjectBoardContent = (props: ProjectBoardContentProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.ProjectBoardContent, {}, [className])}>
            <AgileBoard/>
        </div>
    )
};
