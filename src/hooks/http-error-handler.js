import {useState, useEffect} from 'react';

export default httpCliente => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpCliente.interceptors.request.use(request => {
        setError(null);
        return request;
    })
    const resInterceptor = httpCliente.interceptors.response.use(res => res, error => {
        setError(error);
    });

    useEffect(() => {
        return () => {
            httpCliente.interceptors.request.eject(reqInterceptor);
            httpCliente.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor])

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler]
}