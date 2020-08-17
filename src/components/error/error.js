import React, {useState} from 'react';
import cl from 'classnames';

import s from './error.module.scss';

const Error = ({errorData}) => {
	const [showBody, setShowBody] = useState(false);
	const {message = 'Ошибка не опознана!', name, stack} = errorData;
	
	const onToggleBody = () => {
		setShowBody(!showBody);
	}

	return (

		<div className={cl(s.error, 'col-10', 'accordion')} id="accordionExample">
			<div className={cl('card', 'bg-dark')}>
				<div className={cl('card-header')} id="headingOne">
					<h5 clasName={cl('mb-0')}>
						<span className={cl('d-block', 'mt-4')}>
							Непредвиденная ошибка:
							<span className={cl('text-danger', 'ml-2')}>{name}</span> 
						</span>
						<span className={cl('d-block', 'mt-2')}>
							Описание: 
							<span className={cl('text-danger', 'ml-2')}>{message}</span>
						</span>
						<button
							className={cl('btn', 'text-white', 'border', 'mt-3')}
							type="button" 
							onClick={onToggleBody}
						>
							Подробнее...
						</button>		
					</h5>
				</div>
				<div clasName={cl('collapse')}>
					<div className={cl('card-body', 
													{'d-none': showBody === false},
													{'d-block': showBody === true})}
					>
						{stack}
					</div>
				</div>
			</div>
		</div>

	)
}

export default Error;