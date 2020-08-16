import React from 'react';
import Player from '../player';
import Spinner from '../spinner';
import ViewImage from '../view-image';
import {connect} from 'react-redux';
import {answersRequested, dataError} from '../../actions';
import WithRestService from '../hoc';
import cl from 'classnames';

import s from './question-block.module.scss';
import imgDefault from './bird.png';

const QuestionBlock = ({
  /* randomAnswer, */   /*  */ 
  roundNumber = 2,    /* номер раунда из store */
  correctAnswer = 2,  /* номер правильного ответа из store */
  roundEnded = false, /* флаг окончания раунда из store */
  loading = false,    /* флаг загрузки данных из store */
  RestService,        /* api сервиса получения данных из DB JSON */
}) => {
  
  

  const randomAnswer = {
    ...RestService.birds[roundNumber].filter(item => item.id === correctAnswer)
    .reduce((acc, item) => ({...acc, ...item}), {})
  };
  
  const title = roundEnded ? 
    `${randomAnswer.name} (${randomAnswer.species})` :
    '********';
  
  const imgSrc = roundEnded ?
    randomAnswer.image : imgDefault;

  const audioSrc = !roundEnded ?
    randomAnswer.audio : null;

  console.log('Правильный ответ - ', correctAnswer);

  return <ViewQuestion {...{imgSrc, title, audioSrc, loading}}/>
};

const mapStateToProps = state => {
  return {
    pagination: state.pagination,
    loading: state.loading,
    errorState: state.errorState,
    roundNumber: state.roundNumber,        
    gameOver: state.gameOver,           
    totalScore: state.totalScore,
  }
};

const mapDispatchToProps = {

  answersRequested,
  dataError,
};

export default WithRestService()(connect(mapStateToProps, mapDispatchToProps)(QuestionBlock));

const ViewQuestion = ({imgSrc, title, audioSrc, loading}) => {
  
  const clName = ['align-self-center', 'mr-3'];

  return (
    <div className={cl(s.question_block, 'media', 'rounded-lg', 'bg-dark')}>
      <ViewImage {...{imgSrc, title, clName}} />
      <div className={cl(s.question_block__body, 'media-body')}>
        <ViewTitle {...{loading, title}} />
        <hr className={cl(s.question_block__hr, 'my-2')} />
        <Player src={audioSrc} />
      </div>
    </div>
  )
};

const ViewTitle = ({ loading, title }) => {
  return loading ?
    <Spinner /> :
    <h5 className={cl('display-5')}>{title}</h5>;
};

