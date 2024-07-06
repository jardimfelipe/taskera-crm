import { PropsWithChildren } from "react";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="">
      {children}
    </div>
  )

};

export default Layout;
