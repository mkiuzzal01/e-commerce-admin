import { useState } from "react";
import type { MouseEvent } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useToast } from "../../components/utils/tost-alert/ToastProvider";
import Loader from "../../shared/Loader";
import { useSingleUserByIdQuery } from "../../redux/features/user/user-api";

const User = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const currentUser = useAppSelector(selectCurrentUser);
  const { data: userInfo, isLoading } = useSingleUserByIdQuery(
    currentUser?.id ?? ""
  );

  // console.log(userInfo); 

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  if (isLoading) return <Loader />;

  const handleLogout = () => {
    dispatch(logout());
    showToast({
      message: "You are logged out successfully!",
      type: "warning",
      duration: 2000,
      position: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const profileImage =
    userInfo?.data?.image || "https://www.gravatar.com/avatar/?d=mp";
  const name = userInfo?.data?.name || "Guest User";
  const email = userInfo?.data?.email || "guest@example.com";

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        sx={{ ml: 1 }}
      >
        <Avatar src={profileImage} alt={name} sx={{ width: 32, height: 32 }} />
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 200,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Typography sx={{ px: 2, pt: 1, fontWeight: "bold" }}>
          {isLoading ? "Loading..." : name}
        </Typography>
        <Typography
          sx={{ px: 2, pb: 1, color: "text.secondary", fontSize: 13 }}
        >
          {isLoading ? "Please wait..." : email}
        </Typography>
        <Divider />
        <MenuItem onClick={() => handleNavigate("/profile")}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default User;
