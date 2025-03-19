'use client';
import { useFormStatus } from 'react-dom';

import { AudioLinesIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

// Динамический импорт с отключением SSR
const VoiceChat = dynamic(() => import('@/widgets/VoiceChat'), {
  ssr: false,
});

export function DrawerWidjet() {
  const { pending } = useFormStatus();

  return (
    <Drawer>
      <DrawerTrigger
        className="border rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
        disabled={pending}
      >
        <AudioLinesIcon className="w-10 h-10" />
      </DrawerTrigger>
      <DrawerContent className="h-1/3 ">
        <DrawerHeader>
          <DrawerTitle>Talk with Ai</DrawerTitle>
          <DrawerDescription>
            Most powerfull and most sigma ai
          </DrawerDescription>
        </DrawerHeader>
        <VoiceChat />
      </DrawerContent>
    </Drawer>
  );
}
