import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-sugan-bone flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">😕</span>
            </div>
            <h1 className="font-display text-2xl text-sugan-ink mb-2">
              Something went wrong
            </h1>
            <p className="text-sugan-ink/60 font-body mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page or go back to the home page.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 py-3 bg-sugan-ink text-sugan-bone rounded-lg font-body hover:bg-sugan-ink/90 transition-colors"
              >
                Refresh Page
              </button>
              <a
                href="/"
                className="flex-1 py-3 border-2 border-sugan-ink text-sugan-ink rounded-lg font-body hover:bg-sugan-ink hover:text-sugan-bone transition-colors"
              >
                Go Home
              </a>
            </div>
            <p className="text-xs text-sugan-ink/40 font-body mt-6">
              If the problem persists, please contact us at contact@sugan.shop
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
