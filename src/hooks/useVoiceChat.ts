import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useVoiceChat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: 'Microphone Error',
        description: 'Unable to access microphone. Please check permissions.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const stopRecording = useCallback(async (language: string = 'en'): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current) {
        resolve(null);
        return;
      }

      // Stop recording
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsProcessing(true);

      // Use Web Speech API
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
          toast({
            title: 'Not Supported',
            description: 'Speech recognition is not supported in this browser.',
            variant: 'destructive',
          });
          setIsProcessing(false);
          resolve(null);
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'ar' ? 'ar-SA' : 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setIsProcessing(false);
          resolve(transcript);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          toast({
            title: 'Transcription Error',
            description: 'Failed to transcribe audio. Please try again.',
            variant: 'destructive',
          });
          setIsProcessing(false);
          resolve(null);
        };

        recognition.onend = () => {
          setIsProcessing(false);
        };

        recognition.start();
      } catch (error) {
        console.error('Error with speech recognition:', error);
        setIsProcessing(false);
        resolve(null);
      }
    });
  }, [toast]);

  const speakText = useCallback(async (text: string, voice: string = 'alloy') => {
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice },
      });

      if (error) throw error;

      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      await audio.play();
    } catch (error) {
      console.error('Text-to-speech error:', error);
      toast({
        title: 'Speech Error',
        description: 'Failed to generate speech. Please try again.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  return {
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
    speakText,
  };
};
