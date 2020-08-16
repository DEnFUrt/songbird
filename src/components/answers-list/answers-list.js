import React, {useEffect} from 'react';
import Answer from '../answer';
import {connect} from 'react-redux';
import {answersLoaded, answersRequested, dataError} from '../../actions';
import WithRestService from '../hoc';
import cl from 'classnames';

import s from './answers-list.module.scss';

const AnswersList = ({
  answers,            /* список вопросов раунда из store */
  roundNumber,        /* номер раунда из store */
  loading,            /* флаг загрузки данных rest api */
  errorState,
  RestService,        /* api сервиса получения данных из DB JSON */
  answersRequested,   /* процесс загрузки данных */
  answersLoaded,      /* сохранение вопросов раунда в store */
  dataError
}) => {

  useEffect(() => {
    answersRequested();
    RestService.getAnswers(roundNumber)
      .then(res => {
        answersLoaded(res);
      })
      .catch(err => dataError(err.message));
  },
    [RestService, answersLoaded, answersRequested, dataError, roundNumber]
  );

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
      {/* <Lists {...{answerView}} />  */}
    </div>
  )
};

const mapStateToProps = state => {
  return {
    answers: state.answers,
    loading: state.answersLoading,
    errorState: state.errorState,
    roundNumber: state.roundNumber,        
  }
};

const mapDispatchToProps = {
  answersLoaded,
  answersRequested,
  dataError,
};

export default WithRestService()(connect(mapStateToProps, mapDispatchToProps)(AnswersList));

const Lists = ({answerView}) => {
  return (
    <ul className={cl(s.list_custom, 'list-group', 'bg-dark')}>
      {answerView}
    </ul>
  )
};