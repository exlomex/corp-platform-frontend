import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectBoardContent.module.scss';
import {AgileBoard} from "@/widgets/AgileBoard";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {getUserBoardsBySelectedProject} from "@/entities/Board";
import {useEffect, useState} from "react";
import { SubTaskModal} from "@/entities/Task";
import {CreateExtendedTaskButton, CreateExtendedTaskModal} from "@/features/CreateNewTask";
import {TaskInfoModal} from "@/features/TaskInfo";
import {useTaskInfoModal} from "@/shared/hooks/useTaskInfoModal";
import {getUserInfo} from "@/entities/User/model/selectors/getUserValues.ts";
import {getProjectSelectedProject} from "@/entities/Project/model/selectors/getProjectValues.ts";
import {EditableBoardTitle} from "@/features/EditableBoardTitle";
import {Helmet} from "react-helmet";
import {Skeleton} from "@/shared/ui/Skeleton";

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

    const [isEditTitleActive, setIsEditTitleActive] = useState<boolean>(false)

    const combinedTitle = selectedBoardTitle ? `Доска - ${selectedBoardTitle}` : 'Доска'

    return (
        <div className={classNames(cls.ProjectBoardContent, {}, [className])}>
            <Helmet>
                <title>{combinedTitle}</title>
            </Helmet>

            <div className={cls.BoardTitleWrapper}>
                {selectedBoardTitle ? <EditableBoardTitle
                    boardTitle={selectedBoardTitle}
                    boardId={+params.board}
                    isEditTitleActive={isEditTitleActive}
                    setIsEditTitleActive={setIsEditTitleActive}
                /> : <Skeleton border={6} height={40} width={140}/>}

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
