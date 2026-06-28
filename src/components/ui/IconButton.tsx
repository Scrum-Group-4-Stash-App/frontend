import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
}

function IconButton({ icon: Icon, children, ...props }: IconButtonProps) {
  return <button {...props}>{Icon ? <Icon /> : children}</button>;
}

export default IconButton;
