import React from 'react';
import RestServiceContext from '../rest-service-context';

const WithRestService = () => (Wrapped) => {
    return (props) => {
        return (
            <RestServiceContext.Consumer>
                {
                    RestService => {
                        return <Wrapped {...props} RestService={RestService} />
                    }
                }
            </RestServiceContext.Consumer>
        )
    };
};

export default WithRestService;