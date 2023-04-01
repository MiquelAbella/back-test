export const todosReducer = (state, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return [...action.payload];
    case "ADD_TODO":
      return [...state, action.payload];
    case "DELETE_TODO":
      return action.payload;
    case "UPDATE_TODO":
      return action.payload;
    default:
      return state;
  }
};
