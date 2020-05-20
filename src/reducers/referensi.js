const initialState = {
  kemungkinan: {
    data: [],
    status: ''
  }, 
  dampak: {
    data: [],
    status: ''
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'FETCH_REFERENSI_SUCCESS':
      return {
        ...state,
        kemungkinan: action.data[0],
        dampak: action.data[1]
      }

    case 'FETCH_REFERENSI_FAILED':
      return {
        ...state,
        status: action.err
      }

    default:
      return state;
  }
}