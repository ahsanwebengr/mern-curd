import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from './user.service';

const initialState = {
    getAllUsers: {
        isError: false,
        isLoading: false,
    },
    updateUser: {
        isError: false,
        isLoading: false,
    },
    createUser: {
        isError: false,
        isLoading: false,
    },
    deleteUser: {
        isError: false,
        isLoading: false,
    },
    getSingleUser: {
        isError: false,
        isLoading: false,
    },
};

// All Users Data 
export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async ({ successCallBack }, thunkAPI) => {
        try {
            const response = await userService.getAllUsers();
            if (response) {
                successCallBack(response);
                return response?.data;
            }
            return thunkAPI.rejectWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue({ payload: error });
        }
    }
);

// Create new Users Data 
export const createUser = createAsyncThunk(
    'user/createUser',
    async ({ payload, successCallBack }, thunkAPI) => {
        try {
            const response = await userService.createUser(payload);
            if (response) {
                successCallBack(response);
                return response?.data;
            }
            return thunkAPI.rejectWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue({ payload: error });
        }
    }
);

// Update User Data 
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ id, payload, successCallBack }, thunkAPI) => {
        try {
            const response = await userService.updateUser(id, payload);
            if (response) {
                successCallBack(response);
                return response?.data;
            }
            return thunkAPI.rejectWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue({ payload: error });
        }
    }
);

// Delete User Data 
export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async ({ id, successCallBack }, thunkAPI) => {
        try {
            const response = await userService.deleteUser(id);
            if (response) {
                successCallBack(response);
                return response?.data;
            }
            return thunkAPI.rejectWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue({ payload: error });
        }
    }
);

// Get Single User Data
export const getSingleUser = createAsyncThunk(
    'user/getSingleUser',
    async ({ id, successCallBack }, thunkAPI) => {
        try {
            const response = await userService.getSingleUser(id);
            if (response) {
                successCallBack(response);
                return response?.data;
            }
            return thunkAPI.rejectWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue({ payload: error });
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.getAllUsers.isLoading = true;
                state.getAllUsers.isError = false;
            })
            .addCase(getAllUsers.fulfilled, (state) => {
                state.getAllUsers.isLoading = false;
                state.getAllUsers.isSuccess = true;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.getAllUsers.isLoading = false;
                state.getAllUsers.isError = true;
            })
            .addCase(createUser.pending, (state) => {
                state.createUser.isLoading = true;
                state.createUser.isError = false;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.createUser.isError = false;
                state.createUser.isLoading = false;
            })
            .addCase(createUser.rejected, (state) => {
                state.createUser.isLoading = false;
                state.createUser.isError = true;
            })
            .addCase(deleteUser.pending, (state) => {
                state.deleteUser.isLoading = true;
                state.deleteUser.isError = false;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.deleteUser.isLoading = false;
                state.deleteUser.isError = false;
            })
            .addCase(deleteUser.rejected, (state) => {
                state.deleteUser.isLoading = false;
                state.deleteUser.isError = true;
            })
            .addCase(getSingleUser.pending, (state) => {
                state.getSingleUser.isLoading = true;
                state.getSingleUser.isError = false;

            })
            .addCase(getSingleUser.fulfilled, (state) => {
                state.getSingleUser.isLoading = false;
                state.getSingleUser.isError = true;
            })
            .addCase(getSingleUser.rejected, (state) => {
                state.getSingleUser.isLoading = false;
                state.getSingleUser.isError = true;
            })
            .addCase(updateUser.pending, (state) => {
                state.updateUser.isLoading = true;
                state.updateUser.isError = false;

            })
            .addCase(updateUser.fulfilled, (state) => {
                state.updateUser.isLoading = false;
                state.updateUser.isError = true;
            })
            .addCase(updateUser.rejected, (state) => {
                state.updateUser.isLoading = false;
                state.updateUser.isError = true;
            });

    }
});

export default userSlice.reducer;