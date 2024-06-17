export default function (text: string, lang: string = 'en-US') {
    const key = import.meta.env.VITE_GCP_KEY;
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`
    let stop: any, block = false;
    const ret: Promise<void> & { stop: () => any } = new Promise<void>(async (resolve) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: {text},
                    voice: {languageCode: lang, ssmlGender: 'NEUTRAL'},
                    audioConfig: {audioEncoding: 'MP3'},
                }),
            }).then(res => res.json());

            if (block) return;
            const audioContent = response.audioContent;
            const audio = document.createElement('audio');
            audio.src = `data:audio/mp3;base64,${audioContent}`;
            audio.play();
            audio.onended = () => {
                audio.remove();
                resolve();
            }
            stop = () => {
                audio.pause();
                audio.remove();
                resolve();
            }
        } catch (error) {
            console.error('Error synthesizing text:', error);
            alert('Failed to synthesize text');
        }
    }) as any

    ret.stop = () => {
        block = true;
        if (stop) stop();
    }
    return ret;
}