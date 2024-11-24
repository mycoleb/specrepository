// // src/components/ErrorBoundary.jsx
// import { Component } from 'react';

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
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can log the error to an error reporting service here
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
//           <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
//             <div className="text-center mb-4">
//               <svg 
//                 className="w-16 h-16 text-red-500 mx-auto mb-4" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   strokeWidth={2} 
//                   d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
//                 />
//               </svg>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Oops! Something went wrong
//               </h2>
//               <p className="text-gray-600 mb-4">
//                 We're sorry - something's gone wrong on our end.
//               </p>
//               {process.env.NODE_ENV === 'development' && (
//                 <div className="mt-4 p-4 bg-gray-100 rounded text-left overflow-auto">
//                   <p className="text-red-600 font-mono text-sm">
//                     {this.state.error && this.state.error.toString()}
//                   </p>
//                   <pre className="mt-2 text-gray-700 font-mono text-sm">
//                     {this.state.errorInfo && this.state.errorInfo.componentStack}
//                   </pre>
//                 </div>
//               )}
//               <button
//                 onClick={() => window.location.reload()}
//                 className="mt-4 bg-blue-500 text-white px-6 py-2 rounded
//                          hover:bg-blue-600 transition-colors"
//               >
//                 Refresh Page
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;