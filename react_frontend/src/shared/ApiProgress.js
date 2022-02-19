import React, {Component, useEffect, useState} from 'react';
import axios from "axios";


export const useApiProgress = (apiPath) => {
    const {pendingApiCall, setPendingApiCall} = useState(false)
    useEffect(() => {
        let requestInterceptor, responseInterceptor;


        const updateApiCallFor = (url, inProgress) => {
            if (url === apiPath) {
                setPendingApiCall(inProgress);
            }
        };
        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use(request => {
                updateApiCallFor(request.url, true);
                return request;
            });

            responseInterceptor = axios.interceptors.response.use(
                response => {

                    updateApiCallFor(response.config.url, false);
                    return response;
                },
                error => {

                    updateApiCallFor(error.config.url, false);
                    throw error;
                }
            );
        };
        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };


        registerInterceptors();
        return function unmount() {
            unregisterInterceptors();
        };
    },)

    return pendingApiCall;


}

function getDispalyName(WrapppedComponent) {

    return WrapppedComponent.displayName || WrapppedComponent.name || "Componenet"
}

export function withApiProgress(WrappedComponent, apiPath) {

    return class extends Component {
        static displayName = `ApiProgress(${getDispalyName(WrappedComponent)})`
        // static displayName = 'ApiProgress(' + getDispalyName(WrappedComponent) + ')'


        state = {
            pendingApiCall: false
        }

        componentDidMount() {
            this.registerInterceptor()
        }

        registerInterceptor = () => {
            this.requestInterceptor = axios.interceptors.request.use((request) => {

                this.updateApiCallFor(request.url, true)
                return request

            })
            axios.interceptors.response.use((response) => {
                this.responseInterceptor = this.updateApiCallFor(response.config.url, false)


                return response
            }, (error => {
                this.errorInterceptor = this.updateApiCallFor(error.config.url, false)


                throw  error
            }))


        }

        componentWillUnmount() {
            this.unRegisterInterceptor()
        }

        unRegisterInterceptor = () => {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }

        updateApiCallFor = (url, inProgress) => {

            if (url === apiPath) {
                this.setState({pendingApiCall: inProgress})
            }
        }


        render() {
            const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall
            // return (
            //     <div>
            //         {React.cloneElement(this.props.children, {
            //             pendingApiCall: pendingApiCall
            //         })}
            //     </div>
            // );
            return <WrappedComponent {...this.props} pendingApiCall={pendingApiCall}/>
        }
    }
}


