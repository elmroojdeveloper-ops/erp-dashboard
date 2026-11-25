import { AccountsShell } from "./components/AccountsShell";

export const instant = false;

const layout = ({ children }) => {
  return <AccountsShell>{children}</AccountsShell>;
};

export default layout;
