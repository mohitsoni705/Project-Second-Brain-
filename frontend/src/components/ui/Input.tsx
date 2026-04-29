import { useState, type ReactElement } from "react";
import { EyeCloseIcon } from "../../icons/EyeIcon";
import { EyeOpenIcon } from "../../icons/EyeIcon";

interface InputProps {
    placeholder: string,
    refrence: any,
    startIcon?: ReactElement,
}

interface EyeToggleProps {
    active: boolean;
    onToggle: () => void;
}

export const EyeToggle = ({ active, onToggle }: EyeToggleProps) => {
    return (
        <span onClick={onToggle}>
            {active ? <EyeOpenIcon /> : <EyeCloseIcon />}
        </span>
    );
};

export const Input = ({ placeholder, refrence, startIcon }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const type = placeholder === "Password" ? (showPassword ? "text" : "password") : "text";

    return (
        <div>
            <div className="flex flex-row items-center justify-between border rounded border-[#8d87e0a9] outline-blue-300 m-2 p-2">
                <input type={type} ref={refrence} placeholder={placeholder} className="focus:outline-none" name={placeholder} />
                {placeholder === "Password" ? <EyeToggle active={showPassword} onToggle={() => setShowPassword(!showPassword)} /> : ""}
            </div>
        </div>
    );
}; 