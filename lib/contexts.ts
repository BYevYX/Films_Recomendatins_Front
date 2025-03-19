import { createContext, type Dispatch, type SetStateAction } from 'react';
import { GenresType } from './types';

interface GenresContextType {
  genres: GenresType;
  setGenres: Dispatch<SetStateAction<GenresType>>;
}

export const GenresContext = createContext<GenresContextType>({
  genres: {
    favorite: [],
    hated: [],
  },
  setGenres: () => {},
});
