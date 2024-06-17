import Icon from "./base/Icon.tsx";
import tts from "../util/tts.ts";
import {useState} from "react";
import translate from "../util/translate.ts";

function ChatContainer({children, right}: { className?: string, children?: React.ReactNode, right?: boolean }) {
    return <div className={"px-2 py-2 flex" + (right ? " justify-end" : "")}>
        {children}
    </div>
}

export function ChatAI({message, writing}: { message: string, writing?: boolean }) {
    const [stop, setStop] = useState(null as any);
    const [translatedMessage, setTranslatedMessage] = useState<string | null>(null);
    const [showTranslated, setShowTranslated] = useState(false);

    const handleTranslate = async () => {
        if (translatedMessage !== null) return;
        setTranslatedMessage('번역 중...');
        setShowTranslated(true);
        try {
            const translated = await translate(message);
            setTranslatedMessage(translated);
            setShowTranslated(true);
        } catch (error) {
            console.error("Translation error:", error);
            setTranslatedMessage('번역에 실패했습니다.');
        }
    };

    const toggleTTS = () => {
        if (stop) {
            stop();
            setStop(null);
            return;
        }
        const pr = tts((showTranslated ? translatedMessage : message) || '', showTranslated ? 'ko-KR' : 'en-US');
        setStop(() => () => {
            pr.stop();
        });
        pr.then(() => {
            setStop(null);
        })
    }

    return <ChatContainer>
        <div className="">
            <Icon account_circle filled className="text-4xl text-blue-50 mr-2 bg-blue-200 rounded-full"/>
        </div>
        <div className="border rounded shadow-sm border-blue-100 w-4/6 max-w-96 p-2">
            <div className="whitespace-pre-line">
                {showTranslated ? translatedMessage : message}
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between items-center text-gray-600">
                {writing ? <><span className="font-bold text-xs cursor-pointer">응답 중...</span></> : <>
                    <Icon volume_up className={`cursor-pointer ${stop ? 'text-blue-700' : ''}`} filled
                          onClick={toggleTTS}/>
                    {translatedMessage ? (
                        <span className="font-bold text-xs cursor-pointer"
                              onClick={() => setShowTranslated(!showTranslated)}>
                            {showTranslated ? '원본 메시지 보기' : '한글로 번역'}
                        </span>
                    ) : (
                        <span className="font-bold text-xs cursor-pointer" onClick={handleTranslate}>
                            한글로 번역
                        </span>
                    )}</>}
            </div>
        </div>
    </ChatContainer>
}

export function ChatMy({message}: { message: string }) {
    return <ChatContainer right>
        <div className="rounded shadow-sm bg-blue-50 w-4/6 max-w-96 p-2">
            <div className="whitespace-pre-line">
                {message}
            </div>
        </div>
    </ChatContainer>
}