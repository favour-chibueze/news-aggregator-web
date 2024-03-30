import React, { useEffect, useState } from "react";
import { SourceProps } from "../../typing";

const Sources: React.FC<SourceProps> = ({ sources, onSourceChange }) => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedSource(value);
  };

  useEffect(() => {
    onSourceChange(selectedSource ? [selectedSource] : []);
  }, [selectedSource, onSourceChange]);

  return (
    <div className="mb-4 w-44">
      <label className="block text-sm font-medium mb-2">Source</label>
      <div>
        {sources.map((source) => (
          <div key={source} className="flex items-center mb-2">
            <input
              type="radio"
              id={`source-${source}`}
              name="source"
              value={source}
              checked={source === selectedSource}
              onChange={handleRadioChange}
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