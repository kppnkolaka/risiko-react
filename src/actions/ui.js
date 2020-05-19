export const ToggleSidebar = (data) => dispatch => {
  dispatch({
    type: 'TOGGLE_SIDEBAR_SUCCESS',
    data
  });
}