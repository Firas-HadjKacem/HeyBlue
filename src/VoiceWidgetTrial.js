// import React, { useEffect } from "react";
// import { usePorcupine } from "@picovoice/porcupine-react";

// const ACCESS_KEY = "YRUZNcqpoRrQxrTRZ5evNjMQNifWUgQ43+U+9iwv4F89HTiVdPASmw==";

// const porcupineKeyword = {
//   publicPath: process.env.PUBLIC_URL + "/Hey-blue_en_wasm_v3_0_0.ppn",
//   label: "Hey-blue"
// };

// const porcupineModel = {
//   publicPath: process.env.PUBLIC_URL + "/porcupine_params.pv"
// };

// const VoiceWidget = () => {
//   const {
//     keywordDetection,
//     error: porcupineError,
//     init,
//     start,
//   } = usePorcupine();

//   useEffect(() => {
//     console.log("Requesting microphone access...");
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then((stream) => {
//         console.log("Microphone access granted.");
//         stream.getTracks().forEach(track => track.stop());

//         console.log("Initializing Porcupine...");
//         init(ACCESS_KEY, porcupineKeyword, porcupineModel)
//           .then(() => {
//             console.log("Porcupine initialized successfully.");
//             start()
//               .then(() => {
//                 console.log("Porcupine started successfully.");
//               })
//               .catch((err) => {
//                 console.error("Failed to start Porcupine:", err);
//               });
//           })
//           .catch((err) => {
//             console.error("Failed to initialize Porcupine:", err);
//           });
//       })
//       .catch((err) => {
//         console.error("Microphone access denied:", err);
//       });
//   }, [init, start]);

//   useEffect(() => {
//     if (keywordDetection) {
//       console.log("Wake word detected!");
//     }
//   }, [keywordDetection]);

//   return (
//     <div>
//       {porcupineError && <p>Error: {porcupineError.message}</p>}
//       <div>
//         <h2>Wake Word Detection</h2>
//         <p>{keywordDetection ? "Wake word detected!" : "Say 'Hey-blue' to trigger detection."}</p>
//       </div>
//     </div>
//   );
// };

// export default VoiceWidget;


// import React, { useEffect, useState, useCallback } from "react";
// import { usePorcupine } from "@picovoice/porcupine-react";
// import { useLeopard } from "@picovoice/leopard-react";

// const ACCESS_KEY = "YRUZNcqpoRrQxrTRZ5evNjMQNifWUgQ43+U+9iwv4F89HTiVdPASmw==";

// const porcupineKeyword = {
//   publicPath: process.env.PUBLIC_URL + "/Hey-blue_en_wasm_v3_0_0.ppn",
//   label: "Hey-blue"
// };

// const porcupineModel = {
//   publicPath: process.env.PUBLIC_URL + "/porcupine_params.pv"
// };

// const leopardModel = {
//   publicPath: process.env.PUBLIC_URL + "/leopard_params.pv"
// };

// const VoiceWidget = () => {
//   const [heardMessage, setHeardMessage] = useState("");

//   const {
//     keywordDetection,
//     error: porcupineError,
//     init: initPorcupine,
//     start: startPorcupine,
//   } = usePorcupine();

//   const {
//     result,
//     isLoaded: isLeopardLoaded,
//     error: leopardError,
//     init: initLeopard,
//     startRecording,
//     stopRecording,
//   } = useLeopard();

//   useEffect(() => {
//     console.log("Requesting microphone access...");
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then((stream) => {
//         console.log("Microphone access granted.");
//         stream.getTracks().forEach(track => track.stop());

//         console.log("Initializing Porcupine...");
//         initPorcupine(ACCESS_KEY, porcupineKeyword, porcupineModel)
//           .then(() => {
//             console.log("Porcupine initialized successfully.");
//             startPorcupine()
//               .then(() => {
//                 console.log("Porcupine started successfully.");
//               })
//               .catch((err) => {
//                 console.error("Failed to start Porcupine:", err);
//               });
//           })
//           .catch((err) => {
//             console.error("Failed to initialize Porcupine:", err);
//           });

//         console.log("Initializing Leopard...");
//         initLeopard(ACCESS_KEY, leopardModel)
//           .then(() => {
//             console.log("Leopard initialized successfully.");
//           })
//           .catch((err) => {
//             console.error("Failed to initialize Leopard:", err);
//           });
//       })
//       .catch((err) => {
//         console.error("Microphone access denied:", err);
//       });
//   }, [initPorcupine, initLeopard, startPorcupine]);

//   const handleStartTranscription = useCallback(async () => {
//     console.log("Starting Leopard recording...");
//     await startRecording();
//     setTimeout(async () => {
//       await stopRecording();
//       if (result) {
//         console.log("Transcription result:", result.transcript);
//         setHeardMessage(result.transcript);
//       }
//     }, 5000); // Record for 5 seconds
//   }, [startRecording, stopRecording, result]);

//   useEffect(() => {
//     if (keywordDetection) {
//       console.log("Wake word detected!");
//       handleStartTranscription();
//     }
//   }, [keywordDetection, handleStartTranscription]);

//   return (
//     <div>
//       {porcupineError && <p>Error: {porcupineError.message}</p>}
//       {leopardError && <p>Error: {leopardError.message}</p>}
//       <div>
//         <h2>Wake Word Detection</h2>
//         <p>{keywordDetection ? "Wake word detected!" : "Say 'Hey-blue' to trigger detection."}</p>
//       </div>
//       <div>
//         <h2>Heard Message:</h2>
//         <p>{heardMessage}</p>
//       </div>
//     </div>
//   );
// };

// export default VoiceWidget;



//Works kinda well with some latency 
// import React, { useEffect, useState, useCallback } from "react";
// import { usePorcupine } from "@picovoice/porcupine-react";
// import { useLeopard } from "@picovoice/leopard-react";

// const ACCESS_KEY = "YRUZNcqpoRrQxrTRZ5evNjMQNifWUgQ43+U+9iwv4F89HTiVdPASmw==";

// const porcupineKeyword = {
//   publicPath: process.env.PUBLIC_URL + "/Hey-blue_en_wasm_v3_0_0.ppn",
//   label: "Hey-blue"
// };

// const porcupineModel = {
//   publicPath: process.env.PUBLIC_URL + "/porcupine_params.pv"
// };

// const leopardModel = {
//   publicPath: process.env.PUBLIC_URL + "/leopard_params.pv"
// };

// const VoiceWidget = () => {
//   const [heardMessage, setHeardMessage] = useState("");

//   const {
//     keywordDetection,
//     error: porcupineError,
//     init: initPorcupine,
//     start: startPorcupine,
//   } = usePorcupine();

//   const {
//     result,
//     error: leopardError,
//     init: initLeopard,
//     startRecording,
//     stopRecording,
//   } = useLeopard();

//   useEffect(() => {
//     const requestMicrophoneAccess = async () => {
//       try {
//         await navigator.mediaDevices.getUserMedia({ audio: true });
//         console.log("Microphone access granted.");

//         await initPorcupine(ACCESS_KEY, porcupineKeyword, porcupineModel);
//         console.log("Porcupine initialized successfully.");
//         await startPorcupine();
//         console.log("Porcupine started successfully.");

//         await initLeopard(ACCESS_KEY, leopardModel);
//         console.log("Leopard initialized successfully.");
//       } catch (err) {
//         console.error("Initialization error:", err);
//       }
//     };

//     requestMicrophoneAccess();
//   }, [initPorcupine, startPorcupine, initLeopard]);

//   const handleStartTranscription = useCallback(async () => {
//     try {
//       console.log("Starting Leopard recording...");
//       await startRecording();
//       setTimeout(async () => {
//         await stopRecording();
//         if (result) {
//           console.log("Transcription result:", result.transcript);
//           setHeardMessage(result.transcript);
//         }
//       }, 5000); // Record for 5 seconds
//     } catch (err) {
//       console.error("Recording error:", err);
//     }
//   }, [startRecording, stopRecording, result]);

//   useEffect(() => {
//     if (keywordDetection) {
//       console.log("Wake word detected!");
//       handleStartTranscription();
//     }
//   }, [keywordDetection, handleStartTranscription]);

//   return (
//     <div>
//       {porcupineError && <p>Error: {porcupineError.message}</p>}
//       {leopardError && <p>Error: {leopardError.message}</p>}
//       <div>
//         <h2>Wake Word Detection</h2>
//         <p>{keywordDetection ? "Wake word detected!" : "Say 'Hey-blue' to trigger detection."}</p>
//       </div>
//       <div>
//         <h2>Heard Message:</h2>
//         <p>{heardMessage}</p>
//       </div>
//     </div>
//   );
// };

// export default VoiceWidget;


// with endpoint
// import React, { useEffect, useState, useCallback } from "react";
// import { usePorcupine } from "@picovoice/porcupine-react";
// import { useLeopard } from "@picovoice/leopard-react";

// const ACCESS_KEY = "YRUZNcqpoRrQxrTRZ5evNjMQNifWUgQ43+U+9iwv4F89HTiVdPASmw==";

// const porcupineKeyword = {
//   publicPath: process.env.PUBLIC_URL + "/Hey-blue_en_wasm_v3_0_0.ppn",
//   label: "Hey-blue"
// };

// const porcupineModel = {
//   publicPath: process.env.PUBLIC_URL + "/porcupine_params.pv"
// };

// const leopardModel = {
//   publicPath: process.env.PUBLIC_URL + "/leopard_params.pv"
// };

// const VoiceWidget = () => {
//   const [heardMessage, setHeardMessage] = useState("");
//   const [audioSrc, setAudioSrc] = useState("");

//   const {
//     keywordDetection,
//     error: porcupineError,
//     init: initPorcupine,
//     start: startPorcupine,
//   } = usePorcupine();

//   const {
//     result,
//     error: leopardError,
//     init: initLeopard,
//     startRecording,
//     stopRecording,
//   } = useLeopard();

//   useEffect(() => {
//     const requestMicrophoneAccess = async () => {
//       try {
//         await navigator.mediaDevices.getUserMedia({ audio: true });
//         console.log("Microphone access granted.");

//         await initPorcupine(ACCESS_KEY, porcupineKeyword, porcupineModel);
//         console.log("Porcupine initialized successfully.");
//         await startPorcupine();
//         console.log("Porcupine started successfully.");

//         await initLeopard(ACCESS_KEY, leopardModel);
//         console.log("Leopard initialized successfully.");
//       } catch (err) {
//         console.error("Initialization error:", err);
//       }
//     };

//     requestMicrophoneAccess();
//   }, [initPorcupine, startPorcupine, initLeopard]);

//   const handleStartTranscription = useCallback(async () => {
//     try {
//       console.log("Starting Leopard recording...");
//       await startRecording();
//       // Record until manually stopped
//     } catch (err) {
//       console.error("Recording error:", err);
//     }
//   }, [startRecording]);

//   const handleStopTranscription = useCallback(async () => {
//     try {
//       await stopRecording();
//       if (result) {
//         console.log("Transcription result:", result.transcript);
//         setHeardMessage(result.transcript);
//         postToEndpoint(result.transcript);
//       }
//     } catch (err) {
//       console.error("Stopping recording error:", err);
//     }
//   }, [stopRecording, result]);

//   const postToEndpoint = async (transcription) => {
//     try {
//       const response = await fetch("https://dev.core.memorality.com/playgrounds/666cf43cd7b3507778ded7c9/execute", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ input: transcription }),
//       });
//       const data = await response.json();
//       if (data.result && data.result.OutputUri) {
//         setAudioSrc(data.result.OutputUri);
//       } else {
//         console.error("Invalid response structure:", data);
//       }
//     } catch (error) {
//       console.error("Error posting to endpoint:", error);
//     }
//   };

//   useEffect(() => {
//     if (keywordDetection) {
//       console.log("Wake word detected!");
//       handleStartTranscription();
//       setTimeout(handleStopTranscription, 5000); // Automatically stop after 5 seconds
//     }
//   }, [keywordDetection, handleStartTranscription, handleStopTranscription]);

//   return (
//     <div>
//       {porcupineError && <p>Error: {porcupineError.message}</p>}
//       {leopardError && <p>Error: {leopardError.message}</p>}
//       <div>
//         <h2>Wake Word Detection</h2>
//         <p>{keywordDetection ? "Wake word detected!" : "Say 'Hey-blue' to trigger detection."}</p>
//       </div>
//       <div>
//         <h2>Heard Message:</h2>
//         <p>{heardMessage}</p>
//       </div>
//       <div>
//         <h2>Response Audio:</h2>
//         {audioSrc && <audio controls autoPlay src={audioSrc} />}
//       </div>
//     </div>
//   );
// };

// export default VoiceWidget;


//Better version

// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { usePorcupine } from "@picovoice/porcupine-react";
// import { useLeopard } from "@picovoice/leopard-react";

// const ACCESS_KEY = "YRUZNcqpoRrQxrTRZ5evNjMQNifWUgQ43+U+9iwv4F89HTiVdPASmw==";

// const porcupineKeyword = {
//   publicPath: process.env.PUBLIC_URL + "/Hey-blue_en_wasm_v3_0_0.ppn",
//   label: "Hey-blue"
// };

// const porcupineModel = {
//   publicPath: process.env.PUBLIC_URL + "/porcupine_params.pv"
// };

// const leopardModel = {
//   publicPath: process.env.PUBLIC_URL + "/leopard_params.pv"
// };

// const VoiceWidget = () => {
//   const [heardMessage, setHeardMessage] = useState("");
//   const [audioSrc, setAudioSrc] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const audioRef = useRef(null);

//   const {
//     keywordDetection,
//     error: porcupineError,
//     init: initPorcupine,
//     start: startPorcupine,
//     stop: stopPorcupine,
//   } = usePorcupine();

//   const {
//     result,
//     error: leopardError,
//     init: initLeopard,
//     startRecording,
//     stopRecording,
//   } = useLeopard();

//   useEffect(() => {
//     const requestMicrophoneAccess = async () => {
//       try {
//         await navigator.mediaDevices.getUserMedia({ audio: true });
//         console.log("Microphone access granted.");

//         await initPorcupine(ACCESS_KEY, porcupineKeyword, porcupineModel);
//         console.log("Porcupine initialized successfully.");
//         await startPorcupine();
//         console.log("Porcupine started successfully.");

//         await initLeopard(ACCESS_KEY, leopardModel);
//         console.log("Leopard initialized successfully.");
//       } catch (err) {
//         console.error("Initialization error:", err);
//       }
//     };

//     requestMicrophoneAccess();
//   }, [initPorcupine, startPorcupine, initLeopard]);

//   const postToEndpoint = useCallback(async (transcription) => {
//     try {
//       const response = await fetch("https://dev.core.memorality.com/playgrounds/666cf43cd7b3507778ded7c9/execute", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ input: transcription }),
//       });
//       const data = await response.json();
//       if (data.result && data.result.OutputUri) {
//         setAudioSrc(data.result.OutputUri);
//       } else {
//         console.error("Invalid response structure:", data);
//         setIsProcessing(false);
//         console.log("Starting Porcupine after invalid response structure...");
//         await startPorcupine();
//         console.log("Porcupine started after invalid response.");
//       }
//     } catch (error) {
//       console.error("Error posting to endpoint:", error);
//       setIsProcessing(false);
//       console.log("Starting Porcupine after error...");
//       await startPorcupine();
//       console.log("Porcupine started after error.");
//     }
//   }, [startPorcupine]);

//   const handleStartTranscription = useCallback(async () => {
//     try {
//       console.log("Starting Leopard recording...");
//       await startRecording();
//     } catch (err) {
//       console.error("Recording error:", err);
//     }
//   }, [startRecording]);

//   const handleStopTranscription = useCallback(async () => {
//     try {
//       console.log("Stopping Leopard recording...");
//       await stopRecording();
//       console.log("Leopard recording stopped.");
//       if (result && result.transcript) {
//         console.log("Transcription result:", result.transcript);
//         setHeardMessage(result.transcript);
//         await postToEndpoint(result.transcript);
//       } else {
//         console.log("No transcription result found.");
//         setIsProcessing(false);
//         console.log("Starting Porcupine after no transcription result...");
//         await startPorcupine();
//         console.log("Porcupine started after no transcription result.");
//       }
//     } catch (err) {
//       console.error("Stopping recording error:", err);
//       setIsProcessing(false);
//       console.log("Starting Porcupine after stopping recording error...");
//       await startPorcupine();
//       console.log("Porcupine started after stopping recording error.");
//     }
//   }, [stopRecording, result, startPorcupine, postToEndpoint]);

//   useEffect(() => {
//     const processTranscription = async () => {
//       if (keywordDetection && !isProcessing) {
//         setIsProcessing(true);
//         console.log("Stopping Porcupine...");
//         await stopPorcupine();
//         console.log("Porcupine stopped.");
//         console.log("Wake word detected!");
//         await handleStartTranscription();
//         setTimeout(async () => {
//           await handleStopTranscription();
//           console.log("Leopard transcription completed.");
//         }, 5000); // Automatically stop after 5 seconds
//       }
//     };

//     processTranscription();
//   }, [keywordDetection, handleStartTranscription, handleStopTranscription, isProcessing, stopPorcupine]);

//   useEffect(() => {
//     const handleAudioEnded = async () => {
//       console.log("Audio playback finished. Resuming Porcupine...");
//       setIsProcessing(false);
//       try {
//         await startPorcupine(); // Resume wake word detection after audio finishes playing
//         console.log("Porcupine resumed successfully after audio ended.");
//       } catch (err) {
//         console.error("Error resuming Porcupine after audio ended:", err);
//       }
//     };

//     const audioElement = audioRef.current;
//     if (audioElement) {
//       audioElement.addEventListener("ended", handleAudioEnded);
//       console.log("Audio 'ended' event listener added.");
//     }

//     return () => {
//       if (audioElement) {
//         audioElement.removeEventListener("ended", handleAudioEnded);
//         console.log("Audio 'ended' event listener removed.");
//       }
//     };
//   }, [startPorcupine]);

//   return (
//     <div>
//       {porcupineError && <p>Error: {porcupineError.message}</p>}
//       {leopardError && <p>Error: {leopardError.message}</p>}
//       <div>
//         <h2>Wake Word Detection</h2>
//         <p>{keywordDetection && !isProcessing ? "Wake word detected!" : "Say 'Hey-blue' to trigger detection."}</p>
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
//             onEnded={() => console.log("Audio ended event fired")}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default VoiceWidget;


//With web speech ai
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
//   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//   const audioRef = useRef(null);

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

//     recognition.onend = async () => {
//       console.log('Speech recognition ended.');
//       setIsProcessing(false);
//       if (!isAudioPlaying) {
//         try {
//           await startPorcupine();
//           console.log('Porcupine resumed listening for wake words.');
//         } catch (err) {
//           console.error('Error resuming Porcupine after speech recognition ended:', err);
//         }
//       }
//     };

//     recognition.onresult = (event) => {
//       const result = event.results[0][0].transcript;
//       setHeardMessage(result);
//       console.log('Transcription result:', result);
//       postToEndpoint(result);
//     };

//     recognition.onerror = async (event) => {
//       console.error('Speech recognition error:', event.error);
//       setIsProcessing(false);
//       if (!isAudioPlaying) {
//         try {
//           await startPorcupine();
//           console.log('Porcupine resumed listening for wake words after error.');
//         } catch (err) {
//           console.error('Error resuming Porcupine after speech recognition error:', err);
//         }
//       }
//     };

//     recognition.start();
//   }, [startPorcupine, isAudioPlaying]);

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
//     const handleAudioEnded = async () => {
//       console.log('Audio playback finished. Resuming Porcupine...');
//       setIsAudioPlaying(false);
//       setIsProcessing(false);
//       try {
//         await startPorcupine();
//         console.log('Porcupine resumed successfully after audio ended.');
//       } catch (err) {
//         console.error('Error resuming Porcupine after audio ended:', err);
//       }
//     };

//     const audioElement = audioRef.current;
//     if (audioElement) {
//       audioElement.addEventListener('ended', handleAudioEnded);
//       audioElement.addEventListener('play', () => setIsAudioPlaying(true));
//       console.log('Audio "ended" and "play" event listeners added.');
//     }

//     return () => {
//       if (audioElement) {
//         audioElement.removeEventListener('ended', handleAudioEnded);
//         audioElement.removeEventListener('play', () => setIsAudioPlaying(true));
//         console.log('Audio "ended" and "play" event listeners removed.');
//       }
//     };
//   }, [startPorcupine]);

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
