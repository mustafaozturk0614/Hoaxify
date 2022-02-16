import React, {Component} from 'react';
import axios from "axios";

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


