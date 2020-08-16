const paginationLoaded = (newPagination) => {
  return {
    type: 'PAGINATION_LOADED',
    payload: newPagination,
  }
};

const answersLoaded = (newAnswers) => {
  return {
    type: 'ANSWERS_LOADED',
    payload: newAnswers,
  }
};

const paginationRequested = () => {
  return {
    type: 'PAGINATION_REQUESTED',
  }
};

const answersRequested = () => {
  return {
    type: 'ANSWERS_REQUESTED',
  }
};

const roundNext = () => {
  return {
    type: 'ROUND_NEXT',
  }
};

const answerSelected = (newСurrentAnswerId) => {
  return {
    type: 'ANSWER_SELECTED',
    payload: newСurrentAnswerId,
  }
};

const selectRandomQuestion = (newCorrectAnswerId) => {
  return {
    type: 'SELECT_RANDOM_QUESTION',
    payload: newCorrectAnswerId,
  }
};

export {
  paginationLoaded,
  answersLoaded,
  paginationRequested,
  answersRequested,
  roundNext,
  answerSelected, 
  selectRandomQuestion, 
}