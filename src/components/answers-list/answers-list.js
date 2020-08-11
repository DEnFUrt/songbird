import React from 'react';
import Answer from '../answer';
import cl from 'classnames';

import birdsData from '../../birdDB';

import s from './answers-list.module.scss';

const AnswersList = ({
    // answers, /* список вопросов из store */
    roundNumber = 2,        /* номер раунда из store */
}) => {

  const answers = birdsData[roundNumber];

  const answerView = answers.map(answer => {
    return <Answer key={answer.id} answer={answer} />
  });

  return (
    <div className="col-md-6">
      <Lists {...{answerView}} /> 
    </div>
  )
};

export default AnswersList;

const Lists = ({answerView}) => {
  return (
    <ul className={cl(s.list_custom, 'list-group', 'bg-dark')}>
      {answerView}
    </ul>
  )
};