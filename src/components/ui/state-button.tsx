import { Button, ButtonProps } from "./button";
import { LucideLoader2 } from "lucide-react";

interface StateButtonProps extends ButtonProps {
    isLoading: boolean;
    isDisabled?: boolean;
}

const StateButton = ({ isLoading, isDisabled, children, ...props }: StateButtonProps) => {
    return (
        <Button {...props} disabled={isLoading || isDisabled}>
            {isLoading && <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />} {children}
        </Button>
    );
};

export default StateButton;
