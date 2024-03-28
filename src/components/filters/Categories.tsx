import React, { useEffect, useState } from "react";
import { CategoriesGroupProps } from "../../typing";

const Categories: React.FC<CategoriesGroupProps> = ({
  categories,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedCategory(value === selectedCategory ? null : value);
  
  
  };

  useEffect(() => {
    onCategoryChange(selectedCategory ? [selectedCategory] : []);
  }, [selectedCategory, onCategoryChange]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Category</label>
      <div>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`category-${category}`}
              value={category.toLowerCase()}
              checked={category.toLowerCase() === selectedCategory}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`category-${category}`} className="ml-2">
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
