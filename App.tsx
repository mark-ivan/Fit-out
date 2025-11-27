import React, { useState } from 'react';
import { UserProfile, WeeklyPlan } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Assistant from './components/Assistant';
import { generateFitnessPlan } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOnboardingComplete = async (profile: UserProfile) => {
    setUser(profile);
    setLoading(true);
    try {
      const generatedPlan = await generateFitnessPlan(profile);
      setPlan(generatedPlan);
    } catch (error) {
      alert("Failed to generate plan. Please verify API Key or try again.");
      setUser(null); // Reset to allow retry
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUser(null);
    setPlan(null);
  };

  // If no user or no plan, show Onboarding
  if (!user || !plan) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <Onboarding onComplete={handleOnboardingComplete} isLoading={loading} />
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-indigo-500/10 blur-3xl pointer-events-none"></div>
      
      <Dashboard user={user} plan={plan} onReset={handleReset} />
      <Assistant />
    </div>
  );
};

export default App;
