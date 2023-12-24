import React from "react";
import UserModal from "./User/UserModal";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full">
      <UserModal />
      {children}
    </div>
  );
};

export default Layout;
