import React, { ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Error Boundary to catch crashes and show a helpful message
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-2xl">
            <h1 className="text-3xl font-bold text-red-400 mb-4">Something went wrong</h1>
            <p className="text-slate-300 mb-6">The application crashed. Here is the error message:</p>
            <pre className="bg-slate-900 p-4 rounded-lg text-red-300 overflow-x-auto text-sm font-mono text-left">
              {this.state.error?.toString()}
            </pre>
            <p className="mt-6 text-slate-400 text-sm">
              Please check your browser console (F12) for more details.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);