import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    setIsVisible: ['is_visible'],
    isVisibleToggle: null
  },
  {
    prefix: 'DRAWER/'
  }
);

export const DrawerTypes = Types;
export default Creators;

const INITIAL_STATE = {
  is_visible: false
};

const setIsVisible = (state = INITIAL_STATE, { is_visible }) => ({
  ...state,
  is_visible
});

const isVisibleToggle = (state = INITIAL_STATE) => ({
  ...state,
  is_visible: !state.is_visible
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_IS_VISIBLE]: setIsVisible,
  [Types.IS_VISIBLE_TOGGLE]: isVisibleToggle
});
