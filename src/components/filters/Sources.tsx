import React, { useEffect, useState } from "react";
import { SourceProps } from "../../typing";



const Sources: React.FC<SourceProps> = ({
    sources,
  onSourceChange,
}) => {
  const [selectedCategory, setSelectedSource] = useState<string | null>(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedSource(value === selectedCategory ? null : value);
  };

  useEffect(() => {
    onSourceChange(selectedCategory ? [selectedCategory] : []);
  }, [selectedCategory, onSourceChange]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Source</label>
      <div>
        {sources.map((source) => (
          <div key={source} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`source-${source}`}
              value={source}
              checked={source === selectedCategory}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`source-${source}`} className="ml-2">
              {source}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sources;
