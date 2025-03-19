'use client';
import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsDownIcon } from 'lucide-react';
import { ThumbsUpIcon } from 'lucide-react';
import { GenresContext } from '@/lib/contexts';

function Genre({ genre }: { genre: string }) {
  const [like, setLike] = useState<boolean | null>(null);

  const { genres, setGenres } = useContext(GenresContext);

  const handleClick = (baseBool: boolean, status: 'like' | 'dislike') => {
    const newGenres = {
      favorite: [...genres.favorite],
      hated: [...genres.hated],
    };

    if (like === baseBool) {
      setLike(null);

      if (status === 'like') {
        newGenres.favorite = newGenres.favorite.filter((val) => val !== genre);
      } else {
        newGenres.hated = newGenres.hated.filter((val) => val !== genre);
      }
    } else {
      setLike(baseBool);

      if (status === 'like') {
        newGenres.favorite.push(genre);
      } else {
        newGenres.hated.push(genre);
      }
    }

    setGenres(newGenres);
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
          onClick={() => {
            handleClick(true, 'like');
          }}
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
          onClick={() => handleClick(false, 'dislike')}
        >
          <ThumbsDownIcon />
        </Button>
      </div>
    </div>
  );
}

export { Genre };
