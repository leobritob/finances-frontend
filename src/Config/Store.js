import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import rootSaga from "Sagas";
import rootReducer from "Redux/index";

const persistConfig = {
  timeout: 15000,
  key: "FinancesApp",
  storage,
  blacklist: ["router", "drawer"]
};

/**
 * BROWSER HISTORY
 */
export const history = createBrowserHistory();

/**
 * REDUX COMPOSE
 */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * REDUX SAGA
 */
let middlewareArgs = [];
const sagaMiddleware = createSagaMiddleware();
middlewareArgs.push(sagaMiddleware);
middlewareArgs.push(routerMiddleware(history));

/**
 * REDUX PERSIST
 */
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

/**
 * CONFIGURE REDUX STORE
 */
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(...middlewareArgs)));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

/**
 * CLEAN REDUX PERSIST
 */
// persistor.purge();

export { store, persistor };
