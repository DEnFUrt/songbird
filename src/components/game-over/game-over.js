import React from 'react';
import BtnLevel from '../btn-level';
import {connect} from 'react-redux';
import vikorySong from '../../media/victory.mp3';
import cl from 'classnames';

import s from './game-over.module.scss';
import imgBirding from './birdV.png';

const GameOver = ({
  totalScore,   /* счет игры из store */
}) => {

  const btnTitle = 'Хотите попробовать еще раз?';
  
  return (
    <div className={cl(s.gameOver_block, 'media', 'rounded-lg', 'bg-dark')}>
      <div className={cl(s.gameOver_block__body, 'media-body')}>
        <p className={cl('lead')}>Поздравляем!</p>
        <p className={cl('lead')}>Вы прошли викторину и набрали {totalScore} из 30 возможных баллов</p>
        <hr className={cl(s.gameOver_block__hr, 'my-4')} />
        {totalScore < 30 ? <BtnLevel {...{btnTitle}} /> : <Сongratulation {...{vikorySong}} /> }
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    totalScore: state.totalScore,
  }
};

export default (connect(mapStateToProps)(GameOver));

const Сongratulation = ({vikorySong}) => {
  return (
    <div className={cl('media', 'mt-3', 'd-flex')}>
      <img src={imgBirding} className={cl('align-self-start')} alt="birding" />
      <div className={cl(s.bird, 'media-body')}>
        <p className={cl('lead')}>Вы показали себя настоящим знатоком голосов птиц.</p>
        <p className={cl('lead')}>Возможно вы увлекаетесь бёрдвотчингом и уже далеко продвинулись в своём хобби.
            Если же этот термин вам еще незнаком, вы можете узнать об этом популярном увлечении
            <a href="https://meduza.io/cards/kak-stat-berdvotcherom"> из статьи Медузы (&copy;)</a></p>
      </div>
      <audio src={vikorySong} autoPlay="autoplay" className={cl('d-none')}></audio>
    </div>
  )
}