const paginationLoaded = (newPagination) => {
  return {
    type: 'PAGINATION_LOADED',
    payload: newPagination,
  }
}

const answersLoaded = (newAnswers) => {
  return {
    type: 'ANSWERS_LOADED',
    payload: newAnswers,
  }
}

const paginationRequested = () => {
  return {
    type: 'PAGINATION_REQUESTED',
  }
}

const answersRequested = () => {
  return {
    type: 'ANSWERS_REQUESTED',
  }
}

const dataError = (newMessage) => {
  return {
    type: 'DATA_ERROR',
    errorMessage: newMessage,
  }
}

const roundNext = () => {
  return {
    type: 'ROUND_NEXT',
  }
}

const answerSelected = (newСurrentAnswerId) => {
  return {
    type: 'ANSWER_SELECTED',
    payload: newСurrentAnswerId,
  }
}

export {
  paginationLoaded,
  answersLoaded,
  paginationRequested,
  answersRequested,
  dataError,
  roundNext,
  answerSelected,  
}