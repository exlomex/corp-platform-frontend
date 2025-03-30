// import { ThunkConfig } from '@/app/providers/Store/config/StateSchema.ts';
// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {UserSliceActions} from "@/entities/User";
//
// export const RegisterByInvitationKey = createAsyncThunk<
//     registerByEmailReturnedData,
//     registerByEmailInputData,
//     ThunkConfig<string>
// >('user/loginByEmail', async (registerData, thunkApi) => {
//     const { extra, dispatch, rejectWithValue } = thunkApi;
//
//     try {
//         const response = await extra.api.post<registerByEmailReturnedData>('/auth/registration', registerData);
//
//         if (!response.data) {
//             throw new Error();
//         }
//
//         dispatch(UserSliceActions.setAuth(response.data));
//         return response.data;
//     } catch (e) {
//         console.log(e);
//         return rejectWithValue('error');
//     }
// });
