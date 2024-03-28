import React from "react";
import { categories, sources, authors } from "../../Infrastructure/constants";
import { Preferences } from "../../hooks/usePreferences";

interface Props {
  preferences: Preferences;
  updatePreference: (
    preferenceType: keyof Preferences,
    preference: string,
  ) => void;
}

const NewsPreferences = ({ preferences, updatePreference }: Props) => {
  const handlePreferencesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    preferenceType: keyof Preferences,
  ) => {
    const preference = e.target.value;
    updatePreference(preferenceType, preference);
  };

  return (
    <aside className="w-1/4 p-4 h-max bg-gray-100 border-l border-gray-300 md:block hidden">
      <h2 className="mb-4">My Preferences</h2>
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <div>
            {categories.map((category) => (
              <div key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  value={category.toLowerCase()}
                  checked={preferences.categoriesPreference.includes(
                    category.toLowerCase(),
                  )}
                  onChange={(e) =>
                    handlePreferencesChange(e, "categoriesPreference")
                  }
                />
                <label htmlFor={`category-${category}`} className="ml-2">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Author</label>
          <div>
            {authors.map((author) => (
              <div key={author} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`author-${author}`}
                  value={author.toLowerCase()}
                  checked={preferences.authorsPreference.includes(
                    author.toLowerCase(),
                  )}
                  onChange={(e) =>
                    handlePreferencesChange(e, "authorsPreference")
                  }
                />
                <label htmlFor={`author-${author}`} className="ml-2">
                  {author}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Source</label>
          <div>
            {sources.map((source) => (
              <div key={source} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`source-${source}`}
                  value={source}
                  checked={preferences.sourcesPreference.includes(source)}
                  onChange={(e) =>
                    handlePreferencesChange(e, "sourcesPreference")
                  }
                />
                <label htmlFor={`source-${source}`} className="ml-2">
                  {source}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default NewsPreferences;
