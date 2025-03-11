import { Textarea } from '../components/ui/textarea';

function ChatPanel({ ref }: { ref: React.Ref<HTMLTextAreaElement> }) {
  return (
    <div className="flex gap-2 items-end">
      <Textarea
        ref={ref}
        placeholder="Напишите сообщение..."
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
      <button
        type="submit"
        className="
                mb-1 
                p-2 
                rounded-lg 
                bg-blue-500 
                text-white 
                hover:bg-blue-600 
                transition-colors
                h-fit
              "
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
      </button>
    </div>
  );
}

export { ChatPanel };
