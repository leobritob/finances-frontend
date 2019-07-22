import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions(
  {
    setId: ["id"],
    setFirstName: ["first_name"],
    setLastName: ["last_name"],
    setEmail: ["email"],
    setToken: ["token"],
    logout: null
  },
  {
    prefix: "USER/"
  }
);

export const UserTypes = Types;
export default Creators;

const INITIAL_STATE = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  token: ""
};

const setId = (state = INITIAL_STATE, { id }) => ({
  ...state,
  id
});

const setFirstName = (state = INITIAL_STATE, { first_name }) => ({
  ...state,
  first_name
});

const setLastName = (state = INITIAL_STATE, { last_name }) => ({
  ...state,
  last_name
});

const setEmail = (state = INITIAL_STATE, { email }) => ({
  ...state,
  email
});

const setToken = (state = INITIAL_STATE, { token }) => ({
  ...state,
  token
});

const logout = (state = INITIAL_STATE) => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ID]: setId,
  [Types.SET_FIRST_NAME]: setFirstName,
  [Types.SET_LAST_NAME]: setLastName,
  [Types.SET_EMAIL]: setEmail,
  [Types.SET_TOKEN]: setToken,
  [Types.LOGOUT]: logout
});
