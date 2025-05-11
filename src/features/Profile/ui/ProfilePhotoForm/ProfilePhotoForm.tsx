import {useRef} from "react";
import {useSelector} from "react-redux";
import {getUserImageIsFetching, getUserInfo} from "@/entities/User/model/selectors/getUserValues.ts";
import {classNames} from "@/shared/lib/classNames";
import cls from './ProfilePhotoForm.module.scss'
import AvatarIcon from '@/shared/assets/icons/bigAvatarIcon.svg'
import {Button} from "@/shared/ui/Button";
import {Typography} from "@/shared/ui/Typography";
import {addImageService, AddImageServiceInputData} from "@/entities/User/model/services/addImageService.ts";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch/useAppDispatch.ts";
import {fetchUserInfo} from "@/features/ProfileTab/model/services/fetchUserInfo.ts";

interface ProfilePhotoFormProps {
    className?: string;
}

export const ProfilePhotoForm = ({className}: ProfilePhotoFormProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const userInfo = useSelector(getUserInfo)
    const dispatch = useAppDispatch()

    const onSubmitHandler = async (file: File) => {
        const addBody: AddImageServiceInputData = {
            file: file
        }

        try {
            await dispatch(addImageService(addBody)).unwrap();
            await dispatch(fetchUserInfo()).unwrap()
        } catch (e) {
            console.error(e)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size <= 3.5 * 1024 * 1024) {
            onSubmitHandler(file);
        } else {
            console.log('Слишком большой файл');
        }
    };

    const isFetching = useSelector(getUserImageIsFetching)

    return (
        <div className={classNames(cls.ProfilePhotoForm, {}, [className])}>
            <div className={cls.Avatar}>
                {userInfo?.imageUrl ? (
                    <img src={userInfo?.imageUrl} alt="Аватар"/>
                ) : (
                    <span className={cls.ImageContainer}><AvatarIcon/></span>
                )}
            </div>

            <div className={cls.BottomLine}>
                <input
                    type="file"
                    accept="image/*"
                    className={cls.HiddenInput}
                    ref={inputRef}
                    onChange={handleFileChange}
                />
                <Button isLoading={isFetching} onClick={() => inputRef.current?.click()} buttonType={'SMART_TEXT_BTN_FILLED'}>Загрузить
                    фото</Button>

                <Typography className={cls.FileHint} size={'PARAGRAPH-12-REGULAR'}>Максимальный размер файла 3.5
                    мб</Typography>
            </div>
        </div>
    );
};

