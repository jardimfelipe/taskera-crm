import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full bg-state-100">
      {/* Navbar */}
      <main className="pt-40 pb-20 bg-state-100">{children}</main>
      {/* Footer */}
    </div>
  );
};

export default Layout;
