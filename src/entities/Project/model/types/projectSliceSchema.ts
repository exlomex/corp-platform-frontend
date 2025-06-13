import {UserI} from "@/entities/User";
import {ComboBoxOption} from "@/shared/ui/ComboBox/ComboBox.tsx";

export interface ProjectDataInterface {
    id: number,
    shortName: string,
    title: string,
    companyId: number,
    ownerId: number,
}

export interface SelectedProjectInterface {
    id: number;
    title: string;
    projectKey: string
    ownerId: number
}
export interface ProjectSliceSchema {
    userProjects?: ProjectDataInterface[]
    selectedProject?: SelectedProjectInterface

    isFirstFetchUserProject: boolean;
    fetchUserProjectIsLoading: boolean;

    isDeleteProjectFetching: boolean;

    settingsProjectUsers: UserI[]
    settingsSelectedProject: ComboBoxOption
    addUserToProjectModalIsOpen: boolean

    editProjectTitleModalIsOpen: boolean
    editProjectInitialData: {
        projectTitle: string,
        projectId: number,
    }
}