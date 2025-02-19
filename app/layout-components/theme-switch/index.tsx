"use client";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

export enum browserTheme {
  light = "light",
  dark = "dark",
  system = "system",
}

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(
    theme !== browserTheme.light && theme !== browserTheme.system,
  );

  return (
    <Switch
      defaultValue={
        theme === browserTheme.dark ? browserTheme.light : browserTheme.dark
      }
      size="sm"
      isSelected={isSelected}
      onValueChange={(value) => {
        setTheme(value ? browserTheme.dark : browserTheme.light);
        setIsSelected(value);
      }}
      color="warning"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MdSunny className={className} />
        ) : (
          <IoMdMoon className={className} />
        )
      }
    />
  );
}
