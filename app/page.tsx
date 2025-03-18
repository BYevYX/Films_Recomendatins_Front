'use client';
import { Message } from '@/widgets/Message';
import { SideBarWidget } from '@/widgets/SideBarWidget';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

import { useActionState, useState } from 'react';
import ChatForm from '@/widgets/ChatForm';

// TODO: scroll к новому сообщению (optional)
// TODO: добавить передачу жанров которые нравятся
// TODO: добавить голосовое общение

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [error, action, pending] = useActionState(
    async (curentState: { error: string } | undefined, formData: FormData) => {
      try {
        console.log('====> ', formData.get('message')?.toString());
        const response = await fetch('http://127.0.0.1:8003/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: formData.get('message')?.toString() }),
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

        const json = (await response.json()) as {
          answer: string;
          query: unknown;
        };
        console.log(json.query);
        setMessages((prev) => [...prev, json.answer]);
      } catch (e) {
        // 6. Обрабатываем сетевые ошибки
        console.error('Fetch error:', e);
        return {
          error: e instanceof Error ? e.message : 'Unknown error occurred',
        };
      }
    },
    undefined,
  );

  return (
    <SidebarProvider>
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
    </SidebarProvider>
  );
}
