const initial_state = {
  user : {}
};
export function user_reducer(state = initial_state, action) {
  switch (action.type) {
    case "add_user":
      return {
        ...state , user : {...state.user , user_id : "6602b318a0fb7c8a522ee83a"}
      };
    default:
      return state;
  }
}
