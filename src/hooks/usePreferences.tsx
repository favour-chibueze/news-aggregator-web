import { useState, useEffect } from 'react';

export type Preferences = {
  sourcesPreference: string[];
  categoriesPreference: string[];
  authorsPreference: string[];
};

function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const storedPreferences = localStorage.getItem('preferences');
    return storedPreferences
      ? JSON.parse(storedPreferences)
      : {
          sourcesPreference: [],
          categoriesPreference: [],
          authorsPreference: [],
        };
  });

const updatePreferences = (updatedPreferences: Preferences) => {
    setPreferences(updatedPreferences);
    localStorage.setItem('preferences', JSON.stringify(updatedPreferences));
};

const updatePreference = (preferenceType: keyof Preferences, preference: string) => {
    const currentPreferences = preferences[preferenceType];
    const isExistingPreference = currentPreferences.includes(preference);

    if (isExistingPreference) {
      const updatedPreferences = {
        ...preferences,
        [preferenceType]: currentPreferences.filter((item) => item !== preference),
      };
      setPreferences(updatedPreferences);
      localStorage.setItem('preferences', JSON.stringify(updatedPreferences));
    } else {
      const updatedPreferences = {
        ...preferences,
        [preferenceType]: [...currentPreferences, preference],
      };
      localStorage.setItem('preferences', JSON.stringify(updatedPreferences));
      setPreferences(updatedPreferences);
    }
};

  useEffect(() => {
    const storedPreferences = localStorage.getItem('preferences');
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  return {preferences, updatePreferences, updatePreference};
}

export default usePreferences;
