import {useState, useCallback} from 'react'

export const useFetch = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const request = useCallback(async (url: string, method: string, body: any, headers?: any) => {
        setLoading(true)
        try{
            if (body) {
                headers = {"Content-Type": "application/json"}
                body = JSON.stringify(body);
            }
           const response = await fetch(url, { method, body, headers })
           const data = await response.json()

           if (!response.ok) {
               throw new Error(data.message || 'Something went wrong')
           }
           setLoading(false)
           return data
        }
        catch(e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(''), [])

    return { loading, request, error, clearError }
}