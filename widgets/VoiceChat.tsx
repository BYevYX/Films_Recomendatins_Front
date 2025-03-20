'use client';
import { useState, useEffect, useContext } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { GenresContext } from '@/lib/contexts';
import { fetchAudio } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import AudioPlayer from './AudioPlayer';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

export default function VoiceChat() {
  const [response, setResponse] = useState('');
  const [lastTranscription, setLastTranscrition] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { genres } = useContext(GenresContext);

  const { finalTranscript, listening, resetTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    const handleSendMessage = async (text: string) => {
      setIsLoading(true);
      try {
        // Шаг 1: Получаем ответ от ChatGPT

        const { answer, url } = await fetchAudio(text, genres);

        console.log('===> receive ', url, answer);

        setResponse(answer);
        setAudioUrl(url);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (finalTranscript) {
      handleSendMessage(finalTranscript);
      setLastTranscrition(finalTranscript);
      resetTranscript();
    }
  }, [finalTranscript, genres, resetTranscript]);

  useEffect(() => {
    return () => {
      resetTranscript();
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-3 ml-4">
      <div className="flex flex-col">
        <Button
          onClick={() => SpeechRecognition.startListening()}
          disabled={listening || isLoading}
        >
          {listening ? 'Запись...' : 'Начать запись'}
        </Button>
        {lastTranscription && !listening && (
          <Popover>
            <PopoverTrigger className="cursor-pointer mt-1 hover:bg-gray-200">
              Распознанный текст
            </PopoverTrigger>
            <PopoverContent className="break-all">
              {lastTranscription}
            </PopoverContent>
          </Popover>
        )}
        {isLoading && <div>Обработка...</div>}
      </div>

      <div className="flex flex-col">
        {audioUrl && !listening && <AudioPlayer src={audioUrl} />}
        {response && !listening && (
          <Popover>
            <PopoverTrigger className="cursor-pointer mt-1 hover:bg-gray-200">
              Текстовый ответ
            </PopoverTrigger>
            <PopoverContent className="break-all">{response}</PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
