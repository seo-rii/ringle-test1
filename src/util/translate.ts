export default async function translate(text: string): Promise<string> {
    const key = import.meta.env.VITE_GCP_KEY;
    const url = `https://translation.googleapis.com/language/translate/v2?key=${key}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            source: 'en',
            target: 'ko',
            format: 'text'
        })
    });

    if (!response.ok) {
        throw new Error('Translation request failed');
    }

    const data = await response.json();
    return data.data.translations[0].translatedText;
}
