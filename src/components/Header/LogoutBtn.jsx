import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import Button from "../Button";

function LogoutBtn({ className = "", ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    if (!confirm("Are you sure you want to log out?")) return;
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className={`w-full ${className}`}
      onClick={logoutHandler}
      {...props}
    >
      <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
      Logout
    </Button>
  );
}

export default LogoutBtn;
