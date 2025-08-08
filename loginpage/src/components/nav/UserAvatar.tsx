import React from "react";
import Avatar from "@mui/material/Avatar";
import { Menu, MenuItem } from "@mui/material";
import { getUser, clearUser } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

const UserAvatar: React.FC = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const initials = user ? `${user.firstname[0]}${user.lastname[0]}`.toUpperCase() : "";

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  return (
    <div>
      <Avatar
        sx={{ bgcolor: "#secondary.main" , cursor: "pointer" }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {initials}
      </Avatar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem disabled>{user?.firstname} {user?.lastname}</MenuItem>
        <MenuItem disabled>{user?.email}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserAvatar;
