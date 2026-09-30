import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Crown, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useShop, ADMIN_EMAIL } from '../context/ShopContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthOpen, 
    setIsAuthOpen, 
    authMode, 
    setAuthMode, 
    login, 
    signup, 
    showToast 
  } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    if (authMode === 'login') {
      const res = login(email, password);
      if (res.success) {
        setIsAuthOpen(false);
        setEmail('');
        setPassword('');
      }
    } else {
      if (!name.trim()) {
        showToast('Please enter your full name', 'error');
        return;
      }
      const res = signup(name, email, password, phone);
      if (res.success) {
        setIsAuthOpen(false);
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                {authMode === 'login' ? 'Sign In to Your Account' : 'Create Customer Account'}
              </h3>
              <p className="text-[11px] text-slate-500">Ujwal Telecom & Electronics</p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2 rounded-lg transition-all ${
              authMode === 'login'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`py-2 rounded-lg transition-all ${
              authMode === 'signup'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register
          </button>
        </div>

        {/* Role Privileges Banner */}
        <div className="p-3.5 bg-emerald-50/80 border-b border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Role Access:</span> Only <strong>{ADMIN_EMAIL}</strong> receives Admin Power to edit products and manage store inventory. All other accounts are registered as standard customers.
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {authMode === 'signup' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 text-xs"
                />
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="e.g. yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 text-xs"
              />
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 text-xs"
              />
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 98036 79285"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 text-xs"
                />
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-emerald-950 hover:bg-emerald-900 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer mt-2"
          >
            <span>{authMode === 'login' ? 'Sign In' : 'Create Customer Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="pt-3 border-t border-slate-200 text-center">
            {authMode === 'login' ? (
              <p className="text-xs text-slate-500">
                New to Ujwal Telecom?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="font-bold text-emerald-800 hover:underline cursor-pointer"
                >
                  Register an account
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-emerald-800 hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};
