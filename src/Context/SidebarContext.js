import { createContext } from "react";

const SidebarContext = createContext({
  sideBarVisiable: "",
});

SidebarContext.displayName = "SidebarContext";

export default SidebarContext;
