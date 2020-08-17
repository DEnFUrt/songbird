import React from 'react';
import AnswersList from '../answers-list';
import DescriptionBlock from '../description-block';

const GameBlock = () => {
  return (
    <div className="row">
      <AnswersList />
      <DescriptionBlock />
    </div>   
    
  )
}

export default GameBlock;