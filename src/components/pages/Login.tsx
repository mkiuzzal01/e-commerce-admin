import TextInput from "../utils/input-fields/TextInput";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ReusableForm from "../../shared/ReusableFrom";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../lib/verifyToken";
import { setUser, type TUser } from "../../redux/features/auth/authSlice";
import { useToast } from "../utils/tost-alert/ToastProvider";
import Loader from "../../shared/Loader";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { showToast } = useToast();

  if (isLoading) return <Loader />;

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate("/overview", { replace: true });

      showToast({
        message: "Login successful!",
        type: "success",
        duration: 2000,
        position: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch {
      showToast({
        message: "Login failed. Please check your credentials.",
        type: "error",
        duration: 2000,
        position: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Login with Enterprise<span className="text-yellow-400">X</span>
      </h1>

      <div className="w-80 bg-white p-6 rounded shadow">
        <ReusableForm
          onSubmit={onSubmit}
          defaultValues={{
            email: "superadmin123@gmail.com",
            password: "s12345",
          }}
        >
          <TextInput
            name="email"
            label="Email"
            type="email"
            variant="standard"
            placeholder="Enter your email"
            required
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            variant="standard"
            placeholder="Enter your password"
            required
          />
          <div className="text-sm mb-2">
            <Link to={"/"}>Forget password?</Link>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              marginTop: "8px",
              backgroundColor: "#1E40AF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#1D4ED8",
              },
            }}
          >
            Login
          </Button>
        </ReusableForm>
      </div>
    </div>
  );
};

export default Login;
