import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectBoardContent.module.scss';
import {AgileBoard} from "@/widgets/AgileBoard";
import {Typography} from "@/shared/ui/Typography";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router";
import {useSelector} from "react-redux";
import {getUserBoardsBySelectedProject} from "@/entities/Board";
import {useEffect, useState} from "react";
import {getTaskInfoModalIsOpen, SubTaskModal, TaskActions} from "@/entities/Task";
import {CreateExtendedTaskButton, CreateExtendedTaskModal} from "@/features/CreateNewTask";
import {CommentActions, TaskInfoModal} from "@/features/TaskInfo";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {StatusActions} from "@/entities/Status";

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

    return (
        <div className={classNames(cls.ProjectBoardContent, {}, [className])}>
            <div className={cls.BoardTitleWrapper}>
                <Typography size={'TEXT-26-MEDIUM'}>{selectedBoardTitle}</Typography>
                <CreateExtendedTaskButton/>
            </div>
            <AgileBoard/>
        </div>
    )
};
