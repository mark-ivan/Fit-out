import React, { useState } from 'react';
import { UserProfile, WeeklyPlan } from '../types';
import PlanView from './PlanView';
import { Calendar, UserCircle, RefreshCcw, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  user: UserProfile;
  plan: WeeklyPlan;
  onReset: () => void;
}

const Dashboard: React.FC<Props> = ({ user, plan, onReset }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [activeTab, setActiveTab] = useState<'plan' | 'stats'>('plan');

  // Mock data for the chart based on the plan
  const chartData = plan.days.map((d, i) => {
    const totalCal = d.meals.breakfast.calories + d.meals.lunch.calories + d.meals.dinner.calories + (d.meals.snack?.calories || 0);
    return {
      name: d.day.slice(0, 3), // Mon, Tue...
      calories: totalCal,
      workouts: d.workouts.length
    };
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-4 pb-24">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-slate-900">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Hi, {user.name}! 👋</h1>
            <p className="text-slate-400 text-sm">今日目标: {plan.days[selectedDay].focus}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
           <button 
             onClick={() => setActiveTab('plan')}
             className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'plan' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
           >
             <Calendar className="w-4 h-4" /> 计划
           </button>
           <button 
             onClick={() => setActiveTab('stats')}
             className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'stats' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
           >
             <TrendingUp className="w-4 h-4" /> 统计
           </button>
           <button onClick={onReset} className="p-2 bg-slate-800 text-slate-400 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-colors" title="重新生成">
             <RefreshCcw className="w-5 h-5" />
           </button>
        </div>
      </header>

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
             <div className="glass-panel p-6 rounded-3xl">
                <h3 className="text-slate-400 text-sm font-bold mb-1">当前体重</h3>
                <p className="text-3xl font-black text-white">{user.weight} <span className="text-sm text-slate-500">kg</span></p>
             </div>
             <div className="glass-panel p-6 rounded-3xl">
                <h3 className="text-slate-400 text-sm font-bold mb-1">目标</h3>
                <p className="text-3xl font-black text-white">{user.goal}</p>
             </div>
             <div className="glass-panel p-6 rounded-3xl">
                <h3 className="text-slate-400 text-sm font-bold mb-1">本周训练</h3>
                <p className="text-3xl font-black text-white">{plan.days.reduce((acc, d) => acc + d.workouts.length, 0)} <span className="text-sm text-slate-500">节课</span></p>
             </div>
          </div>
          
          <div className="glass-panel p-6 rounded-3xl h-80 w-full">
            <h3 className="text-lg font-bold text-white mb-4">卡路里摄入预测</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', color: '#fff'}}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="calories" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Plan Tab */}
      {activeTab === 'plan' && (
        <div>
          {/* Day Selector */}
          <div className="flex overflow-x-auto gap-3 pb-4 mb-2 no-scrollbar">
            {plan.days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDay(idx)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold transition-all border ${
                  selectedDay === idx
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent shadow-lg shadow-indigo-500/30 scale-105'
                    : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800'
                }`}
              >
                {day.day}
              </button>
            ))}
          </div>

          <PlanView plan={plan} dayIndex={selectedDay} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
