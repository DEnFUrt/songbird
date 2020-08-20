import React, {Component} from 'react';
import Error from '../error';

export default class ErrorBoundry extends Component {
	
	state = {
		error: false,
		errorData: {
			message: undefined,
			name: undefined,
			stack: undefined,
		}
	}

	onSetState(data) {
		this.setState({
			error: true,
			errorData: data,
		});
	}

	componentDidCatch(err) {
		const {name, message, stack} = err;

		if (stack) {
			this.onSetState(
				{
					message,
					name,
					stack,
				}
			);
		} else {
			this.onSetState(
				{
					message,
					name,
				}
			);
		}
	}

	render() {
		if (this.state.error) {
			return <Error errorData={this.state.errorData} />
		}
		
		return this.props.children;
	}
}