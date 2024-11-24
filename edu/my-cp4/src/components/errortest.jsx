// // src/components/ErrorTest.jsx
// function ErrorTest() {
//     const [shouldError, setShouldError] = useState(false);
  
//     if (shouldError) {
//       throw new Error('Test error!');
//     }
  
//     return (
//       <button
//         onClick={() => setShouldError(true)}
//         className="bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Trigger Error
//       </button>
//     );
//   }
  
//   export default ErrorTest;