import { createSlice } from "@reduxjs/toolkit";

import { TLesson } from "@/validations/LessonSchema";
import { TLoading } from "@/types/shared";
import actGetLessons from "./act/actGetLessons";
import { isString } from "@/types/gurads";

type TLessonsState = {
  lessons: TLesson[];
  count: number;
  next: string | null;
  previous: string | null;
  loading: TLoading;
  error: string | null;

  // Student-specific fields
  subjects?: Record<
    string,
    { missed: number; attended: number; scheduled: number }
  >;
  completion_percentage?: number;

  // Family-specific fields
  students?: Array<
    {
      student_id: number;
      student_name: string;
      subjects: Record<
        string,
        { missed: number; attended: number; scheduled: number }
      >;
      completion_percentage: number;
    }
  >;

  // Admin-specific fields
  missed_stats?: {
    missed_participants: number;
    missed_teachers: number;
  };
  scheduled_stats?: {
    scheduled_participants: number;
    scheduled_teachers: number;
  };
  progressing_lessons?: number;
  ended_lessons?: number;
};

const initialState: TLessonsState = {
  lessons: [],
  count: 0,
  next: null,
  previous: null,
  loading: "idle",
  error: null,
  subjects: {},
  completion_percentage: 0,
  students: [],
  missed_stats: { missed_participants: 0, missed_teachers: 0 },
  scheduled_stats: { scheduled_participants: 0, scheduled_teachers: 0 },
  progressing_lessons: 0,
  ended_lessons: 0,
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetLessons.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetLessons.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.lessons = action.payload.results;
      console.log("action.palyoad", action.payload);
      if ("students" in action.payload) {
        state.students = action.payload.students as Array<
        {
          student_id: number;
          student_name: string;
          subjects: Record<
            string,
            { missed: number; attended: number; scheduled: number }
          >;
          completion_percentage: number;
        }
      >;
    
      }
    });

    builder.addCase(actGetLessons.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export default lessonsSlice.reducer;
