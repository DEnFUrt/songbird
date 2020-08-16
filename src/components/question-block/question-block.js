import React from 'react';
import Player from '../player';
import Spinner from '../spinner';
import ViewImage from '../view-image';
import {connect} from 'react-redux';
import cl from 'classnames';

import s from './question-block.module.scss';
import imgDefault from './bird.png';

const QuestionBlock = ({
  answers,              /* список вопросов раунда из store */
  correctAnswerId,      /* номер правильного ответа из store */
  roundEnded,           /* флаг окончания раунда из store */
  loading,              /* флаг загрузки данных из store */
}) => {
  
  const correctAnswer = {
    ...answers.filter(item => item.id === correctAnswerId)
    .reduce((acc, item) => ({...acc, ...item}), {})
  }; 

  const title = roundEnded ? 
    `${correctAnswer.name} (${correctAnswer.species})` :
    '********';
  
  const imgSrc = roundEnded ?
    correctAnswer.image : imgDefault;

  const audioSrc = !roundEnded ?
    correctAnswer.audio : null;

  return <ViewQuestion {...{imgSrc, title, audioSrc, loading, roundEnded}}/>
};

const mapStateToProps = state => {
  return {
    answers: state.answers,
    loading: state.answersLoading,
    correctAnswerId: state.correctAnswerId,
    roundEnded: state.roundEnded, 
  }
};

export default (connect(mapStateToProps)(QuestionBlock));

const ViewQuestion = ({imgSrc, title, audioSrc, loading, roundEnded}) => {
  const clName = ['align-self-center', 'mr-3'];

  return (
    <div className={cl(s.question_block, 'media', 'rounded-lg', 'bg-dark')}>
      <ViewImage {...{imgSrc, title, clName}} />
      <div className={cl(s.question_block__body, 'media-body')}>
        <ViewTitle {...{loading, title}} />
        <hr className={cl(s.question_block__hr, 'my-2')} />
        <Player src={audioSrc} roundEnded={roundEnded} />
      </div>
    </div>
  )
};

const ViewTitle = ({ loading, title }) => {
  return loading ?
    <Spinner /> :
    <h5 className={cl('display-5')}>{title}</h5>;
};

