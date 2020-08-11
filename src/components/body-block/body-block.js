import React from 'react';
import QuestionBlock from '../question-block';
import BtnLevel from '../btn-level';
import GameBlock from '../game-block';
import GameOver from '../game-over';

const BodyBlock = ({
  gameOver = false, /* флаг окончания игры из store */
}) => {
  
  return gameOver ? <GameOver /> : <ViewGame /> 
};

export default BodyBlock;

const ViewGame = () => {
  return (
    <>
      <QuestionBlock />
      <GameBlock />
      <BtnLevel />
    </>
  )
}