import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const errorTranslations: Record<string, { title: string; desc: string; reload: string }> = {
  en: {
    title: 'Application Refresh Required',
    desc: 'A component update encountered a temporary rendering exception. Click below to reload the workspace.',
    reload: 'Reload Application'
  },
  hi: {
    title: 'एप्लिकेशन रीफ्रेश आवश्यक है',
    desc: 'घटक अद्यतन में एक अस्थायी रेंडरिंग अपवाद आया। कार्यक्षेत्र पुनः लोड करने के लिए नीचे क्लिक करें।',
    reload: 'एप्लिकेशन पुनः लोड करें'
  },
  mr: {
    title: 'अ‍ॅप्लिकेशन रीफ्रेश आवश्यक आहे',
    desc: 'घटक अद्यतनात तात्पुरती त्रुटी आली. कार्यक्षेत्र पुन्हा लोड करण्यासाठी खाली क्लिक करा.',
    reload: 'अ‍ॅप्लिकेशन पुन्हा लोड करा'
  },
  ta: {
    title: 'பயன்பாட்டை புதுப்பிக்க வேண்டும்',
    desc: 'கூறு புதுப்பிப்பில் தற்காலிக ரெண்டரிங் பிழை ஏற்பட்டது. பணியிடத்தை மீண்டும் ஏற்ற கீழே கிளிக் செய்யவும்.',
    reload: 'பயன்பாட்டை மீண்டும் ஏற்று'
  }
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const lang = typeof window !== 'undefined' ? (localStorage.getItem('marinemind_lang') || 'en') : 'en';
      const tErr = errorTranslations[lang] || errorTranslations['en'];

      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-xl p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{tErr.title}</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {tErr.desc}
              </p>
            </div>
            {this.state.error && (
              <div className="p-3 bg-slate-950 rounded-lg text-left text-[11px] font-mono text-rose-300 overflow-x-auto max-h-32 border border-slate-800">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{tErr.reload}</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
