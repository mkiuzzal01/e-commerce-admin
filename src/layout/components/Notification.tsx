import { IconButton, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

const Notification = () => {
  return (
    <Tooltip title="Notifications">
      <Link to={"/all-notice"}>
        <IconButton aria-label="notifications">
          <NotificationsIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export default Notification;
