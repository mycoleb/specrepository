// // src/components/error/ErrorBoundary.jsx
// import { Component } from 'react';
// import { ErrorMessage } from './ErrorMessage';

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       hasError: false,
//       error: null,
//       errorInfo: null
//     };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error('Error caught by boundary:', error, errorInfo);
//     this.setState({
//       error: error,
//       errorInfo: errorInfo
//     });
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//           <ErrorMessage 
//             error={this.state.error}
//             errorInfo={this.state.errorInfo}
//             onRetry={() => window.location.reload()}
//             isBoundary={true}
//           />
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// // src/components/error/ErrorMessage.jsx
// import { useState } from 'react';
// import PropTypes from 'prop-types';

// function ErrorMessage({ 
//   error, 
//   errorInfo,
//   onRetry, 
//   maxRetries = 3,
//   retryInterval = 3000,
//   isBoundary = false
// }) {
//   const [retryCount, setRetryCount] = useState(0);
//   const [isRetrying, setIsRetrying] = useState(false);

//   const getErrorMessage = (error) => {
//     if (typeof error === 'string') return error;
    
//     if (error instanceof Error) {
//       if (error.name === 'NetworkError' || error.message.includes('fetch')) {
//         return 'Network connection error. Please check your internet connection.';
//       }
//       if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
//         return 'Request timed out. Server might be busy.';
//       }
//       if (error.code === 'auth/user-not-found') {
//         return 'User not found. Please sign in again.';
//       }
//       return error.message;
//     }

//     if (error.status === 404) {
//       return 'Resource not found. Please try a different category or difficulty.';
//     }
//     if (error.status === 429) {
//       return 'Too many requests. Please wait a moment before trying again.';
//     }
    
//     return 'An unexpected error occurred.';
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
//         <div className="flex-shrink-0">
//           <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
//                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>

//         <div className="ml-3 w-full">
//           <h3 className="text-red-800 font-medium mb-2">
//             {isBoundary ? 'Application Error' : 'Error Encountered'}
//           </h3>
//           <p className="text-red-700 mb-4">
//             {getErrorMessage(error)}
//           </p>

//           {process.env.NODE_ENV === 'development' && (
//             <div className="bg-red-100 p-3 rounded mb-4 overflow-auto">
//               <p className="font-mono text-sm text-red-900">
//                 {error.stack || error.toString()}
//               </p>
//               {errorInfo && (
//                 <pre className="mt-2 font-mono text-sm text-red-800">
//                   {errorInfo.componentStack}
//                 </pre>
//               )}
//             </div>
//           )}

//           {onRetry && remainingRetries > 0 && !isBoundary && (
//             <div className="flex items-center justify-between">
//               <button
//                 onClick={handleRetry}
//                 disabled={isRetrying}
//                 className={`
//                   flex items-center px-4 py-2 rounded
//                   ${isRetrying ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-100 hover:bg-red-200 text-red-700'}
//                 `}
//               >
//                 {isRetrying ? 'Retrying...' : 'Retry Now'}
//               </button>
//               <span className="text-sm text-red-600">
//                 {remainingRetries} {remainingRetries === 1 ? 'retry' : 'retries'} remaining
//               </span>
//             </div>
//           )}

//           <div className="mt-4 space-x-4">
//             <button
//               onClick={() => window.location.reload()}
//               className="text-red-700 hover:text-red-800 text-sm"
//             >
//               Refresh Page
//             </button>
//             {!isBoundary && (
//               <a href="/" className="text-red-700 hover:text-red-800 text-sm">
//                 Return Home
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ErrorMessage.propTypes = {
//   error: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.object,
//     PropTypes.instanceOf(Error)
//   ]).isRequired,
//   errorInfo: PropTypes.object,
//   onRetry: PropTypes.func,
//   maxRetries: PropTypes.number,
//   retryInterval: PropTypes.number,
//   isBoundary: PropTypes.bool
// };

// // src/components/error/withErrorBoundary.jsx
// import { ErrorBoundary } from './ErrorBoundary';

// function withErrorBoundary(WrappedComponent, options = {}) {
//   return function WithErrorBoundaryWrapper(props) {
//     return (
//       <ErrorBoundary {...options}>
//         <WrappedComponent {...props} />
//       </ErrorBoundary>
//     );
//   };
// }

// export default withErrorBoundary;