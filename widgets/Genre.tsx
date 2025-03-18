'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsDownIcon } from 'lucide-react';
import { ThumbsUpIcon } from 'lucide-react';

function Genre({ genre }: { genre: string }) {
  const [like, setLike] = useState<boolean | null>(null);

  const handleClick = (baseBool: boolean) => {
    if (like === baseBool) {
      setLike(null);
    } else {
      setLike(baseBool);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-between">
      <span className="pl-2">{genre}</span>
      <div className="flex gap-2 pr-2">
        <Button
          variant="outline"
          name="like"
          size="icon"
          className={
            like ? 'bg-green-500 hover:bg-green-300 transition-colors' : ''
          }
          onClick={() => handleClick(true)}
        >
          <ThumbsUpIcon />
        </Button>
        <Button
          variant="outline"
          name="dislike"
          size="icon"
          className={
            like === false
              ? 'bg-red-500 hover:bg-red-300 transition-colors'
              : ''
          }
          onClick={() => handleClick(false)}
        >
          <ThumbsDownIcon />
        </Button>
      </div>
    </div>
  );
}

export { Genre };
