import React from 'react';
import QuestionBlock from '../question-block';
import BtnLevel from '../btn-level';
import GameBlock from '../game-block';
import GameOver from '../game-over';
import {connect} from 'react-redux';

const BodyBlock = ({
  gameOver, /* флаг окончания игры из store */
}) => {
  
  return gameOver ? <GameOver /> : <ViewGame /> 
};

const mapStateToProps = state => {
  return {
    gameOver: state.gameOver,
  }
};

export default (connect(mapStateToProps)(BodyBlock));

const ViewGame = () => {
  return (
    <>
      <QuestionBlock />
      <GameBlock />
      <BtnLevel />
    </>
  )
}