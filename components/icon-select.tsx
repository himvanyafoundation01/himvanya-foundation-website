"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import IconsMap, { availableIcons } from "@/components/icons/IconsMap";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function WorkCardIconSelect({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an icon" />
      </SelectTrigger>
      <SelectContent>
        {availableIcons.map((icon) => (
          <SelectItem key={icon} value={icon}>
            <div className="flex items-center gap-2">
              <IconsMap icon={icon} className="w-4 h-4" />
              {icon}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
