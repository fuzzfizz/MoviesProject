import React from "react";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#001529" }}>{children}</body>
    </html>
  );
};

export default RootLayout;
