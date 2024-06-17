import {ChatAI, ChatMy} from "../Chat.tsx";
import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";

export default function () {
    const messages = useSelector((state: any) => state.chat.messages);
    const aiResponse = useSelector((state: any) => state.chat.aiResponse);
    const status = useSelector((state: any) => state.chat.status);
    const ref = useRef<any>();

    useEffect(() => {
        if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    }, [messages]);

    return <div className="overflow-scroll flex-1 py-2 scroll-smooth" ref={ref}>
        {messages.map((msg: { role: string, content: string }, index: number) => (
            (msg.role === 'assistant') ?
                <ChatAI key={index} message={msg.content}/> :
                (msg.role === 'user' ? <ChatMy key={index} message={msg.content}/> : false)
        ))}
        {status === 'loading' && (
            <ChatAI message={aiResponse} writing/>
        )}
    </div>
}