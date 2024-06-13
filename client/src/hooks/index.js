import {useEffect, useState} from "react";

export const useFetchingForAuth = (request, isAuth, page) => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        setIsLoading(true)
        request()
            .then(response => setData(response?.data))
            .catch(error => setError(error.response?.data?.message))
            .finally(() => setIsLoading(false))
    }, [isAuth, page])

    return [error, isLoading, data]
}

export const useFetching = (request) => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        setIsLoading(true)
        request()
            .then(response => setData(response.data))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))
    }, [])

    return [error, isLoading, data]
}