const initialState = {
  birdItems: [],
  loading: true,
  errorState: {
    error: false,
    errorMessage: null,
  },
  birdRandom: [],

}

// const findItem = (arr, id) => arr.find(data => data.id === id);
// const getCost = (arr) => arr.reduce((acc, item) => acc + (+item.price * +item.count), 0);

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'MENU_LOADED':
      return {
        ...state,
        birdItems: action.payload,
        loading: false,
        errorState: {
          error: false,
          errorMessage: null,
        },
      };

    case 'MENU_REQUESTED':
        return {
          ...state,
          loading: true,
          errorState: {
            error: false,
            errorMessage: null,
          },
        };  
  
    case 'MENU_ERROR':
      return {
        ...state,
        loading: false,
        errorState: {
          error: true,
          errorMessage: action.errorMessage,
        },
      };
      
    default:
      return state;
  }
}

export default reducer;
