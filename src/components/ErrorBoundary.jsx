import React from 'react';
import { RefreshCw, Heart, ShieldAlert } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('ErrorBoundary caught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-center">
          <div className="max-w-lg bg-white rounded-3xl p-8 shadow-2xl border-4 border-amber-200 space-y-6">
            <div className="w-20 h-20 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto text-4xl">
              🌿
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Everything is Safe, Eleanor
              </h2>
              <p className="text-xl text-slate-700 leading-relaxed">
                The screen paused for a quiet moment. Tap below to reload your home gently.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="min-h-[64px] w-full px-8 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
            >
              <RefreshCw className="w-6 h-6" />
              <span>Tap to Return Home</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
