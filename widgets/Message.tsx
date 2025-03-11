import { ReactNode } from 'react';

const fromClassName = {
  container: {
    user: 'justify-end pr-4 pl-16',
    ai: 'justify-start pl-4 pr-16',
  },
  message: {
    user: 'rounded-bl-xl rounded-t-xl rounded-bl-xl bg-blue-200',
    ai: '',
  },
};

function Message({
  children,
  from,
}: {
  children: ReactNode;
  from: 'ai' | 'user';
}) {
  return (
    <div
      className={`flex max-w-3xl break-all pt-5 pb-5 ${fromClassName.container[from]}`}
    >
      <div
        className={`flex w-fit min-h-8 pr-4 pl-4 pb-2 pt-2 items-center whitespace-pre-wrap ${fromClassName.message[from]}`}
      >
        {children}
      </div>
    </div>
  );
}

export { Message };
