import Logo from "@/assets/logo.svg";
import useLogout from "@/hooks/useLogout.hook.ts";
import { Button } from "@/components/ui/button.tsx";

const Header = () => {
  const { mutate } = useLogout()

  return (
    <div className="w-full py-3 shadow-md flex items-center justify-between px-5">
      <img src={Logo} className="w-10" alt="Logo"/>
      <div>
        <Button variant="ghost" onClick={() => mutate()}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Header;
