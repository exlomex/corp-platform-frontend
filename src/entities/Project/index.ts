export {ProjectActions, ProjectReducer} from './model/slice/projectSlice.ts';
export type {ProjectDataInterface} from './model/types/projectSliceSchema.ts'
export {getProjectFetchUserProjectIsLoading, getProjectUserProjects,getIsFirstFetchUserProject,getProjectIsDeleteProjectFetching} from './model/selectors/getProjectValues.ts'
export {selectNewProject} from './lib/selectNewProject.ts'