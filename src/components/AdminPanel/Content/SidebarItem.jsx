import { useState } from "react";
import "../style.css";

const SidebarItem = ({ item, setCatetoryType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handle = () => {
    setCatetoryType(item.name);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    handle();
  };

  return (
    <li className={`sidebar-list`}>
      <div className="" onClick={handleToggle}>
        <p>{item.name}</p>
      </div>
      {isOpen && (
        <ul>
          {item.subItems.map((child, i) => (
            <SidebarItem
              setCatetoryType={setCatetoryType}
              key={i}
              item={child}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
