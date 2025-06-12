import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectBoardContent.module.scss';
import {AgileBoard} from "@/widgets/AgileBoard";
import {Typography} from "@/shared/ui/Typography";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router";
import {useSelector} from "react-redux";
import {getUserBoardsBySelectedProject} from "@/entities/Board";
import {useEffect, useMemo, useState} from "react";
import {getTaskInfoModalIsOpen, SubTaskModal, TaskActions} from "@/entities/Task";
import {CreateExtendedTaskButton, CreateExtendedTaskModal} from "@/features/CreateNewTask";
import {CommentActions, TaskInfoModal} from "@/features/TaskInfo";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {StatusActions} from "@/entities/Status";
import {useTaskInfoModal} from "@/shared/hooks/useTaskInfoModal";
import {getUserInfo} from "@/entities/User/model/selectors/getUserValues.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";

interface ProjectBoardContentProps {
    className?: string;
}

export const ProjectBoardContent = (props: ProjectBoardContentProps) => {
    const { className } = props;

    const params = useParams()

    const boards = useSelector(getUserBoardsBySelectedProject)

    const [selectedBoardTitle, setSelectedBoardTitle] = useState<string>('');
    useEffect(() => {
        const boardId = +params.board;
        if (boardId && boards) {
            const boardTitle = boards.find(board => board.id === boardId);
            if (boardTitle) {
                setSelectedBoardTitle(boardTitle.title);
            }
        }
    }, [boards, params.board]);

    const { isModalOpen, onClose } = useTaskInfoModal();

    const selectedProject = useSelector(getProjectSelectedProject)
    const userInfo = useSelector(getUserInfo);

    const editIsPossible = userInfo?.allowedProjects.includes(selectedProject?.id)

    return (
        <div className={classNames(cls.ProjectBoardContent, {}, [className])}>
            <div className={cls.BoardTitleWrapper}>
                <Typography className={cls.BoardTitle} size={'TEXT-26-MEDIUM'}>{selectedBoardTitle}</Typography>
                {editIsPossible && <CreateExtendedTaskButton/>}
            </div>
            <AgileBoard/>

            {/* AddSubTaskModal */}
            <SubTaskModal/>

            {/* AddTaskModal */}
            <CreateExtendedTaskModal/>

            {/* TaskInfoModal */}
            {<TaskInfoModal isOpen={isModalOpen} onClose={onClose}/>}
        </div>
    )
};
