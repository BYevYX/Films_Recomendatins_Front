'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { MicIcon } from 'lucide-react';

import SpeechRecognition from 'react-speech-recognition';

const Dictaphone = ({
  disabled,
  listening,
  browserSupportsSpeechRecognition,
}: {
  disabled: boolean;
  listening: boolean;
  browserSupportsSpeechRecognition: boolean;
}) => {
  const [isClickedWhenNotSupported, setIsClickedWhenNotSupported] =
    useState(false);
  const handleClick: React.MouseEventHandler = () => {
    if (!browserSupportsSpeechRecognition) {
      setIsClickedWhenNotSupported(true);
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
  };

  if (isClickedWhenNotSupported) {
    return (
      <Alert>
        <AlertTitle className="flex justify-between items-center">
          Warning!
          <Button
            type="button"
            size="sm"
            className="w-0.5 h-5"
            onClick={() => setIsClickedWhenNotSupported(false)}
          >
            X
          </Button>
        </AlertTitle>
        <AlertDescription>
          Your browser does not support speech recognition
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <Button
        type="button"
        size="icon"
        className="disabled:bg-gray-500 disabled:hover:bg-gray-600"
        onClick={handleClick}
        disabled={disabled}
      >
        <MicIcon />
      </Button>
    </div>
  );
};
export default Dictaphone;
