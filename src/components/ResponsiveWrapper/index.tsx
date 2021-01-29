import React from "react";

const ResponsiveWrapper: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex flex-col justify-center items-center w-11/12 max-w-max space-y-3">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveWrapper;
