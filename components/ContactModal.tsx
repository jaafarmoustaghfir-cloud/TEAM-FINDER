
import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientType: 'Player' | 'Team';
  initialSubject?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, recipientName, recipientType, initialSubject }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, message: initialSubject ? `${initialSubject}\n\n` : '' }));
      setStatus('idle');
      setErrors({});
    }
  }, [isOpen, initialSubject]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('success');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-12">
          {status === 'success' ? (
            <div className="text-center py-8 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Message Sent!</h3>
              <p className="text-zinc-500 mb-8 font-medium">Your message has been delivered to {recipientName}. Expect a response soon.</p>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-xs"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">Direct Inquiry</span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Contact {recipientName}</h2>
                <p className="text-zinc-500 text-sm mt-2">Send a professional message to this {recipientType.toLowerCase()}.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Your Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-zinc-950 border ${errors.name ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl p-4 text-white outline-none focus:border-orange-500 transition-colors text-sm`}
                    placeholder="John Doe"
                  />
                  {errors.name && <div className="mt-1 flex items-center gap-1 text-red-500 text-[10px] font-bold uppercase"><AlertCircle className="w-3 h-3" /> {errors.name}</div>}
                </div>

                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-zinc-950 border ${errors.email ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl p-4 text-white outline-none focus:border-orange-500 transition-colors text-sm`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <div className="mt-1 flex items-center gap-1 text-red-500 text-[10px] font-bold uppercase"><AlertCircle className="w-3 h-3" /> {errors.email}</div>}
                </div>

                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Your Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-zinc-950 border ${errors.message ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl p-4 text-white outline-none focus:border-orange-500 transition-colors text-sm resize-none`}
                    placeholder={`Write your inquiry for ${recipientName}...`}
                  />
                  {errors.message && <div className="mt-1 flex items-center gap-1 text-red-500 text-[10px] font-bold uppercase"><AlertCircle className="w-3 h-3" /> {errors.message}</div>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full py-5 rounded-2xl font-black text-white uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] ${
                    status === 'submitting' ? 'bg-zinc-800' : recipientType === 'Player' ? 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/20' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20'
                  }`}
                >
                  {status === 'submitting' ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
