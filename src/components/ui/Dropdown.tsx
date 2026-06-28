import React from "react";

type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children?: React.ReactNode;
};

function Dropdown({ children, ...props }: DropdownProps) {
  return <select {...props}>{children}</select>;
}

export default Dropdown;
