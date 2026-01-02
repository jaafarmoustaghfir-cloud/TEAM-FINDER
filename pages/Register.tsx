
import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { User, Shield, ArrowRight, ArrowLeft, CheckCircle2, Upload, Camera, Trophy, Info, FileImage, ShieldCheck, Mail, Phone, Globe } from 'lucide-react';
import { Position, SkillLevel, PlayerType } from '../types';
import { BRAND_ASSETS } from '../constants';
import MediaUpload from '../components/MediaUpload';

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialRole = searchParams.get('role') === 'team' ? 'team' : 'player';
  const [role, setRole] = useState<'player' | 'team'>(initialRole);
  const [step, setStep] = useState(1);

  // Form states
  const [formData, setFormData] = useState<any>({
    name: '', age: '', weight: '', height: '',
    position: Position.MID, preferredFoot: 'Right', playerType: 'Playmaker',
    skills: { speed: 50, shooting: 50, passing: 50, dribbling: 50, defense: 50 },
    careerHistory: '', trainingExperience: '', location: '',
    availability: 'Looking for a team',
    contactInfo: {
      phone: '',
      email: '',
      whatsapp: '',
      socialLink: '',
      isContactVisible: true
    },
    logo: '', photo: '',
    teamLevel: SkillLevel.BEGINNER, description: '', 
    needsPosition: [Position.ATT], needsAgeRange: '', needsSkillLevel: SkillLevel.BEGINNER
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }));
  };

  const handleSkillChange = (skill: string, value: number) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: { ...prev.skills, [skill]: value }
    }));
  };

  const validateStep1 = () => {
    const { name, contactInfo } = formData;
    if (!name.trim()) return alert('Name is required');
    if (!contactInfo.email.trim() || !contactInfo.email.includes('@')) return alert('Valid email is required');
    if (!contactInfo.phone.trim()) return alert('Phone number is required');
    nextStep();
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    alert('Account created! Awaiting admin approval.');
    navigate('/');
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-zinc-950 flex justify-center">
      <div className="max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Progress Sidebar */}
        <div className={`p-10 md:w-80 text-white flex flex-col justify-between transition-colors duration-500 ${role === 'player' ? 'bg-orange-800' : 'bg-blue-800'}`}>
          <div>
            <div className="flex items-center gap-2 mb-8">
               <img src={BRAND_ASSETS.LOGO_URL} alt="Logo" className="w-10 h-10 object-contain invert brightness-0" />
               <span className="font-black tracking-tighter uppercase">Team Finder</span>
            </div>
            <h2 className="text-3xl font-black mb-4">Registration</h2>
            <p className="text-white/70 mb-8 font-medium">Join the network as a <span className="text-white capitalize font-black">{role}</span>.</p>
            
            <div className="space-y-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${step === s ? 'bg-white text-zinc-950 border-white' : step > s ? 'bg-zinc-950/20 border-white/20' : 'border-white/20 text-white/20'}`}>
                    {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                  </div>
                  <span className={`text-sm font-bold ${step === s ? 'text-white' : 'text-white/40'}`}>
                    {s === 1 ? 'Contact & Info' : s === 2 ? (role === 'player' ? 'Athletic Stats' : 'Team Details') : 'Verification'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 p-4 bg-black/20 rounded-2xl border border-white/10">
            <p className="text-xs text-white/60 leading-tight">All profiles are reviewed by our admin team before becoming visible to the public.</p>
          </div>
        </div>

        {/* Form Area */}
        <div className="flex-1 p-10 bg-zinc-900">
          <div className="mb-8 flex items-center justify-between">
            {step > 1 && (
              <button onClick={prevStep} className="text-zinc-500 hover:text-white flex items-center gap-2 font-bold text-sm">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 ml-auto">
              <button onClick={() => {setRole('player'); setStep(1);}} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${role === 'player' ? 'bg-orange-600 text-white' : 'text-zinc-500'}`}>Player</button>
              <button onClick={() => {setRole('team'); setStep(1);}} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${role === 'team' ? 'bg-blue-600 text-white' : 'text-zinc-500'}`}>Team</button>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div>
                <h3 className="text-2xl font-black text-white mb-2">General Information</h3>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Identify yourself in the network</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Full {role === 'player' ? 'Name' : 'Team Name'}</label>
                  <input value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500 transition-colors" placeholder={role === 'player' ? 'Cristiano Ronaldo' : 'Manchester United'} />
                </div>
                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">{role === 'player' ? 'Age' : 'City'}</label>
                  <input onChange={(e) => handleInputChange(role === 'player' ? 'age' : 'location', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500" placeholder={role === 'player' ? '18' : 'Manchester'} />
                </div>
                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Country</label>
                  <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500" placeholder="United Kingdom" />
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-zinc-800">
                <h4 className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" /> Secure Contact Details
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.contactInfo.email} 
                      onChange={(e) => handleContactChange('email', e.target.value)} 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500" 
                      placeholder="scouting@pro.com" 
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.contactInfo.phone} 
                      onChange={(e) => handleContactChange('phone', e.target.value)} 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500" 
                      placeholder="+44 700 000 000" 
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">WhatsApp (Optional)</label>
                    <input 
                      type="tel" 
                      value={formData.contactInfo.whatsapp} 
                      onChange={(e) => handleContactChange('whatsapp', e.target.value)} 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500" 
                      placeholder="+44 700 000 000" 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-white text-[11px] font-black uppercase tracking-wider">Contact Visibility</p>
                        <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-tighter">Allow verified scouts to see your details</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => handleContactChange('isContactVisible', !formData.contactInfo.isContactVisible)}
                    className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${formData.contactInfo.isContactVisible ? 'bg-orange-600' : 'bg-zinc-800'}`}
                   >
                     <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.contactInfo.isContactVisible ? 'translate-x-6' : 'translate-x-0'}`} />
                   </button>
                </div>
              </div>

              <button onClick={validateStep1} className={`w-full py-4 rounded-xl font-black text-white uppercase tracking-widest flex items-center justify-center gap-2 ${role === 'player' ? 'bg-orange-600' : 'bg-blue-600'}`}>Continue <ArrowRight className="w-5 h-5" /></button>
            </div>
          )}

          {step === 2 && role === 'player' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-2xl font-black text-white">Athletic Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Height (cm)</label>
                  <input type="number" onChange={(e) => handleInputChange('height', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500" placeholder="185" />
                </div>
                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Weight (kg)</label>
                  <input type="number" onChange={(e) => handleInputChange('weight', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500" placeholder="75" />
                </div>
                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Position</label>
                  <select onChange={(e) => handleInputChange('position', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500 appearance-none">
                    {Object.values(Position).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Preferred Foot</label>
                  <select onChange={(e) => handleInputChange('preferredFoot', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-orange-500 appearance-none">
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-zinc-500 text-[10px] uppercase font-black block tracking-widest">Technical Ratings</label>
                {['speed', 'shooting', 'passing', 'dribbling', 'defense'].map(skill => (
                  <div key={skill} className="flex items-center gap-4">
                    <span className="text-xs text-white uppercase font-bold w-20">{skill}</span>
                    <input type="range" min="0" max="100" value={formData.skills[skill]} onChange={(e) => handleSkillChange(skill, parseInt(e.target.value))} className="flex-1 accent-orange-500" />
                    <span className="text-xs font-bold text-orange-500 w-8">{formData.skills[skill]}</span>
                  </div>
                ))}
              </div>
              <button onClick={nextStep} className="w-full py-4 bg-orange-600 rounded-xl font-black text-white uppercase tracking-widest">Continue</button>
            </div>
          )}

          {step === 2 && role === 'team' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-2xl font-black text-white">Team Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Competition Level</label>
                  <select 
                    value={formData.teamLevel}
                    onChange={(e) => handleInputChange('teamLevel', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-blue-500 appearance-none"
                  >
                    {Object.values(SkillLevel).map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-zinc-500 text-[10px] uppercase font-black mb-2 block tracking-widest">Club Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white outline-none focus:border-blue-500 h-32 resize-none"
                    placeholder="Brief history, facilities, and club philosophy..."
                  />
                </div>
              </div>

              {/* Recruitment Info Notice Box */}
              <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6 flex gap-4">
                <div className="bg-blue-600/20 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-black uppercase tracking-widest mb-1">Official Verification</h4>
                  <p className="text-zinc-400 text-[11px] leading-relaxed font-medium">
                    All profiles are reviewed by our admin team before becoming visible to the public.
                  </p>
                </div>
              </div>

              <button onClick={nextStep} className="w-full py-4 bg-blue-600 rounded-xl font-black text-white uppercase tracking-widest">Continue</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-zinc-800 rounded-full mx-auto flex items-center justify-center mb-6">
                  {formData.photo || formData.logo ? (
                    <img src={formData.photo || formData.logo} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <Upload className="w-8 h-8 text-zinc-500" />
                  )}
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Visual Identity</h3>
                <p className="text-zinc-500 text-sm">Upload your {role === 'player' ? 'profile photo' : 'club logo'}</p>
              </div>

              <div className="space-y-4">
                <MediaUpload 
                  label={role === 'player' ? "Upload Profile Image" : "Upload Club Logo"}
                  accept="image/*"
                  onUpload={(data) => handleInputChange(role === 'player' ? 'photo' : 'logo', data.url)}
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-zinc-800/30 border border-zinc-800 rounded-2xl">
                <Info className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <p className="text-[10px] text-zinc-400">By submitting, you agree to our terms. Your account will be verified by the Team Finder admin team.</p>
              </div>

              <button onClick={handleSubmit} className={`w-full py-4 rounded-xl font-black text-white uppercase tracking-widest ${role === 'player' ? 'bg-orange-600' : 'bg-blue-600'}`}>Complete Registration</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
