"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();
  return (
    <Button variant="update" disabled={pending}>{pending ? pendingLabel : children}</Button>
  );
}

export default SubmitButton;
