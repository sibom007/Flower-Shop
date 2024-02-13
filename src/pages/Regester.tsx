import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Photo from "../assets/Login photo/Login page for assmient 5.jpeg";
import { useNavigate } from "react-router-dom";
import { Tinputsofrigister } from "../types/Form.Type";
import { toast } from "sonner";
import { useRegistersMutation } from "../redex/feature/auth/authApi";

const Regester = () => {
  const { register, handleSubmit } = useForm<Tinputsofrigister>();

  const navagate = useNavigate();
  const [registers, { error }] = useRegistersMutation();

  const errorMessage = error?.message;

  const onSubmit: SubmitHandler<Tinputsofrigister> = async (
    data: FieldValues
  ) => {
    const toastId = toast.loading("Loading...");
    try {
      const userInfo = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      await registers(userInfo).unwrap();
      toast.success("Logged in", { id: toastId, duration: 3000 });
      navagate(`/login`);
    } catch (err) {
      toast.error("somethink is worng !");
    }
  };

  return (
    <div className="relative bg-[#eae8dc]">
      <div className="absolute backdrop-blur-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-lg p-5 sm:h-[380px] sm:w-[340px] ">
        <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-3xl font-bold text-white">Sign up</h1>
          <input
            placeholder="username"
            className="p-2 rounded-lg mt-9 outline-white bg-[#eae8dc]"
            type="text"
            {...register("username", { required: true })}
          />
          <input
            placeholder="Email"
            className="p-2 rounded-lg mt-5 outline-white bg-[#eae8dc]"
            type="text"
            {...register("email", { required: true })}
          />
          <input
            placeholder="Password"
            className="p-2 rounded-lg mt-5 outline-white  bg-[#eae8dc]"
            type="text"
            {...register("password", { required: true })}
          />
          {<p className="text-red-500 font-bold">{errorMessage}</p>}
          <button className="bg-[#eae8dc] mt-4 w-9/12 mx-auto rounded-[40px] p-2 text-lg font-medium text-black hover:bg-[#c2bda4] duration-300 active:-translate-x-2 active:-translate-y-2">
            Sign up
          </button>
          <p className="text-lg ml-2 mt-3 text-white">
            You have an account then | <a href="/login">Login</a>
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

export default Regester;
