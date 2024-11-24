// // src/components/LoadingSpinner.jsx
// function LoadingSpinner() {
//     return (
//       <div className="flex justify-center items-center p-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         <span className="ml-3 text-gray-700">Loading...</span>
//       </div>
//     );
//   }
  
//   // src/components/ErrorMessage.jsx
//   function ErrorMessage({ message, onRetry }) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex flex-col items-center">
//         <p className="text-red-800 mb-3">{message}</p>
//         {onRetry && (
//           <button 
//             onClick={onRetry}
//             className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200"
//           >
//             Try Again
//           </button>
//         )}
//       </div>
//     );
//   }
  
//   export { LoadingSpinner, ErrorMessage };