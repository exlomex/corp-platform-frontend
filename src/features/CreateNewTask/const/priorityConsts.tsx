import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";
import {Priority, priorityIconMap} from "@/entities/Task";


export const priorityOptions: ComboBoxOption[] = Object.entries(Priority).map(([key, label]) => ({
    label,
    value: key,
    data: {
        svg: priorityIconMap[label as Priority],
    },
}));
