import { useNavigate } from "react-router-dom";

const SidebarItem = ({ text, path, Icon }) => {
  const navigate = useNavigate();

  return (
    <div
      className="sidebar-item"
      onClick={() => {
        navigate(path);
      }}
    >
      <Icon />
      <p>{text}</p>
    </div>
  );
};

export default SidebarItem;
