import axios from 'axios';

const customFetch = async (params: {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: any,
    abortController?: AbortController
}) => {
    const { url, method, body, headers, abortController } = params

    try {
        // console.log("Fetch to: ", url)

        const fetchResult: any = await axios.request({
            method,
            url,
            data: body,
            headers,
            signal: abortController ? abortController.signal : undefined
        })

        // console.log(fetchResult.status, fetchResult.data)

        return { data: fetchResult.data, status: fetchResult.status || fetchResult.request.status }
    }
    catch (e: any) {
        const fetchResult: any = {}

        if (e.response && e.response.request && e.response.request.status) {
            fetchResult.status = e.response.request.status
        }
        else {
            fetchResult.status = 500
        }

        if (e.response && e.response.data) {
            fetchResult.data = e.response.data
        }
        else {
            fetchResult.data = {}
        }

        return fetchResult
    }
}

export default customFetch