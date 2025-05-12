import ExtraHighPriorityIcon from '@/shared/assets/icons/priority/extraHighPriority.svg';
import HighPriorityIcon from '@/shared/assets/icons/priority/highPriority.svg';
import MediumPriorityIcon from '@/shared/assets/icons/priority/mediumPriority.svg';
import LowPriorityIcon from '@/shared/assets/icons/priority/lowPriority.svg';
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
export enum Priority {
    HIGHEST = 'Очень cерьезный',
    HIGH = 'Серьезный',
    MEDIUM = 'Средний',
    LOW = 'Низкий',
}

export const priorityIconMap: Record<Priority, React.ReactNode> = {
    [Priority.HIGHEST]: <ExtraHighPriorityIcon />,
    [Priority.HIGH]: <HighPriorityIcon />,
    [Priority.MEDIUM]: <MediumPriorityIcon />,
    [Priority.LOW]: <LowPriorityIcon />,
};

export const priorityOptions: ComboBoxOption[] = Object.entries(Priority).map(([key, label]) => ({
    label,
    value: key,
    data: {
        svg: priorityIconMap[label as Priority],
    },
}));
