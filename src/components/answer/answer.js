import React, {useState} from 'react';
import Spinner from '../spinner';
import cl from 'classnames';

import s from './answer.module.scss';

const Answer = ({
  answer,            /* вопрос из AnswersList */
  correctAnswer = 3, /* номер правильного ответа из store */
  roundEnded = false, /* флаг окончания раунда из store */
  loading = false     /* флаг загрузки данных из store */
}) => {
  
  const {id, name} = answer;
  
  const [guessWho, setQuessWho] = useState(null);

  const computeQuessWho = () => {
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
      <ViewAnswer {...{computeQuessWho, clName, name}} />
};

export default Answer;

const ViewAnswer = ({computeQuessWho, clName, name}) => {
  return (
    <li className={cl(s.answer, 'list-group-item')}
      onClick={() => computeQuessWho()}
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
