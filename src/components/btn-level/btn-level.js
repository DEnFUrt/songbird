import React from 'react';
import {connect} from 'react-redux';
import {roundNext} from '../../actions';
import cl from 'classnames';

import s from './btn-level.module.scss';

const BtnLevel = ({
  roundEnded,             /* флаг окончания раунда из store */
  btnTitle = 'Дальше',    /* текст кнопки из props */
  roundNext               /* action переход на следующий уровень игры */
}) => {
  
  const onStep = () => {
    if (roundEnded !== true) {
      return
    }
    
    roundNext();
  }

  return (
    <button 
      className={
        cl(s.btn__custom,
        'btn', 
        {'bg-success': roundEnded},
        {[s.btn_disabled]: !roundEnded})
      }
      disabled={!roundEnded}
      onClick={() => onStep()}
    >
      {btnTitle}
    </button>
  )
}

const mapStateToProps = state => {
  return {
    roundEnded: state.roundEnded,
  }
};

const mapDispatchToProps = {
  roundNext,
};

export default (connect(mapStateToProps, mapDispatchToProps)(BtnLevel));