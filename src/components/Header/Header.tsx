import { selectLogout } from "@/stores/auth.store";
import { Button } from "../ui/button";
import Logo from "@/assets/logo.svg";
import { useBoundStore } from "@/stores/useBoundStore";

const Header = () => {
  const handleLogout = useBoundStore(selectLogout);

  return (
    <div className="w-full py-3 shadow-md flex items-center justify-between px-5">
      <img src={Logo} className="w-10" />
      <div>
        <Button variant="ghost" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Header;
