import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER, REHYDRATE
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";
import videoReducer from "./video/videoSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// ir agregando slicers
const rootReducer = combineReducers({ user: userReducer, video: videoReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  //#region FORMA SIN REDUX-PERSIST(no combinandolos fuera,sino aqui)
  // reducer: { user: userReducer, video: videoReducer },
  //#endregion
  
  //#region FORMA PERSISTIENDO EN EL LOCALSTORAGE EL STORE
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //#endregion
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
