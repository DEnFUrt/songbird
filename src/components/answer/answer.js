import React, {useState, useEffect} from 'react';
import Spinner from '../spinner';
import {connect} from 'react-redux';
import {answerSelected, dataError} from '../../actions';
import cl from 'classnames';

import s from './answer.module.scss';

const Answer = ({
  answer,            /* вопрос из AnswersList */
  correctAnswer,     /* номер правильного ответа из store */
  roundEnded,        /* флаг окончания раунда из store */
  loading,           /* флаг загрузки данных из store */
  answerSelected,
}) => {
  
  const [guessWho, setQuessWho] = useState(null);
  const {id, name} = answer;
  
  useEffect(() => {
    setQuessWho(null);
  }, [answer]);

  const computeQuessWho = (id) => {
    answerSelected(id);

    if (roundEnded) {
      return
    };

    id === correctAnswer ?
    setQuessWho(true) :
    setQuessWho(false);
  };

  const clName = cl(s.dot, {'bg-secondary': guessWho === null},
    {'bg-success': guessWho === true},
    {'bg-danger': guessWho === false },
    'rounded-circle', 'd-inline-block');

  return loading ?
      <ViewSpinner /> :  
      <ViewAnswer {...{computeQuessWho, clName, name, id}} />
};

const mapStateToProps = state => {
  return {
    loading: state.answersLoading,
    errorState: state.errorState,
    roundNumber: state.roundNumber,
    correctAnswer: state.correctAnswer,
    roundEnded: state.roundEnded,        
  }
};

const mapDispatchToProps = {
  answerSelected,
  dataError,
};

export default (connect(mapStateToProps, mapDispatchToProps)(Answer));

const ViewAnswer = ({computeQuessWho, clName, name, id}) => {
  return (
    <li className={cl(s.answer, 'list-group-item')}
      onClick={() => computeQuessWho(id)}
    >
      <span className={clName}></span>
      {name}
    </li>
  )
};

const ViewSpinner = () => {
  return (
    <li className={cl(s.answer, 'list-group-item')}>
      <Spinner />
    </li>
  )
};
