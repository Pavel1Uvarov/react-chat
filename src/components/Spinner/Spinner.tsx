import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { FC } from "react";

interface ISpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string;
}

const Spinner: FC<ISpinnerProps> = ({ className, ...props }) => {
  return <Loader2 className={cn(className, "animate-spin")} {...props} />;
};

export default Spinner;
