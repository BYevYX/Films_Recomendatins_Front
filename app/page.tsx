'use client';
import { Message } from '@/widgets/Message';
import { SideBarWidget } from '@/widgets/SideBarWidget';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

import { useActionState, useState } from 'react';
import ChatForm from '@/widgets/ChatForm';
import { GenresType } from '@/lib/types';
import { GenresContext } from '@/lib/contexts';
import { fetchAiAnswer } from '@/lib/actions';

// TODO: scroll к новому сообщению (optional)
// TODO: проверить голосовое общение

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [genres, setGenres] = useState<GenresType>({
    favorite: [],
    hated: [],
  });

  const [error, action, pending] = useActionState(
    async (_: { error: string } | undefined, formData: FormData) => {
      const answerOrError = await fetchAiAnswer(genres, formData);

      if ('error' in answerOrError) {
        setMessages((prev) => [...prev, answerOrError.error]);
        return answerOrError;
      }

      setMessages((prev) => [...prev, answerOrError.answer]);
    },
    undefined,
  );

  return (
    <SidebarProvider>
      <GenresContext value={{ genres, setGenres }}>
        <div className="flex flex-1">
          <SideBarWidget />

          <div className="flex flex-col flex-1 h-screen p-6 overflow-hidden">
            {/* Область сообщений (прокручиваемая) */}
            <div className="flex flex-col flex-1 items-center overflow-y-auto p-4">
              {/* Ваши сообщения здесь */}
              <div className="min-w-3xl">
                {messages.map((val, i) => (
                  <Message key={i} from={i % 2 === 0 ? 'user' : 'ai'}>
                    {val}
                  </Message>
                ))}
                {pending && (
                  <div className="flex max-w-3xl pt-5 pb-5 justify-start pl-4 pr-16">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              {error && (
                <div className="flex-1 justify-self-center self-center text-red-500">
                  {error.error}
                </div>
              )}
              {/* Фиксированный контейнер для ввода */}
              <ChatForm setMessages={setMessages} action={action} />
            </div>
          </div>
        </div>
      </GenresContext>
    </SidebarProvider>
  );
}
