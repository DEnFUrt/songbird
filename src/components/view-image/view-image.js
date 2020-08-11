import React from 'react';
import cl from 'classnames';

import s from './view-image.module.scss';

const ViewImage = ({imgSrc, title, clName}) => {
  return (
    <img 
      src={imgSrc} 
      className={cl(s.img_custom, clName)}
      alt={title}
    />
  )
};

export default ViewImage;