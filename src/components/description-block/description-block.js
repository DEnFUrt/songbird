import React from 'react';
import Spinner from '../spinner';
import ViewImage from '../view-image';
import Player from '../player';
import {connect} from 'react-redux';
import cl from 'classnames';

import s from './description-block.module.scss';

const DescriptionBlock = ({
  answers,            /* список вопросов раунда из store */
  currentAnswerId,    /* номер текущего вопроса из store, по умолчанию null*/
  roundEnded,         /* флаг окончания раунда из store */
  loading,            /* флаг загрузки данных из store */
}) => {

  const computeCurrentAnswer = () => {
    if (answers.length === 0) {
      return null
    }

    return {
      ...answers.filter(item => item.id === currentAnswerId)
      .reduce((acc, item) => ({...acc, ...item}), {})
    };
  };

  const setDataDescription = () => {
    const currentAnswer = computeCurrentAnswer();
    
    if (currentAnswer !== null) {
      return {
          titleRus: currentAnswer.name,
          titleLat: currentAnswer.species,
          imgSrc: currentAnswer.image,
          text: currentAnswer.description,
          audioSrc: roundEnded ?
                    currentAnswer.audio :
                    null
        }
    }
  };

  if (loading) {
    return (
      <div className="col-md-6">
        <div className={cl(s.card, 'card', 'bg-dark', 'd-flex')} >
          <ViewSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="col-md-6">
      <div className={cl(s.card, 'card', 'bg-dark', 'd-flex')} >
        { currentAnswerId === null ? <ViewInvitation /> : <ViewDescription dataDescription={setDataDescription()} /> }
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    answers: state.answers,
    loading: state.answersLoading,
    roundEnded: state.roundEnded,
    currentAnswerId: state.currentAnswerId,        
  }
};

export default (connect(mapStateToProps)(DescriptionBlock));

const ViewDescription = ({dataDescription}) => {
  
  const {titleRus, titleLat, imgSrc, text, audioSrc} = dataDescription;
  const clName = ['card-img', 'mr-4'];

  return (
    <>
      <div className={cl(s.card_body, 'card-body', 'd-inline-flex')}>
        <div className={cl(s.card_body__wrapper, 'row')}>
          <ViewImage {...{imgSrc, title: titleRus, clName}} />
          <ul className={cl(s.card_lists,'list-group', 'list-group-flush')}>
            <li className={cl(s.card_list, 'list-group-item', 'border-top-0')}>
              <h5>{titleRus}</h5>
            </li>
            <li className={cl(s.card_list, 'list-group-item', 'border-top', 'border-secondary')}>
              <span>{titleLat}</span>
            </li>
            <li className={cl(s.card_list, 'list-group-item', 'border-top', 'border-secondary')}>
              <div><Player src={audioSrc} /></div>
            </li>
          </ul>
        </div>
      </div>
      <div className={cl(s.card_text, 'd-flex')}>{text}</div>
    </>
  )

};

const ViewInvitation = () => {
  return (
    <div className={cl(s.text_wrap)}>
      <span>
        Прослушайте запись голоса птицы и выберите название птицы из списка вариантов ответа
      </span>
    </div>
  )
};

const ViewSpinner = () => {
  return (
    <div className={cl(s.text_wrap)}>
      <Spinner />
    </div>
  )
};