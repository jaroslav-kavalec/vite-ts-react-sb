import {
  AnyAction,
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import { createEpicMiddleware, Epic, ofType } from "redux-observable";
import { filter, map, delay } from "rxjs/operators";

export const counter = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
    decrement: (state, action: PayloadAction<number>) => state - action.payload
  }
});

const reducer = combineReducers({
  counter: counter.reducer
});

export type MyState = ReturnType<typeof reducer>;

export type MyEpic = Epic<AnyAction, AnyAction, MyState>;

const countEpic: MyEpic = action$ =>
  action$.pipe(
    ofType(counter.actions.increment.type),
    delay(500),
    map(action => counter.actions.decrement(action.payload))
  );

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, MyState>();

export const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false // or true if you want to use thunks
    }),
    epicMiddleware
  ]
});

epicMiddleware.run(countEpic);
