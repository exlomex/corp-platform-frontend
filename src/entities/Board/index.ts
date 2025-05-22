export {
    BoardActions,
    BoardReducer
} from './model/slice/boardSlice.ts';
export type {
    BoardInterface,
    BoardSliceSchema
} from './model/types/boardSliceSchema.ts';
export {
    getIsUserBoardsFetching,
    getCreateTaskBoardsBySelectedProject,
    getIsUserBoardsFirstLoading,
    getUserBoardsBySelectedProject
} from '@/entities/Board/model/selectors/getBoardValues.ts'

export {BoardCard} from './ui/BoardCard/BoardCard.tsx'