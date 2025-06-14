import {TreeTask} from "@/entities/Task/model/types/taskSliceSchema.ts";
import {ReactNode} from "react";
import {priorityIconMap} from "@/entities/Task";
import {Resolution} from "@/entities/Task/const/Resolution.tsx";
import {Link} from "react-router";
import cls from '../ui/TaskTree.module.scss'
import AvatarIcon from "@/shared/assets/icons/userAvatarIcon.svg";


export type NormalizedTreeItem = {
    id: number;
    title: ReactNode;
    uniqueTitle: ReactNode;
    boardTitle: string | ReactNode;
    statusResolution: string | ReactNode;
    authorFullName: string | ReactNode;
    assigneeFullName?: ReactNode;
    priority?: ReactNode;
    children?: NormalizedTreeItem[];
};

export function NormalizeTree(items: TreeTask[]): NormalizedTreeItem[] {
    return items.map(item => ({
        id: item.id,
        title: (
            <Link className={cls.LinkTask} to={{
                pathname: location.pathname,
                search: `?selectedTask=${item.uniqueTitle}`,
            }}>
                {item.title}
            </Link>
        ),
        uniqueTitle: (
            <Link className={cls.LinkTask} to={{
                pathname: location.pathname,
                search: `?selectedTask=${item.uniqueTitle}`,
            }}>
                {item.uniqueTitle}
            </Link>
        ),
        boardTitle: item.board?.title,
        statusResolution: Resolution[item.status?.resolution],
        authorFullName: `${item.author?.firstName} ${item.author?.lastName}`,
        assigneeFullName: item.assignee
            ? (<div className={cls.UserWrapper}>
                {item.assignee.imageUrl
                    ? <img className={cls.AvatarIcon} src={item.assignee.imageUrl} alt="assignee"/>
                    : <div className={cls.AvatarIcon}><AvatarIcon/></div>}
                <span>{item.assignee.firstName} {item.assignee.lastName}</span>
            </div>)
            : 'Не назначен',
        // priority: priorityIconMap[item.priority] || 'Не назначен',
        // priority: item.priority
        //     ? (<span>{`${priorityIconMap[item.priority]} ${item.priority}`}</span>)
        //         : ('Не назначен'),
        priority: item.priority
            ? (<span className={cls.Priority}>{priorityIconMap[item.priority]} {`${item.priority}`}</span>)
                : ('Не назначен'),
        children: item.children && item.children.length > 0
            ? NormalizeTree(item.children)
            : undefined
    }));
}