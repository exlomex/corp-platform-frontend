import {TaskSnapshots} from "@/entities/Task/model/types/taskSliceSchema.ts";
import {Link} from "react-router";
import AvatarIcon from "@/shared/assets/icons/userAvatarIcon.svg";
import {ReactNode} from "react";
import cls from '../ui/SnapshotsTable/SnapshotsTable.module.scss'
import {formatCustomDate} from "@/shared/lib/formatCustomDate";

export type NormalizedSnapshotType = {
    id: number;
    title: ReactNode;
    modifiedBy: ReactNode;
    modifiedDate: string;
    version: ReactNode;
};

export function normalizeSnapshots(items: TaskSnapshots[], onSnapshotClickHandler: () => void): NormalizedSnapshotType[] {
    const searchParams = new URLSearchParams(location.search);

    return items.map((item) => {
        const snapshot = item.snapshot;
        const modifier = item.userId;

        searchParams.set("selectedSnapshotVersion", String(item.version));

        return {
            id: item.id,
            title: (
                <Link
                    onClick={onSnapshotClickHandler}
                    className={cls.LinkTask}
                    to={{
                        pathname: location.pathname,
                            search: `?${searchParams}`,
                    }}>
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
            <span className={cls.Modifier}>{modifier.firstName} {modifier.lastName}</span>
            </div>
            ),
            modifiedDate: formatCustomDate(new Date(item.modifiedDate)),
                version: (<div>{item.version}</div>)
        };
    });
}