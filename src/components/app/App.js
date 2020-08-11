import React from 'react';
import HeaderBlock from '../header-block';
import BodyBlock from '../body-block/body-block';
import cl from 'classnames';

import './App.module.scss';

const App = () => {
  return (
    <div className={cl('container')}>
      <HeaderBlock />
      <BodyBlock />
    </div>
  );
}

export default App;
