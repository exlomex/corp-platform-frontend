import { classNames } from '@/shared/lib/classNames';
import {File} from "../../../model/types/fileTypes.ts";
import cls from './MessageFileWrapper.module.scss';

interface MessageFileWrapperProps {
    className?: string;
    file: File
}

export const MessageFileWrapper = (props: MessageFileWrapperProps) => {
    const { className, file } = props;

    const fileType = file.url.split('.').pop();

    return (
        <a href={file.url} className={classNames(cls.messageFileWrapper, {}, [className])}>
            <span className={cls.fileType}>{fileType}</span>

            <p className={cls.FileName}>{file.name}</p>
        </a>
    )
};
