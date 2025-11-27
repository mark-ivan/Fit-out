import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, WeeklyPlan } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Schema definitions for structured output
const mealSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    calories: { type: Type.NUMBER },
    macros: {
      type: Type.OBJECT,
      properties: {
        protein: { type: Type.STRING },
        carbs: { type: Type.STRING },
        fats: { type: Type.STRING },
      }
    },
    description: { type: Type.STRING },
  }
};

const workoutSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    duration: { type: Type.STRING },
    intensity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
    exercises: { type: Type.ARRAY, items: { type: Type.STRING } },
  }
};

const dailyPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    day: { type: Type.STRING },
    focus: { type: Type.STRING },
    workouts: { type: Type.ARRAY, items: workoutSchema },
    meals: {
      type: Type.OBJECT,
      properties: {
        breakfast: mealSchema,
        lunch: mealSchema,
        dinner: mealSchema,
        snack: mealSchema,
      }
    },
    status: { type: Type.STRING, enum: ['pending', 'completed'] },
  }
};

const weeklyPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING },
    days: { type: Type.ARRAY, items: dailyPlanSchema },
    createdAt: { type: Type.STRING },
  }
};

export const generateFitnessPlan = async (profile: UserProfile): Promise<WeeklyPlan> => {
  const prompt = `
    Create a fun, energetic, and highly personalized 7-day fitness and diet plan for the following user:
    Name: ${profile.name}
    Age: ${profile.age}
    Gender: ${profile.gender}
    Height: ${profile.height}cm
    Weight: ${profile.weight}kg
    Goal: ${profile.goal}
    Activity Level: ${profile.activityLevel}
    Dietary Restrictions: ${profile.dietaryRestrictions || 'None'}

    The tone should be encouraging, like a cartoon superhero coach.
    Provide the response in strict JSON format matching the schema.
    Translate all content to Chinese (Simplified).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: weeklyPlanSchema,
        systemInstruction: "You are FitToon, a world-class, high-energy animated fitness coach. You love emojis and bright descriptions.",
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as WeeklyPlan;
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Error generating plan:", error);
    throw error;
  }
};

export const chatWithCoach = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: "You are FitToon, a helpful and funny fitness assistant. Keep answers concise, motivating, and in Chinese. Use emojis liberally."
            }
        });

        const result = await chat.sendMessage({ message });
        return result.text || "Sorry, I couldn't think of a response!";
    } catch (error) {
        console.error("Chat error", error);
        return "网络似乎开小差了，请稍后再试！";
    }
}
