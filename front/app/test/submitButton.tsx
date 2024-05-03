"use client";

import { useFormStatus } from "react-dom";
import { Children, type ComponentProps } from "react";

type Props = ComponentProps<"button"> & { pendingText: string };

const SubmitButton: ({
  pendingText,
  children,
  ...props
}: Props) => JSX.Element = ({ children, pendingText, ...props }) => {
  const { pending, action } = useFormStatus();
  const isPending: boolean = pending && action === props.formAction;

  return (
    <button {...props} type="submit" aria-disabled={true}>
      {isPending ? pendingText : children}
    </button>
  );
};
export default SubmitButton;
