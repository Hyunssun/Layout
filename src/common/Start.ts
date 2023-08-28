const SET_START = "SET_START";

export const setStart = (start: boolean) => ({
  type: SET_START,
  payload: start,
});

const initialState: boolean | null = false;

export const start = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case SET_START:
      return action.payload;
    default:
      return state;
  }
};
