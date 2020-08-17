import React from 'react';

const Spinner = () => {
  return (
		<Sp />
	)
}

export default Spinner;

const Sp = () => {
	return (
		<div className="d-flex align-items-center">
  		<strong className="ml-3">Loading...</strong>
  		<div className="spinner-border spinner-border-sm ml-auto mr-3" role="status" aria-hidden="true"></div>
		</div>
	)
}
