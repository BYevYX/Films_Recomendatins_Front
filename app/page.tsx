'use client';
import { ChatPanel } from '@/widgets/ChatPanel';
import { Message } from '@/widgets/Message';
import { SideBarWidget } from '@/widgets/SideBarWidget';
import { SidebarProvider } from '@/components/ui/sidebar';

import { useRef, useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const text = useRef<HTMLTextAreaElement | null>(null);

  return (
    <SidebarProvider>
      <div className="flex">
        <SideBarWidget />
        <div className="flex flex-col h-screen p-6 overflow-hidden">
          {/* Область сообщений (прокручиваемая) */}
          <div className="flex flex-col flex-1 items-center overflow-y-auto p-4">
            {/* Ваши сообщения здесь */}
            <div className="min-w-3xl">
              {messages.map((val, i) => (
                <Message key={i} from={i % 2 === 0 ? 'user' : 'ai'}>
                  {val}
                </Message>
              ))}
            </div>
          </div>
          <div className="flex">
            {/* Фиксированный контейнер для ввода */}
            <div className="relative flex-1 bottom-0 left-0 right-0 bg-white border-t border-gray-200">
              <form
                className="max-w-3xl mx-auto p-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const cur = text.current;

                  if (cur) {
                    const value = cur?.value;
                    setMessages((prev) => [...prev, value]);
                    cur.value = '';
                  }
                }}
              >
                <ChatPanel ref={text} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
