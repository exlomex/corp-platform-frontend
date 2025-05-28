import { classNames } from '@/shared/lib/classNames';
import cls from './AddCommentFileWrapper.module.scss';
import CloseIcon from '@/shared/assets/icons/extraSmallCloseIcon.svg'
import {File} from "@/features/File";
import FileIcon from "@/shared/assets/icons/fileIcon.svg";

interface AddCommentFileWrapperProps {
    className?: string;
    file: File;
    onFileDelete?: () => void
    type?: 'Comment' | 'CommentForm'
}

export const AddCommentFileWrapper = (props: AddCommentFileWrapperProps) => {
    const { className, onFileDelete, file, type = 'CommentForm' } = props;

    const content = (
        <>
            <span className={cls.IconWrapper}><FileIcon /></span>
            <p className={cls.fileTitle}>{file.name}</p>
            {onFileDelete && type === 'CommentForm' && (
                <span onClick={onFileDelete} className={classNames(cls.IconWrapper, {}, [cls.CloseIcon])}>
                <CloseIcon />
            </span>)}
        </>
    );

    if (type === 'Comment') {
        return (
            <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(cls.AddCommentFileWrapper, {}, [className])}
            >
                {content}
            </a>
        );
    }

    return (
        <div className={classNames(cls.AddCommentFileWrapper, {}, [className])}>
            {content}
        </div>
    );
};
