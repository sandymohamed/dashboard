import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import auth from "./auth/authSlice";
import lessons from "./lessons/LessonsSlice";
import profile from "./profile/ProfileSlice";
import reviewQuestions from "./review-questions/reviewSlice";
import notifications from "./notifications/NotificationsSlice";

// const rootPersistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ["lessons", "auth", 'profile', 'reviewQuestions'],
// }

const reviewQuestionsPersistConfig = {
  key: 'reviewQuestions',
  storage,
  whitelist: ["records"],
}

const lessonsPersistConfig = {
  key: 'lessons',
  storage,
  whitelist: ["calendar_lessons"],
}

const profilePersistConfig = {
  key: 'profile',
  storage,
  whitelist: ["user", "statistics"],
}

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ["user"],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  lessons: persistReducer(lessonsPersistConfig, lessons),
  profile: persistReducer(profilePersistConfig, profile),
  reviewQuestions: persistReducer(reviewQuestionsPersistConfig, reviewQuestions),
  notifications
})

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
