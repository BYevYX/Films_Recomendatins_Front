'use client';
import 'regenerator-runtime/runtime';
import { useFormStatus } from 'react-dom';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Textarea } from '../components/ui/textarea';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { useSpeechRecognition } from 'react-speech-recognition';

// Динамический импорт с отключением SSR
const Dictaphone = dynamic(() => import('@/widgets/Dictaphone'), {
  ssr: false,
});

function ChatPanel({
  setMessages,
}: {
  setMessages: Dispatch<SetStateAction<string[]>>;
}) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (textArea.current) {
      textArea.current.value = transcript;
    }
  }, [transcript, textArea]);

  return (
    <div className="flex gap-2 items-end">
      <Textarea
        ref={textArea}
        name="message"
        placeholder="Напишите сообщение и мы подберем лучшие фильмы для вас..."
        className="
                w-full 
                p-3 
                rounded-lg 
                border 
                border-gray-300 
                focus:border-blue-500 
                focus:ring-2 
                focus:ring-blue-200 
                transition-all
                scroll-p-2
                max-h-40
                min-h-19
                overflow-y-auto
                resize-none
              "
        rows={1}
        onInput={(e) => {
          // Автоматическое увеличение высоты
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
        }}
      />
      <div className="flex flex-col">
        <Button
          type="submit"
          className="
                mb-1 
                p-2 
                bg-blue-500 
                text-white 
                hover:bg-blue-600 
                disabled:bg-gray-500
                disabled:hover:bg-gray-600
                transition-colors
              "
          size="icon"
          disabled={pending}
          onClick={() => {
            const cur = textArea.current;
            resetTranscript();

            if (cur) {
              const value = cur?.value;
              setMessages((prev) => [...prev, value]);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12l14 0" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </Button>
        <Dictaphone
          disabled={pending}
          listening={listening}
          browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
        />
      </div>
    </div>
  );
}

export { ChatPanel };
