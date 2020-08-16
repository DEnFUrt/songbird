const initialState = {
  answers: [],                /* список вопросов раунда из rest api */
  pagination: {},             /* список раундов из rest api */  
  roundNumber: 0,             /* номер раунда, игра начинается с 0 */
  correctAnswerId: null,      /* номер правильного ответа, от 1 до 6 */
  currentAnswerId: null,      /* номер выбранного ответа*/
  roundEnded: false,          /* флаг окончания раунда, по умолчанию false*/
  paginationLoading: true,    /* флаг загрузки данных pagination rest api */
  answersLoading: true,       /* флаг загрузки данных answers rest api */
  gameOver: false,            /* флаг окончания игры */
  totalScore: 0,              /* счет игры */
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PAGINATION_LOADED':
      return {
        ...state,
        pagination: action.payload,
        paginationLoading: false,
        errorState: {
          error: false,
          errorMessage: null,
        },
      }

    case 'ANSWERS_LOADED':
      return {
        ...state,
        answers: action.payload,
        answersLoading: false,
        errorState: {
          error: false,
          errorMessage: null,
        },
      };

    case 'PAGINATION_REQUESTED':
      return {
        ...state,
        paginationLoading: true,
        errorState: {
          error: false,
          errorMessage: null,
        },
      };
      
    case 'ANSWERS_REQUESTED':
      return {
        ...state,
        answersLoading: true,
        errorState: {
          error: false,
          errorMessage: null,
        },
      };

    case 'ANSWER_SELECTED': {
      const selectedAnswerId = action.payload;
      let isRoundEnded = false;
      
      switch (state.roundEnded) {
        case false:
          isRoundEnded = selectedAnswerId === state.correctAnswerId ? true : false;    
          break;
        
        case true:
          isRoundEnded = true; 
          break ;

        default:
          isRoundEnded = state.roundEnded;
          break;
      }

      return {
        ...state,
        currentAnswerId: selectedAnswerId,
        roundEnded: isRoundEnded,
      };
    };
  
    case 'ROUND_NEXT': {
      let incRound = ++state.roundNumber;
      let isGameOver = false;
      let isRoundEnded = false;
      
      if (incRound > 5) {
        incRound = -1;
        isGameOver = true;
        isRoundEnded = true;
      }

      return {
        ...state,
        roundEnded: isRoundEnded,
        gameOver: isGameOver,
        roundNumber: incRound,
        currentAnswerId: null,
      }
    };

    case 'SELECT_RANDOM_QUESTION': 
      return {
        ...state,
        correctAnswerId: action.payload,
      }
      
    default:
      return state;
  }
}

export default reducer;
