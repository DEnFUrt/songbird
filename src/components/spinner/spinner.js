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

/* const Sp1 = () => {
	return (
		<div className="ml-3 spinner-grow spinner-grow-sm text-secondary" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	)
} */