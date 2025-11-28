import React from "react";
import MaterialUISwitch from "../MaterialUISwitch/MaterialUISwitch";

interface ThemeToggleSwitchProps {
  checked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

const ThemeToggleSwitch: React.FC<ThemeToggleSwitchProps> = ({
  checked,
  onChange,
}) => <MaterialUISwitch checked={checked} onChange={onChange} />;

export default ThemeToggleSwitch;
