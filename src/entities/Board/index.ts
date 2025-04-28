export {BoardActions, BoardReducer} from './model/slice/boardSlice.ts';
export type {BoardInterface, BoardSliceSchema} from './model/types/boardSliceSchema.ts';
export {getIsUserBoardsFetching, getIsUserBoardsFirstLoading, getSelectedBoard,getUserBoardsBySelectedProject} from '@/entities/Board/model/selectors/getBoardValues.ts'