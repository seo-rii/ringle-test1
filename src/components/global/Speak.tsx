import {useState} from "react";
import Icon from "../base/Icon.tsx";
import stt from "../../util/stt.ts";
import Button from "../base/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "../../store/chatSlice.ts";
import gpt from "../../util/gpt.ts";

function WaveForm() {
    return <div className="flex justify-center items-center space-x-1 py-6">
        <div className="rounded h-4 w-2 bg-blue-500 animate-wave1"></div>
        <div className="rounded h-4 w-2 bg-blue-500 animate-wave2"></div>
        <div className="rounded h-4 w-2 bg-blue-500 animate-wave3"></div>
        <div className="rounded h-4 w-2 bg-blue-500 animate-wave4"></div>
        <div className="rounded h-4 w-2 bg-blue-500 animate-wave5"></div>
    </div>
}

export default function Speak() {
    const dispatch = useDispatch();
    const [recording, setRecording] = useState(false);
    const [message, setMessage] = useState("");
    const [stop, setStop] = useState(null as any);
    const messages = useSelector((state: any) => state.chat.messages);

    const record = () => {
        setRecording(true);
        const pr = stt(setMessage);
        setStop(() => () => {
            pr.stop();
            setRecording(false);
        });
        pr.then((result) => {
            setRecording(false);
            setMessage(result);
        }).catch((error) => {
            setRecording(false);
            setMessage(error);
        });
    }

    return <div
        className={`p-4 w-full flex flex-col items-center justify-center ${recording ? 'h-52' : 'h-32'}`}>
        {recording ? <>
            <p className="flex-1 flex items-center justify-center">{message}</p>
            <WaveForm/>
            <div className="flex w-full max-w-96">
                <Button className="flex-2 mx-1" outlined onClick={stop}>취소</Button>
                <Button className="flex-1 mx-1" onClick={() => {
                    stop();
                    gpt([...messages, {role: 'user', content: message}], dispatch);
                    dispatch(addMessage(message));
                }}>답변 완료</Button>
            </div>
        </> : <>
            <p className="text-blue-500 text-xs">마이크를 눌러 녹음을 진행해주세요.</p>
            <button
                className="bg-blue-500 text-white rounded-full mt-2 text-2xl w-12 h-12 flex items-center justify-center"
                onClick={record}>
                <Icon mic filled/>
            </button>
        </>}
    </div>
}