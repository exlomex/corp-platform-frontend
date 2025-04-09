import { classNames } from '@/shared/lib/classNames';
import cls from './ProjectsContent.module.scss';
import {Typography} from "@/shared/ui/Typography";
import {Table} from "@/shared/ui/Table";
import {Column} from "@/shared/ui/Table/Table.tsx";
import {ProjectsTable} from "@/features/ProjectsTable";
import {memo} from "react";

interface ProjectsContentProps {
    className?: string;
}

interface projectData {
    "id": number,
    "shortName": string,
    "title": string,
    "companyId": number,
    "ownerId": number,
}

const data: projectData[] = [
    {
        id: 1,
        shortName: "WWW",
        title: "New project",
        companyId: 1,
        ownerId: 1
    },
    {
        id: 2,
        shortName: "WWW",
        title: "New project",
        companyId: 1,
        ownerId: 1
    }
]

export const ProjectsContent = memo((props: ProjectsContentProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.ProjectsContent, {}, [className])}>
            <Typography className={cls.Heading} size={'TEXT-20-MEDIUM'}>Проекты</Typography>
            <ProjectsTable/>
        </div>
    )
});
