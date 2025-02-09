import type { InputHTMLAttributes } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface InputWithLabelProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  description: string;
  textarea?: boolean;
}

export default function InputWithLabel({
  label,
  description,
  textarea,
  ...rest
}: InputWithLabelProps) {
  return (
    <div className="space-y-2 flex flex-col">
      <Label htmlFor={rest.id} className="flex flex-col gap-0.5">
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      {textarea ? (
        <Textarea rows={4} className="resize-none" {...rest} />
      ) : (
        <Input {...rest} />
      )}
    </div>
  );
}
