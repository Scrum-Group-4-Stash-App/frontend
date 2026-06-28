import "./Dropdown.css";

interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  items: DropdownItem[];
}

export default function Dropdown({ items }: DropdownProps) {
  return (
    <div className="dropdown">
      {items.map((item) => (
        <button
          key={item.id}
          className="dropdown-item"
        >
          {item.icon}

          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}