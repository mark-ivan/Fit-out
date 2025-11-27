import React, { useState } from 'react';
import { UserProfile, Gender, Goal } from '../types';
import { Zap, Activity, Utensils, ChevronRight } from 'lucide-react';

interface Props {
  onComplete: (profile: UserProfile) => void;
  isLoading: boolean;
}

const Onboarding: React.FC<Props> = ({ onComplete, isLoading }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: Gender.Male,
    goal: Goal.LoseWeight,
    activityLevel: 'Sedentary',
    dietaryRestrictions: '',
  });

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    if (profile.name && profile.age && profile.height && profile.weight) {
      onComplete(profile as UserProfile);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto p-4">
      <div className="glass-panel w-full p-8 rounded-3xl relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-black text-center mb-2 bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 text-transparent bg-clip-text animate-pulse">
            FitToon AI
          </h1>
          <p className="text-center text-slate-300 mb-8">打造你的专属二次元健身计划</p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-700 rounded-full mb-8">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="text-yellow-400" /> 基础档案
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-1">昵称</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all text-white"
                    placeholder="你的名字"
                    value={profile.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-400 mb-1">性别</label>
                   <select 
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500"
                      value={profile.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                   >
                     {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                   </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-1">年龄</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500"
                    placeholder="25"
                    value={profile.age || ''}
                    onChange={(e) => handleChange('age', Number(e.target.value))}
                  />
                </div>
              </div>
              <button 
                onClick={nextStep}
                disabled={!profile.name || !profile.age}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                下一步 <ChevronRight />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="text-cyan-400" /> 身体数据
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-1">身高 (cm)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="175"
                    value={profile.height || ''}
                    onChange={(e) => handleChange('height', Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-1">体重 (kg)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="70"
                    value={profile.weight || ''}
                    onChange={(e) => handleChange('weight', Number(e.target.value))}
                  />
                </div>
                <div className="md:col-span-2">
                   <label className="block text-sm font-bold text-slate-400 mb-1">日常活动量</label>
                   <select 
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                      value={profile.activityLevel}
                      onChange={(e) => handleChange('activityLevel', e.target.value)}
                   >
                     <option value="Sedentary">久坐不动 (办公室工作)</option>
                     <option value="Lightly Active">轻度活动 (每周运动1-2次)</option>
                     <option value="Active">活跃 (每周运动3-5次)</option>
                     <option value="Very Active">非常活跃 (每天高强度运动)</option>
                   </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-slate-200 transition-all">返回</button>
                <button 
                  onClick={nextStep}
                  disabled={!profile.height || !profile.weight}
                  className="flex-[2] py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  下一步 <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Utensils className="text-lime-400" /> 目标与饮食
              </h2>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">主要目标</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(Goal).map((g) => (
                    <button
                      key={g}
                      onClick={() => handleChange('goal', g)}
                      className={`p-4 rounded-xl border-2 transition-all font-bold text-sm ${
                        profile.goal === g 
                        ? 'border-lime-500 bg-lime-500/20 text-lime-400' 
                        : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-1">饮食偏好/忌口 (选填)</label>
                <textarea 
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500"
                  placeholder="例如：不吃香菜，乳糖不耐受，素食..."
                  rows={3}
                  value={profile.dietaryRestrictions || ''}
                  onChange={(e) => handleChange('dietaryRestrictions', e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-slate-200 transition-all">返回</button>
                <button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-[2] py-4 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-400 hover:to-green-500 rounded-xl font-bold text-lg text-white shadow-lg shadow-lime-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      AI生成中...
                    </>
                  ) : (
                    <>
                      生成计划 <Zap />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Onboarding;
