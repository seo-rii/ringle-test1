import Icon from "../base/Icon.tsx";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import LinearProgress from "../base/LinearProgress.tsx";

export default function Nav({title}: { title: string }) {
    const progress = useSelector((state: any) => (state.chat.messages.length - 1) / 2 / 11 * 100);
    useEffect(() => {
        document.title = title;
    });
    return <>
        <nav className="p-4 flex items-center">
            <Icon arrow_back_ios className="text-gray-500 px-4"/>
            <p className="truncate px-4 flex-1 font-bold">{title}</p>
            <Icon more_horiz className="text-gray-500 px-4"/>
        </nav>
        <LinearProgress progress={progress}/>
    </>
}


