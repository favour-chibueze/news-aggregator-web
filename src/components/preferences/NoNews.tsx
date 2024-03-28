import React from "react";

const Nonews: React.FC = () => {
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-semibold mb-5">No News</h2>
      <p>
        It seems there are no news articles to display based on the current preferences.
        Kindly select a news source and category to explore available content.
      </p>
    </div>
  );
};

export default Nonews;