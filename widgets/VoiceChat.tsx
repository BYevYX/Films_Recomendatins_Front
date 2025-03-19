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
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { genres } = useContext(GenresContext);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    console.log('===> start ', transcript);
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

    if (transcript) {
      handleSendMessage(transcript);
      resetTranscript();
    }
  }, [transcript, genres, resetTranscript]);

  return (
    <div className="flex flex-1 flex-col gap-3 ml-4">
      <div className="flex flex-col">
        <Button
          onClick={() => SpeechRecognition.startListening()}
          disabled={listening || isLoading}
        >
          {listening ? 'Запись...' : 'Начать запись'}
        </Button>
        {isLoading && <div>Обработка...</div>}
        {transcript && (
          <Popover>
            <PopoverTrigger className="cursor-pointer mt-1 hover:bg-gray-200">
              Распознанный текст
            </PopoverTrigger>
            <PopoverContent className="break-all">{transcript}</PopoverContent>
          </Popover>
        )}
      </div>

      <div className="flex flex-col">
        {audioUrl && <AudioPlayer src={audioUrl} />}
        {response && (
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
