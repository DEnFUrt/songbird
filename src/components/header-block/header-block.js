import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {paginationLoaded, paginationRequested, dataError} from '../../actions';
import WithRestService from '../hoc';
import cl from 'classnames';

import s from'./header-block.module.scss';


const HeaderBlock = ({
  pagination,               /* список раундов из store */ 
  roundNumber,              /* номер раунда из store */
  gameOver,                 /* флаг окончания игры из store */
  totalScore,               /* счет игры из store */
  loading,                  /* флаг загрузки данных rest api */
  RestService,              /* api сервиса получения данных из DB JSON */
  paginationRequested,      /* процесс загрузки данных */
  paginationLoaded,         /*  */
  dataError
}) => {

  const computePgnItems = (items) => {
    if (Object.keys(items).length === 0) {
      return null
    }

    return items.map(
      item => (item.id === roundNumber) &&
        (!gameOver) ?
        {...item, isActive: true} :
        {...item, isActive: false}
    );
  }

  useEffect(() => {
    paginationRequested();
    RestService.getPagination()
      .then(res => {
        paginationLoaded(res);
      })
      .catch(err => dataError(err.message));
    },
    [RestService, dataError, paginationRequested, paginationLoaded]
  ); 

  return (
    <>
      <Header {...{totalScore}}/>
      { !loading ? <Pagination pgnItems={computePgnItems(pagination)} /> : null }
    </>

  );
};

const mapStateToProps = state => {
  return {
    pagination: state.pagination,
    loading: state.paginationLoading,
    errorState: state.errorState,
    roundNumber: state.roundNumber,        
    gameOver: state.gameOver,           
    totalScore: state.totalScore,
  }
};

const mapDispatchToProps = {
  paginationLoaded,
  paginationRequested,
  dataError,
};

export default WithRestService()(connect(mapStateToProps, mapDispatchToProps)(HeaderBlock));

const Header = ({totalScore}) => {
  return (
    <div className={cl(s.header_block, 'd-flex')}>
      <div className={cl(s.header_block__logo)}></div>
      <h4 className={cl('justify-content-end')}>Ваш счет: {totalScore}</h4>
    </div>
  )
}

const Pagination = ({pgnItems}) => {
  if (pgnItems === null) {
    return null
  }

  const viewItems = pgnItems.map(item => {
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
        {viewItems}
      </ul>
  )
}
