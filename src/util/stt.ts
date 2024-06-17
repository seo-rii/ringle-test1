export default function (setMessage?: (message: string) => void, lang: string = "en-US") {
    if (setMessage) setMessage("");
    const recognition = new ((<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition || (<any>window).mozSpeechRecognition || (<any>window).msSpeechRecognition)();
    const ret: Promise<string> & { stop: () => any } = new Promise<string>((resolve, reject) => {
        let buffer = '';
        if (setMessage) setMessage('지금 말하세요...');
        recognition.lang = lang;
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results).map((result: any) => result[0].transcript).join('');
            buffer = transcript;
            if (setMessage) setMessage(transcript);
        };

        recognition.onend = () => resolve(buffer);

        recognition.onerror = (event: any) => {
            recognition.stop();
            reject(event.error);
        }

        recognition.start();
    }) as any

    ret.stop = () => {
        recognition.stop();
    }

    return ret;
}