import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Photo from "../assets/Login photo/Login page for assmient 5.jpeg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redex/hook";
import { useLoginMutation } from "../redex/feature/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "../utils/veryfyToken";
import { TInputs } from "../types/Form.Type";
import { TUser } from "../types/authSlice.Type";
import { setUser } from "../redex/feature/auth/authSlice";
const Login = () => {
  const { register, handleSubmit } = useForm<TInputs>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<TInputs> = async (data: FieldValues) => {
    const toastId = toast.loading("Loading...");
    try {
      const userInfo = {
        username: data.username,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.token) as TUser;
      console.log(user);
      toast.success("Logged in", { id: toastId, duration: 3000 });
      dispatch(setUser({ user: user, token: res.data.token }));
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("somethink is worng !");
    }
  };

  return (
    <div className="relative bg-[#eae8dc]">
      <div className="absolute backdrop-blur-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-lg p-5 sm:h-[330px] sm:w-[340px] ">
        <form className="grid grid-cols-1 " onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-3xl font-bold text-white">
            Login Please
          </h1>
          <input
            placeholder="username"
            className="p-2 rounded-lg mt-9 outline-white bg-[#eae8dc]"
            type="text"
            {...register("username", { required: true })}
          />
          <input
            placeholder="Password"
            className="p-2 rounded-lg mt-5 outline-white  bg-[#eae8dc]"
            type="text"
            {...register("password", { required: true })}
          />
          <button
            type="submit"
            className="bg-[#eae8dc] mt-4 w-9/12 mx-auto rounded-[40px] p-2 text-lg font-medium text-black hover:bg-[#c2bda4] duration-300 active:-translate-x-2 active:-translate-y-2"
          >
            Login
          </button>
          <p className="text-lg ml-2 mt-3 text-white">
            You have no account then | <a href="regester">Sign up</a>
          </p>
        </form>
      </div>

      <div
        className="sm:w-full"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          style={{
            width: "100vh",
            borderRadius: "20px",
          }}
          src={Photo}
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
