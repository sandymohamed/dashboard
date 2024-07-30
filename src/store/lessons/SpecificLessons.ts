// import { createSlice } from "@reduxjs/toolkit";
// import actGetLessons from "./act/actGetLessons";
// import { TLoading } from "@/types/shared";
// import { TLesson } from "@/validations/LessonSchema";
// import { isString } from "@/types/gurads";

// type TSpecificLessonsState = {
//   loading: TLoading;
//   records: TLesson[];
//   error: string | null;
// };


// const initialState: TSpecificLessonsState = {
//   loading: "idle",
//   records: [],
//   error: null,
// };

// const specificLessonsSlice = createSlice({
//   name: "spec_lessons",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     builder.addCase(actGetLessons.pending, (state) => {
//       state.loading = "pending";
//       state.error = null;
//     });

//     builder.addCase(actGetLessons.fulfilled, (state, action) => {
//       state.loading = "succeeded";
//       state.records = action.payload;
//     });

//     builder.addCase(actGetLessons.rejected, (state, action) => {
//       state.loading = "failed";
//       if (isString(action.payload)) {
//         state.error = action.payload;
//       }
//     });
//   },
// });

// export default specificLessonsSlice.reducer;
