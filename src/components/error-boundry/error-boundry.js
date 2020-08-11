import React, {Component} from 'react';
import Error from '../error';

export default class ErrorBoundry extends Component {
    
    state = {
        error: false,
        errorMessage: undefined,
    }

    onSetState(message) {
        this.setState({
            error: true,
            errorMessage: message,
        });
    }

    componentDidCatch(err) {
        this.onSetState(err.message);
    }

    render() {

        if (this.state.error) {
            return <Error message={this.state.errorMessage} />
        }
        
        return this.props.children;
    }
}