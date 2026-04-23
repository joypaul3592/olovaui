"use client";

import {
  Check,
  Copy,
  CreditCard,
  Info,
  LoaderCircle,
  Mail,
  Search,
  Star,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAction,
  InputGroupAddon,
  InputGroupField,
  InputGroupIconButton,
  InputGroupMeta,
} from "./input-group";

export function InputGroupDefaultView() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 bg-black p-5">
      <InputGroup>
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupField placeholder="Search..." />
        <InputGroupMeta className="text-xs">12 results</InputGroupMeta>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Mail className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupField placeholder="Enter your email" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <CreditCard className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupField placeholder="Card number" />
        <InputGroupIconButton aria-label="Card verified">
          <Check className="h-4 w-4" />
        </InputGroupIconButton>
      </InputGroup>

      <InputGroup>
        <InputGroupField placeholder="https://olova.dev" />
        <InputGroupIconButton aria-label="Copy URL">
          <Copy className="h-4 w-4" />
        </InputGroupIconButton>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Info className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupField placeholder="https://" />
        <InputGroupIconButton aria-label="Favorite">
          <Star className="h-4 w-4" />
        </InputGroupIconButton>
      </InputGroup>

      <InputGroup>
        <InputGroupField placeholder="Type to search..." />
        <InputGroupAction>Search</InputGroupAction>
      </InputGroup>

      <InputGroup loading>
        <InputGroupField value="Searching..." readOnly />
        <InputGroupIconButton aria-label="Loading">
          <LoaderCircle className="h-4 w-4 animate-spin" />
        </InputGroupIconButton>
      </InputGroup>

      <InputGroup loading>
        <InputGroupField value="Saving changes..." readOnly />
        <InputGroupMeta>Saving...</InputGroupMeta>
        <InputGroupIconButton aria-label="Loading">
          <LoaderCircle className="h-4 w-4 animate-spin" />
        </InputGroupIconButton>
      </InputGroup>
    </div>
  );
}
export default InputGroupDefaultView;
