import {SelectedProjectInterface} from "@/entities/Project/model/types/projectSliceSchema.ts";
import {AppDispatch} from "@/app/providers/Store";
import {NavigateFunction, useParams} from "react-router";
import {ProjectActions} from "@/entities/Project";
import {LOCAL_STORAGE_SELECTED_PROJECT} from "@/shared/const/localstorage.ts";
import {FetchUserBoardsByProjectId} from "@/entities/Board/model/services/fetchUserBoardsByProjectId.ts";
import {getRouteBoards, getRouteProjectBoard} from "@/shared/const/router.ts";
import {BoardActions} from "@/entities/Board";
import {TaskActions} from "@/entities/Task";

interface Params {
    project?: string;
    board?: string;
}

export const selectNewProject = async (
    project: SelectedProjectInterface,
    dispatch: AppDispatch,
    navigate: NavigateFunction,
    params: Params,
    close?: () => void
) => {
    dispatch(ProjectActions.setSelectedProject(project));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT, JSON.stringify(project));
    dispatch(BoardActions.setIsUserBoardsFirstLoading(true))
    dispatch(TaskActions.setBoardTasksIsFirstLoading(true))

    navigate(getRouteBoards(String(project.id)))

    if (close) {
        close();
    }
};

// dispatch(BoardActions.setIsUserBoardsFirstLoading(false))