import React, { createContext, useContext, useState } from "react";

interface ExerciseContextData {
  selectedExerciseId: string | null;
  setSelectedExerciseId: (id: string | null) => void;
  clearSelectedExercise: () => void;
}

const ExerciseContext = createContext<ExerciseContextData>(
  {} as ExerciseContextData
);

export function ExerciseProvider({ children }: { children: React.ReactNode }) {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null
  );

  const clearSelectedExercise = () => {
    setSelectedExerciseId(null);
  };

  return (
    <ExerciseContext.Provider
      value={{
        selectedExerciseId,
        setSelectedExerciseId,
        clearSelectedExercise,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercise() {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercise must be used within an ExerciseProvider");
  }
  return context;
}
