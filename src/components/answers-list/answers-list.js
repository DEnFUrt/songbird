import React, {useEffect} from 'react';
import Answer from '../answer';
import {connect} from 'react-redux';
import {answersLoaded, answersRequested, selectRandomQuestion} from '../../actions';
import WithRestService from '../hoc';
import {getRandomIntInclusive} from '../../services/random-service';
import cl from 'classnames';

import s from './answers-list.module.scss';

const AnswersList = ({
  answers,                /* список вопросов раунда из store */
  roundNumber,            /* номер раунда из store */
  correctAnswerId,        /* номер правильного ответа из store */
  RestService,            /* api сервиса получения данных из DB JSON */
  answersRequested,       /* процесс загрузки данных */
  answersLoaded,          /* сохранение вопросов раунда в store */
  selectRandomQuestion    /* выбор случайного вопроса */
}) => {

  useEffect(() => {
    answersRequested();
    RestService.getAnswers(roundNumber)
      .then(res => answersLoaded(res))
  },
    [RestService, answersLoaded, answersRequested, roundNumber]
  );

  useEffect(() => {
    const randomId = getRandomIntInclusive(1, 6, correctAnswerId);
    
    console.log(`Правильный ответ ${roundNumber + 1} раунда - ${randomId}`);
    selectRandomQuestion(randomId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundNumber, selectRandomQuestion]);

  const computeAnswerView = (answers) => {
    if (answers.length === 0) {
      return null
    }

    return answers.map(answer => {
      return <Answer key={answer.id} answer={answer} />
    });
  };

  return (
    <div className="col-md-6">
      <Lists answerView={computeAnswerView(answers)} />
    </div>
  )
};

const mapStateToProps = state => {
  return {
    answers: state.answers,
    loading: state.answersLoading,
    roundNumber: state.roundNumber,
    correctAnswerId: state.correctAnswerId,        
  }
};

const mapDispatchToProps = {
  answersLoaded,
  answersRequested,
  selectRandomQuestion,
};

export default WithRestService()(connect(mapStateToProps, mapDispatchToProps)(AnswersList));

const Lists = ({answerView}) => {
  return (
    <ul className={cl(s.list_custom, 'list-group', 'bg-dark')}>
      {answerView}
    </ul>
  )
};