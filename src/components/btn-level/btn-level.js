import React from 'react';
import cl from 'classnames';

import s from './btn-level.module.scss';

const BtnLevel = ({
  roundNumber = 2,        /* номер раунда из store */
  correctAnswer = 2,      /* номер правильного ответа из store */
  roundEnded = false,     /* флаг окончания раунда из store */
  btnTitle = 'Next Level' /* текст кнопки из props */
}) => {
  
  const onStep = () => {

    if (roundEnded !== true) {
      return
    }
    return console.log('########### Click Next');
  }

  return (
    <button 
      className={cl(s.btn__custom, 'btn', {'bg-success': roundEnded}, {[s.btn_disabled]: !roundEnded})}
      
      disabled={!roundEnded}
      onClick={() => onStep()}
    >
      {btnTitle}
    </button>
  )
}

export default BtnLevel;