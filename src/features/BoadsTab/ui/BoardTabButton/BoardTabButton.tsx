import { classNames } from '@/shared/lib/classNames';
import cls from './BoardTabButton.module.scss';
import AgileBoardIcon from '@/shared/assets/icons/agileTasks.svg'
import RightArrow from "@/shared/assets/icons/rightArrow.svg";

interface BoardTabButtonProps {
    className?: string;
    isOpen?: boolean;
}

export const BoardTabButton = (props: BoardTabButtonProps) => {
    const { className, isOpen } = props;
    return (
        <div className={classNames(cls.BoardTabButton, {[cls.TabIsActive]: isOpen}, [className])}>
            <div className={cls.BoardTabButtonContentWrapper}>
                <span className={cls.IconWrapper}><AgileBoardIcon/></span>
                <span className={cls.BoardHeading}>Agile доски</span>
            </div>

            <span className={classNames(cls.IconWrapperRightIcon, {[cls.ButtonIsActive]: isOpen}, [])}><RightArrow/></span>
        </div>
    )
};
