import { GenresType } from './types';
import { SEARCH_API_URL, VOICE_CHAT_API_URL } from '@/routes';

export async function fetchAiAnswer(genres: GenresType, formData: FormData) {
  try {
    const response = await fetch(SEARCH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: formData.get('message')?.toString(),
        genres,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        error:
          errorData?.message || response.status === 422
            ? 'Invalid data format'
            : response.status < 500
              ? 'Client error! Try again please'
              : 'Server error! Please try again later',
      };
    }

    return (await response.json()) as {
      answer: string;
      query: unknown;
    };
  } catch (e) {
    console.error('Fetch error:', e);
    return {
      error: e instanceof Error ? e.message : 'Unknown error occurred',
    };
  }
}

export async function fetchAudio(text: string, genres: GenresType) {
  const chatResponse = await fetch(VOICE_CHAT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      transcription: text,
      genres: genres,
    }),
  });

  if (!chatResponse.ok) throw chatResponse.status;

  const json: { answer: string; audio_base64: string } =
    await chatResponse.json();

  // Создаем Blob из base64
  const audioBlob = new Blob(
    [Uint8Array.from(atob(json.audio_base64), (c) => c.charCodeAt(0))],
    {
      type: 'audio/mpeg',
    },
  );

  // Создаем URL для воспроизведения
  const url = URL.createObjectURL(audioBlob);

  return { answer: json.answer, url };
}
