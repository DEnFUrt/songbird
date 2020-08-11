import React from 'react';

import s from './error.module.scss';

const Error = ({message = 'Неопознанная ошибка!'}) => {
    return <div className={s.error}>Error: {message}</div>
}

export default Error;