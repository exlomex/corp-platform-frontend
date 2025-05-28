import {TaskSnapshots} from "@/entities/Task/model/types/taskSliceSchema.ts";
import {Link} from "react-router";
import AvatarIcon from "@/shared/assets/icons/userAvatarIcon.svg";
import {ReactNode} from "react";
import cls from '../ui/SnapshotsTable/SnapshotsTable.module.scss'
import {dateConverter} from "@/features/TasksFilters/lib/DateConverter.ts";
import {formatCustomDate} from "@/shared/lib/formatCustomDate";

export type NormalizedSnapshotType = {
    id: number;
    title: ReactNode;
    modifiedBy: ReactNode;
    modifiedDate: string;
    version: ReactNode;
};

export function normalizeSnapshots(items: TaskSnapshots[]): NormalizedSnapshotType[] {
    return items.map((item) => {
        const snapshot = item.snapshot;
        const modifier = item.userId;

        return {
            id: item.id,
            title: (
                <Link
                    className={cls.LinkTask}
            to={{
            pathname: location.pathname,
                search: `?selectedTask=${snapshot.uniqueTitle}`,
        }}
    >
        {snapshot.uniqueTitle}
        </Link>
    ),
        modifiedBy: (
            <div className={cls.UserWrapper}>
                {modifier.imageUrl ? (
                    <img className={cls.AvatarIcon} src={modifier.imageUrl} alt="user avatar"/>
        ) : (
            <div className={cls.AvatarIcon}><AvatarIcon /></div>
        )}
        <span>{modifier.firstName}</span>
        </div>
    ),
        modifiedDate: formatCustomDate(new Date(item.modifiedDate)),
            version: (<div>{item.version}</div>)
    };
    });
}