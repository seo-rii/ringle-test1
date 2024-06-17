import {finalizeAIResponse, setStatus, setAIResponse} from "../store/chatSlice.ts";
import {SSE} from "sse.js";

export default async function (messages: any[], dispatch: any) {
    const url = "https://api.openai.com/v1/chat/completions";
    const key = import.meta.env.VITE_OPENAI_KEY;

    let response = '';
    dispatch(setAIResponse('응답 생성중...'));
    dispatch(setStatus('loading'));

    const eventSource = new SSE(url,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + key,
            },
            method: "POST",
            payload: JSON.stringify({
                messages,
                temperature: 0.7,
                max_tokens: 100,
                model: "gpt-3.5-turbo",
                stream: true,
            }),
        });

    eventSource.onmessage = (event) => {
        try {
            response += JSON.parse(event.data).choices[0].delta.content || '';
            dispatch(setAIResponse(response));
        } catch (e) {
            dispatch(finalizeAIResponse());
            eventSource.close();
        }
    };

    eventSource.onerror = () => {
        eventSource.close();
        dispatch(setStatus('failed'));
    };

    eventSource.stream();

    return eventSource;
}