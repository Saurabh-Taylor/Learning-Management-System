import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast  from 'react-hot-toast';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/course");
        if (response.status === 200) {
            toast.success("Courses fetched successfully");
            return response.data.courses;
        } else {
            return rejectWithValue('Failed to fetch courses');
        }
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const courseSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        status: 'idle',
        error: null
    },
    reducers: {
        // Define your reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default courseSlice.reducer;
