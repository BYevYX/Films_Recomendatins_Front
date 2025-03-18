import { ChatPanel } from '@/widgets/ChatPanel';

import { type Dispatch, type SetStateAction } from 'react';
import Form from 'next/form';

/* Фиксированный контейнер для ввода */

export default function ChatForm({
  setMessages,
  action,
}: {
  setMessages: Dispatch<SetStateAction<string[]>>;
  action: (payload: FormData) => void;
}) {
  return (
    <div className="relative flex-1 bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <Form className="max-w-3xl mx-auto p-4" action={action}>
        <ChatPanel setMessages={setMessages} />
      </Form>
    </div>
  );
}
