import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      Sidebar
      {children}
    </main>
  );
};

export default layout;
