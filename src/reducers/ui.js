const initialState = {
  sider: {
    visible: false
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type){
    case 'TOGGLE_SIDEBAR_SUCCESS':
      return { ...state, sider: {visible: action.data} }
    default:
      return state;
  }
}