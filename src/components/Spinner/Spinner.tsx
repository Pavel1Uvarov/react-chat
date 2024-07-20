import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { SVGAttributes } from "react";

interface ISpinnerProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

const Spinner = ({ className, ...props }: ISpinnerProps) => {
  return <Loader2 data-testid="spinner" className={cn(className, "animate-spin")} {...props} />;
};

export default Spinner;
