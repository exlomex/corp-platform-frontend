import { classNames } from '@/shared/lib/classNames';
import cls from './SendMessageFileWrapper.module.scss';
import {File} from "@/features/File";
import FileIcon from '@/shared/assets/icons/fileIcon.svg'
import CloseIcon from '@/shared/assets/icons/extraSmallCloseIcon.svg'

interface SendMessageFileWrapperProps {
    className?: string;
    file: File;
    onFileDelete: () => void
}

export const SendMessageFileWrapper = (props: SendMessageFileWrapperProps) => {
    const { className, onFileDelete, file } = props;
    return (
        <div className={classNames(cls.SendMessageFileWrapper, {}, [className])}>
            <span className={cls.IconWrapper}><FileIcon/></span>

            <p>{file.name}</p>

            <span onClick={onFileDelete} className={classNames(cls.IconWrapper, {}, [cls.CloseIcon])}>
                <CloseIcon/>
            </span>
        </div>
    )
};
