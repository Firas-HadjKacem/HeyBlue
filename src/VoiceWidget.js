// Sometimes listens infinitely WebSpeech API

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { usePorcupine } from '@picovoice/porcupine-react';

const ACCESS_KEY = 'YRUZNcqpoRrQxrTRZ5evNjMQNifWUgQ43+U+9iwv4F89HTiVdPASmw==';  // Replace with your actual Picovoice Access Key

const porcupineKeyword = {
  publicPath: process.env.PUBLIC_URL + '/Hey-blue_en_wasm_v3_0_0.ppn',
  label: 'Hey-blue'
};

const porcupineModel = {
  publicPath: process.env.PUBLIC_URL + '/porcupine_params.pv'
};

const VoiceWidget = () => {
  const [heardMessage, setHeardMessage] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  const {
    keywordDetection,
    error: porcupineError,
    init: initPorcupine,
    start: startPorcupine,
    stop: stopPorcupine,
  } = usePorcupine();

  useEffect(() => {
    const requestMicrophoneAccess = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone access granted.');

        await initPorcupine(ACCESS_KEY, porcupineKeyword, porcupineModel);
        console.log('Porcupine initialized successfully.');

        await startPorcupine();
        console.log('Porcupine started successfully.');
      } catch (err) {
        console.error('Initialization error:', err);
      }
    };

    requestMicrophoneAccess();
  }, [initPorcupine, startPorcupine]);

  const handlePostProcessing = useCallback(async () => {
    console.log('Handling post-processing.');
    setIsProcessing(false);
    try {
      await startPorcupine();
      console.log('Porcupine resumed successfully after audio ended.');
    } catch (err) {
      console.error('Error resuming Porcupine after audio ended:', err);
    }
  }, [startPorcupine]);

  const startSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Web Speech API is not supported in this browser.');
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Speech recognition started.');
    };

    recognition.onend = () => {
      console.log('Speech recognition ended.');
      handlePostProcessing();
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setHeardMessage(result);
      console.log('Transcription result:', result);
      postToEndpoint(result);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      handlePostProcessing();
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [handlePostProcessing]);

  const postToEndpoint = useCallback(async (transcription) => {
    try {
      const response = await fetch('https://dev.core.memorality.com/playgrounds/666cf43cd7b3507778ded7c9/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: transcription }),
      });
      const data = await response.json();
      if (data.result && data.result.OutputUri) {
        setAudioSrc(data.result.OutputUri);
      } else {
        console.error('Invalid response structure:', data);
      }
    } catch (error) {
      console.error('Error posting to endpoint:', error);
    }
  }, []);

  useEffect(() => {
    const processTranscription = async () => {
      if (keywordDetection && !isProcessing) {
        setIsProcessing(true);
        console.log('Wake word detected!');
        await stopPorcupine();
        console.log('Porcupine stopped for speech recognition.');
        startSpeechRecognition();
      }
    };

    processTranscription();
  }, [keywordDetection, startSpeechRecognition, stopPorcupine, isProcessing]);

  useEffect(() => {
    const handleAudioEnded = async () => {
      console.log('Audio playback finished.');
      await handlePostProcessing();
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('ended', handleAudioEnded);
      console.log('Audio "ended" event listener added.');
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleAudioEnded);
        console.log('Audio "ended" event listener removed.');
      }
    };
  }, [handlePostProcessing]);

  return (
    <div>
      {porcupineError && <p>Error: {porcupineError.message}</p>}
      <div>
        <h2>Wake Word Detection</h2>
        <p>{keywordDetection && !isProcessing ? 'Wake word detected!' : "Say 'Hey-blue' to trigger detection."}</p>
        {isProcessing && <p>Processing...</p>}
      </div>
      <div>
        <h2>Heard Message:</h2>
        <p>{heardMessage}</p>
      </div>
      <div>
        <h2>Response Audio:</h2>
        {audioSrc && (
          <audio
            ref={audioRef}
            controls
            autoPlay
            src={audioSrc}
            onEnded={() => console.log('Audio ended event fired')}
          />
        )}
      </div>
    </div>
  );
};

export default VoiceWidget;


// listens once Webspeech api

// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { usePorcupine } from '@picovoice/porcupine-react';

// const ACCESS_KEY = 'YRUZNcqpoRrQxrTRZ5evNjMQNifWUgQ43+U+9iwv4F89HTiVdPASmw==';  // Replace with your actual Picovoice Access Key

// const porcupineKeyword = {
//   publicPath: process.env.PUBLIC_URL + '/Hey-blue_en_wasm_v3_0_0.ppn',
//   label: 'Hey-blue'
// };

// const porcupineModel = {
//   publicPath: process.env.PUBLIC_URL + '/porcupine_params.pv'
// };

// const VoiceWidget = () => {
//   const [heardMessage, setHeardMessage] = useState('');
//   const [audioSrc, setAudioSrc] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const audioRef = useRef(null);
//   const recognitionRef = useRef(null);

//   const {
//     keywordDetection,
//     error: porcupineError,
//     init: initPorcupine,
//     start: startPorcupine,
//     stop: stopPorcupine,
//   } = usePorcupine();

//   useEffect(() => {
//     const requestMicrophoneAccess = async () => {
//       try {
//         await navigator.mediaDevices.getUserMedia({ audio: true });
//         console.log('Microphone access granted.');

//         await initPorcupine(ACCESS_KEY, porcupineKeyword, porcupineModel);
//         console.log('Porcupine initialized successfully.');

//         await startPorcupine();
//         console.log('Porcupine started successfully.');
//       } catch (err) {
//         console.error('Initialization error:', err);
//       }
//     };

//     requestMicrophoneAccess();
//   }, [initPorcupine, startPorcupine]);

//   const handlePostProcessing = useCallback(async () => {
//     console.log('Handling post-processing.');
//     setIsProcessing(false);
//     setTimeout(async () => {
//       try {
//         await startPorcupine();
//         console.log('Porcupine resumed successfully after audio ended.');
//       } catch (err) {
//         console.error('Error resuming Porcupine after audio ended:', err);
//       }
//     }, 500);
//   }, [startPorcupine]);

//   const startSpeechRecognition = useCallback(() => {
//     if (!('webkitSpeechRecognition' in window)) {
//       console.error('Web Speech API is not supported in this browser.');
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = 'en-US';

//     recognition.onstart = () => {
//       console.log('Speech recognition started.');
//     };

//     recognition.onend = () => {
//       console.log('Speech recognition ended.');
//       if (isProcessing) {
//         handlePostProcessing();
//       }
//     };

//     recognition.onresult = (event) => {
//       const result = event.results[0][0].transcript;
//       setHeardMessage(result);
//       console.log('Transcription result:', result);
//       postToEndpoint(result);
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//       if (isProcessing) {
//         handlePostProcessing();
//       }
//     };

//     recognition.start();
//   }, [handlePostProcessing, isProcessing]);

//   const postToEndpoint = useCallback(async (transcription) => {
//     try {
//       const response = await fetch('https://dev.core.memorality.com/playgrounds/666cf43cd7b3507778ded7c9/execute', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ input: transcription }),
//       });
//       const data = await response.json();
//       if (data.result && data.result.OutputUri) {
//         setAudioSrc(data.result.OutputUri);
//       } else {
//         console.error('Invalid response structure:', data);
//       }
//     } catch (error) {
//       console.error('Error posting to endpoint:', error);
//     }
//   }, []);

//   useEffect(() => {
//     const processTranscription = async () => {
//       if (keywordDetection && !isProcessing) {
//         setIsProcessing(true);
//         console.log('Wake word detected!');
//         await stopPorcupine();
//         console.log('Porcupine stopped for speech recognition.');
//         startSpeechRecognition();
//       }
//     };

//     processTranscription();
//   }, [keywordDetection, startSpeechRecognition, stopPorcupine, isProcessing]);

//   useEffect(() => {
//     const handleAudioEnded = () => {
//       console.log('Audio playback finished.');
//       handlePostProcessing();
//     };

//     const audioElement = audioRef.current;
//     if (audioElement) {
//       audioElement.addEventListener('ended', handleAudioEnded);
//       console.log('Audio "ended" event listener added.');
//     }

//     return () => {
//       if (audioElement) {
//         audioElement.removeEventListener('ended', handleAudioEnded);
//         console.log('Audio "ended" event listener removed.');
//       }
//     };
//   }, [handlePostProcessing]);

//   return (
//     <div>
//       {porcupineError && <p>Error: {porcupineError.message}</p>}
//       <div>
//         <h2>Wake Word Detection</h2>
//         <p>{keywordDetection && !isProcessing ? 'Wake word detected!' : "Say 'Hey-blue' to trigger detection."}</p>
//         {isProcessing && <p>Processing...</p>}
//       </div>
//       <div>
//         <h2>Heard Message:</h2>
//         <p>{heardMessage}</p>
//       </div>
//       <div>
//         <h2>Response Audio:</h2>
//         {audioSrc && (
//           <audio
//             ref={audioRef}
//             controls
//             autoPlay
//             src={audioSrc}
//             onEnded={() => console.log('Audio ended event fired')}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default VoiceWidget;
