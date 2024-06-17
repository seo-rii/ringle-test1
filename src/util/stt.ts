async function gcpSTT(audio: Blob, lang: string = "en-US"): Promise<string> {
    const key = import.meta.env.VITE_GCP_KEY;
    const url = `https://speech.googleapis.com/v1/speech:recognize?key=${key}`

    const base64Audio = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(audio);
    }).then((data) => data.replace(/^data:audio\/webm;codecs=opus;base64,/, ''));


    //value from mediarecorder(opus/webm)
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            config: {
                encoding: 'WEBM_OPUS',
                languageCode: lang,
                enableAutomaticPunctuation: true,
                model: 'latest_short'
            },
            audio: {content: base64Audio}
        })
    });
    const data = await response.json();
    return data?.results?.[0]?.alternatives?.[0]?.transcript;
}

export default function (setMessage?: (message: string) => void, lang: string = "en-US") {
    if (setMessage) setMessage("");
    const recognition = new ((<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition || (<any>window).mozSpeechRecognition || (<any>window).msSpeechRecognition)();
    let mediaRecorder = new MediaRecorder(new MediaStream());
    let tr = true;
    const ret: Promise<string> & { stop: (force?: boolean) => any } = new Promise<string>(async (resolve, reject) => {
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

        recognition.onend = () => {
            mediaRecorder.stop();
        }

        recognition.onerror = (event: any) => {
            recognition.stop();
            reject(event.error);
        }

        // record audio
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });
        mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm;codecs=opus'});
        mediaRecorder.ondataavailable = (event) => {
            if (!tr) return;
            gcpSTT(event.data, lang).then((result) => {
                buffer = result || buffer;
                if (setMessage) setMessage(result);
                resolve(result);
            });
            stream.getTracks().forEach((track) => track.stop());
        }

        recognition.start();
        mediaRecorder.start();
    }) as any

    ret.stop = (force = false) => {
        if (force) tr = false;
        recognition.stop();
        mediaRecorder.stop();
    }

    return ret;
}