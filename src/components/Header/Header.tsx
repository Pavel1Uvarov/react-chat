import { Button } from "../ui/button";
import Logo from "@/assets/logo.svg";

const Header = () => {
  return (
    <div className="w-full py-3 shadow-md flex items-center justify-between px-5">
      <img src={Logo} className="w-10" />
      <div>
        <Button variant="ghost">Log Out</Button>
      </div>
    </div>
  );
};

export default Header;
