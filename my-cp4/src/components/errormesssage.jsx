// // src/components/ErrorMessage.jsx
// import { useState } from 'react';

// function ErrorMessage({ 
//   error, 
//   onRetry, 
//   maxRetries = 3,
//   retryInterval = 3000 // 3 seconds
// }) {
//   const [retryCount, setRetryCount] = useState(0);
//   const [isRetrying, setIsRetrying] = useState(false);

//   const getErrorMessage = (error) => {
//     if (error.name === 'NetworkError' || error.message.includes('fetch')) {
//       return 'Network connection error. Please check your internet connection.';
//     }
//     if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
//       return 'Request timed out. Server might be busy.';
//     }
//     if (error.status === 404) {
//       return 'Resource not found. Please try a different category or difficulty.';
//     }
//     if (error.status === 429) {
//       return 'Too many requests. Please wait a moment before trying again.';
//     }
//     if (error.code === 'auth/user-not-found') {
//       return 'User not found. Please sign in again.';
//     }
//     return error.message || 'An unexpected error occurred.';
//   };

//   const handleRetry = async () => {
//     if (retryCount >= maxRetries || !onRetry || isRetrying) return;

//     setIsRetrying(true);
//     setRetryCount(prev => prev + 1);

//     try {
//       await new Promise(resolve => setTimeout(resolve, retryInterval));
//       await onRetry();
//     } catch (error) {
//       console.error('Retry failed:', error);
//     } finally {
//       setIsRetrying(false);
//     }
//   };

//   const remainingRetries = maxRetries - retryCount;

//   return (
//     <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-4">
//       <div className="flex items-start">
//         {/* Error Icon */}
//         <div className="flex-shrink-0">
//           <svg 
//             className="h-6 w-6 text-red-400" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth="2" 
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
//             />
//           </svg>
//         </div>

//         {/* Error Content */}
//         <div className="ml-3 w-full">
//           <h3 className="text-red-800 font-medium mb-2">
//             Error Encountered
//           </h3>
//           <p className="text-red-700 mb-4">
//             {getErrorMessage(error)}
//           </p>

//           {/* Technical Details (only in development) */}
//           {process.env.NODE_ENV === 'development' && (
//             <div className="bg-red-100 p-3 rounded mb-4 overflow-auto">
//               <p className="font-mono text-sm text-red-900">
//                 {error.stack || error.toString()}
//               </p>
//             </div>
//           )}

//           {/* Retry Section */}
//           {onRetry && remainingRetries > 0 && (
//             <div className="flex items-center justify-between">
//               <button
//                 onClick={handleRetry}
//                 disabled={isRetrying}
//                 className={`
//                   flex items-center px-4 py-2 rounded
//                   ${isRetrying 
//                     ? 'bg-gray-300 cursor-not-allowed' 
//                     : 'bg-red-100 hover:bg-red-200 text-red-700'}
//                 `}
//               >
//                 {isRetrying ? (
//                   <>
//                     <svg 
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-700" 
//                       fill="none" 
//                       viewBox="0 0 24 24"
//                     >
//                       <circle 
//                         className="opacity-25" 
//                         cx="12" 
//                         cy="12" 
//                         r="10" 
//                         stroke="currentColor" 
//                         strokeWidth="4"
//                       />
//                       <path 
//                         className="opacity-75" 
//                         fill="currentColor" 
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Retrying...
//                   </>
//                 ) : (
//                   <>
//                     <svg 
//                       className="w-5 h-5 mr-2" 
//                       fill="none" 
//                       stroke="currentColor" 
//                       viewBox="0 0 24 24"
//                     >
//                       <path 
//                         strokeLinecap="round" 
//                         strokeLinejoin="round" 
//                         strokeWidth="2" 
//                         d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
//                       />
//                     </svg>
//                     Retry Now
//                   </>
//                 )}
//               </button>
//               <span className="text-sm text-red-600">
//                 {remainingRetries} {remainingRetries === 1 ? 'retry' : 'retries'} remaining
//               </span>
//             </div>
//           )}

//           {/* Alternative Actions */}
//           <div className="mt-4 space-x-4">
//             <button
//               onClick={() => window.location.reload()}
//               className="text-red-700 hover:text-red-800 text-sm"
//             >
//               Refresh Page
//             </button>
//             <a 
//               href="/"
//               className="text-red-700 hover:text-red-800 text-sm"
//             >
//               Return Home
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ErrorMessage;