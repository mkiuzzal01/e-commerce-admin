import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center  items-center  h-screen bg-gray-300">
      <h1 className="text-2xl">Page not found</h1>
      <Link to={"/overview"}>
        <Button> Back to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
