import React from 'react';
import { WeeklyPlan, DailyPlan, Workout, Meal } from '../types';
import { CheckCircle2, Circle, Dumbbell, Coffee, Sun, Moon, Flame } from 'lucide-react';

interface Props {
  plan: WeeklyPlan;
  dayIndex: number;
}

const PlanView: React.FC<Props> = ({ plan, dayIndex }) => {
  const currentDay = plan.days[dayIndex];

  if (!currentDay) return <div className="text-center text-slate-400 mt-10">请选择日期查看计划</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      
      {/* Header Summary */}
      <div className="glass-panel p-6 rounded-3xl border-l-4 border-indigo-500">
        <h2 className="text-2xl font-bold text-white mb-2">{currentDay.day} - {currentDay.focus}</h2>
        <p className="text-slate-300">{plan.summary.substring(0, 100)}...</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Workouts Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Dumbbell className="w-6 h-6" /> 今日训练
          </h3>
          {currentDay.workouts.map((workout, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl card-hover relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-50">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  workout.intensity === 'High' ? 'bg-red-500/20 text-red-300' :
                  workout.intensity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {workout.intensity} Intensity
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-1">{workout.name}</h4>
              <p className="text-sm text-slate-400 mb-3">{workout.duration} 分钟</p>
              
              <div className="space-y-2">
                {workout.exercises.map((ex, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {currentDay.workouts.length === 0 && (
             <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 border-dashed border-2 border-slate-700">
               今日休息日！好好恢复 💪
             </div>
          )}
        </div>

        {/* Meals Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-pink-400 flex items-center gap-2">
            <Flame className="w-6 h-6" /> 今日饮食
          </h3>
          
          <MealCard meal={currentDay.meals.breakfast} type="早餐" icon={<Coffee className="w-4 h-4" />} color="text-yellow-300" />
          <MealCard meal={currentDay.meals.lunch} type="午餐" icon={<Sun className="w-4 h-4" />} color="text-orange-400" />
          <MealCard meal={currentDay.meals.dinner} type="晚餐" icon={<Moon className="w-4 h-4" />} color="text-indigo-300" />
          {currentDay.meals.snack && (
             <MealCard meal={currentDay.meals.snack} type="加餐" icon={<Circle className="w-4 h-4" />} color="text-pink-300" />
          )}
        </div>

      </div>
    </div>
  );
};

const MealCard: React.FC<{ meal: Meal; type: string; icon: React.ReactNode; color: string }> = ({ meal, type, icon, color }) => (
  <div className="glass-panel p-4 rounded-2xl flex gap-4 items-start card-hover">
    <div className={`p-3 rounded-xl bg-slate-800 ${color} shadow-inner`}>
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-1">
        <span className={`text-xs font-bold uppercase tracking-wider ${color} opacity-80`}>{type}</span>
        <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded text-slate-300">{meal.calories} kcal</span>
      </div>
      <h4 className="font-bold text-white mb-1">{meal.name}</h4>
      <p className="text-xs text-slate-400 mb-2 line-clamp-2">{meal.description}</p>
      <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
        <span className="bg-slate-800/50 px-1.5 py-0.5 rounded">P: {meal.macros.protein}</span>
        <span className="bg-slate-800/50 px-1.5 py-0.5 rounded">C: {meal.macros.carbs}</span>
        <span className="bg-slate-800/50 px-1.5 py-0.5 rounded">F: {meal.macros.fats}</span>
      </div>
    </div>
  </div>
);

export default PlanView;
