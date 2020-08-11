import React from 'react';
import cl from 'classnames';
import pgnDataItems from '../../paginatorDB';

import s from'./header-block.module.scss';


const HeaderBlock = ({
  roundNumber = 2,    /* номер раунда из store */
  gameOver = false, /* флаг окончания игры из store */
  totalScore = 0,   /* счет игры из store */
}) => {

  const pgnItems = pgnDataItems.map(
    item => (item.id === roundNumber) &&
      (!gameOver) ?
      {...item, isActive: true} :
      {...item, isActive: false}
  );

  return (
    <>
      <Header {...{totalScore}}/>
      <Paginator {...{pgnItems}} />
    </>

  );
}

export default HeaderBlock;

const Header = ({totalScore}) => {
  return (
    <div className={cl(s.header_block, 'd-flex')}>
      <div className={cl(s.header_block__logo)}></div>
      <h4 className={cl('justify-content-end')}>Score: {totalScore}</h4>
    </div>
  )
}

const Paginator = ({pgnItems}) => {
  
  const items = pgnItems.map(item => {
    const {id, title, isActive} = item;
    return(
      <li
        key={id}      
        className={cl(s.pgn_block__item, {[s.active]: isActive}, 'page-item')}
      >
        {title}
      </li>
    )
  });

  return (
      <ul className={cl(s.pgn_block, 'pagination', 'bg-success')}>
        {items}
      </ul>
  )
}
