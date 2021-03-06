const initialState = {
  raw: [],
  data: [],
  notif: {
    type: '',
    title: ''
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'FETCH_RISIKO_SUCCESS':
      return {
        ...state,
        data: action.data.data,
        raw: action.data.raw
      }

    default:
      return state
  }
}