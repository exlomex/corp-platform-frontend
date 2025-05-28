import { classNames } from '@/shared/lib/classNames';
import cls from './TaskFileWrapper.module.scss';
import {File} from "@/features/File";
import CloseIcon from "@/shared/assets/icons/extraSmallCloseIcon.svg";

interface TaskFileWrapperProps {
    className?: string;
    file: File;
    onFileDelete: (fileId?: number) => void
    fileVariant?: 'CreateTask' | 'Task';
}

export const TaskFileWrapper = (props: TaskFileWrapperProps) => {
    const { className, onFileDelete, fileVariant = 'Task', file } = props;

    const fileType = file.url.split('.').pop();

    const content = (
        <>
            <span className={cls.FileType}>{fileType}</span>

            <div className={cls.FileContent}>
                <p className={cls.FileName}>{file.name}</p>

                <span onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onFileDelete(file.id)
                }} className={cls.DeleteIcon}>
                    <CloseIcon/>
                </span>
            </div>
        </>
    );

    return fileVariant === 'Task' ? (
        <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(cls.TaskFileWrapper, {}, [className])}
        >
            {content}
        </a>
    ) : (
        <div className={classNames(cls.TaskFileWrapper, {}, [className])}>
            {content}
        </div>
    );
};
