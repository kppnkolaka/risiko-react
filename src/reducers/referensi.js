const initialState = {
  kemungkinan: {
    data: [],
    status: ''
  },
  dampak: {
    data: [],
    status: ''
  },
  notif: {
    type: '',
    title: ''
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

    // case 'FETCH_REFERENSI_FAILED':
    //   return {
    //     ...state,
    //     status: action.err
    //   }

    case 'SUBMIT_REFERENSI_SUCCESS':
      return {
        ...state,
        notif: {
          type: action.data,
          title: 'Berhasil'
        }
      }

      case 'SUBMIT_REFERENSI_FAILED':
      return {
        ...state,
        notif: {
          type: action.err,
          msg: 'Gagal'
        }
      }
    
    default:
      return state;
  }
}