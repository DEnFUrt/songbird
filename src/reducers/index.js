const initialState = {
  answers: [],                /* список вопросов раунда из rest api */
  pagination: {},             /* список раундов из rest api */  
  roundNumber: 0,             /* номер раунда, игра начинается с 0 */
  correctAnswerId: null,      /* номер правильного ответа, от 1 до 6 включительно */
  currentAnswerId: null,      /* номер выбранного ответа */
  roundEnded: false,          /* флаг окончания раунда, по умолчанию false*/
  paginationLoading: true,    /* флаг загрузки данных pagination rest api */
  answersLoading: true,       /* флаг загрузки данных answers rest api */
  gameOver: false,            /* флаг окончания игры */
  totalScore: 0,              /* счет игры */
  currentScore: 5,            /* текущий счет раунда, начинается с 5 баллов */
  openingAnswers: [],         /* отмеченные вопросы текущего раунда */
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PAGINATION_LOADED':
      return {
        ...state,
        pagination: action.payload,
        paginationLoading: false,
      }

    case 'ANSWERS_LOADED':
      return {
        ...state,
        answers: action.payload,
        answersLoading: false,
      };

    case 'PAGINATION_REQUESTED':
      return {
        ...state,
        paginationLoading: true,
      };
      
    case 'ANSWERS_REQUESTED':
      return {
        ...state,
        answersLoading: true,
      };

    case 'ANSWER_SELECTED': {
      const selectAnswerId = action.payload;
      let isRoundEnded = state.roundEnded; 
      let tempTotalScore = state.totalScore;
      let tempCurrentScore = state.currentScore;
      let tempOpeningAnswers = [];
      
      if (!state.openingAnswers.includes(selectAnswerId)) {
        tempOpeningAnswers = [...state.openingAnswers, selectAnswerId];

        switch (isRoundEnded) {
          case false:
            
            if (selectAnswerId === state.correctAnswerId) {
              isRoundEnded = true;
              tempTotalScore += tempCurrentScore; 
            } else {
              tempCurrentScore -= 1;
            }

            break;
          
          default:
            break;
        }

      } else {
        tempOpeningAnswers = [...state.openingAnswers];
      }

      return {
        ...state,
        currentAnswerId: selectAnswerId,
        roundEnded: isRoundEnded,
        openingAnswers: tempOpeningAnswers,
        totalScore: tempTotalScore,
        currentScore: tempCurrentScore,
      };
    };

    case 'ROUND_NEXT': {
      const incRound = state.roundNumber < 6 ? state.roundNumber + 1 : 0;
      const isGameOver = incRound < 6 ? false : true;
      const isRoundEnded = incRound < 6 ? false : true;
      
      const tempTotalScore = (incRound > 0 && incRound <= 6)  ? state.totalScore : 0;
      
      return {
        ...state,
        roundEnded: isRoundEnded,
        gameOver: isGameOver,
        roundNumber: incRound,
        currentAnswerId: null,
        currentScore: 5,
        openingAnswers: [],
        totalScore: tempTotalScore,
      }
    };

    case 'SELECT_RANDOM_QUESTION': 
      return {
        ...state,
        correctAnswerId: action.payload,
      };
 
    default:
      return state;
  }
}

export default reducer;
