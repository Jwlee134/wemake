import { useState } from "react";

import { Label } from "./ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectWithLabelProps {
  name: string;
  required?: boolean;
  label: string;
  description: string;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
}

export default function SelectWithLabel({
  label,
  description,
  placeholder,
  options,
}: SelectWithLabelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2 flex flex-col w-full">
      <Label className="flex flex-col gap-0.5" onClick={() => setOpen(true)}>
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      <Select open={open} onOpenChange={setOpen}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
