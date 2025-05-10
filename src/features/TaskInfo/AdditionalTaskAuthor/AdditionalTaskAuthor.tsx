import { classNames } from '@/shared/lib/classNames';
import cls from './AdditionalTaskAuthor.module.scss';
import MediumAvatarIcon from "@/shared/assets/icons/mediumAvatarIcon.svg";

interface AdditionalTaskAuthorProps {
    className?: string;
    firstName: string;
    lastName: string;
    imageUrl?: string
    onClick?: () => void;
}

export const AdditionalTaskAuthor = (props: AdditionalTaskAuthorProps) => {
    const { className, lastName, firstName,imageUrl, onClick } = props;

    return (
        <div onClick={onClick} className={classNames(cls.AdditionalTaskAuthor, {[cls.Clickable]: onClick !== undefined}, [className])}>
            <div>
                {imageUrl
                    ? <img className={cls.Avatar} src={imageUrl} alt="avatar"/>
                    : <span className={cls.Avatar}><MediumAvatarIcon/></span>
                }
            </div>

            <p className={cls.AuthorName}>{`${firstName} ${lastName}`}</p>
        </div>
    )
};
