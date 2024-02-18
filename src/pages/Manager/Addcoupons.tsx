import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../redex/hook";
import { selectCurrentUser } from "../../redex/store";
import { useCreateCouponMutation } from "../../redex/feature/salse/salse";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddFlower = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm();
    const user = useAppSelector(selectCurrentUser);
    const [createCoupon, { isLoading }] = useCreateCouponMutation()
    const onSubmit = async (data: FieldValues) => {
        const Dataneedbacend = {
            CouponDiscount: Number(data?.CouponDiscount),
            CreateBy: user?._id,
        };


        await createCoupon(Dataneedbacend)
        if (isLoading === true) {
            toast.loading("Loding ...");
        }
        toast.success("Coupon Add successfully");
        navigate("/manager/Allcoupons")
        reset();
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 h-screen ">
                <h1 className="text-center text-xl font-semibold space-y-5 mt-5 mb-5 md:text-2xl underline">
                    Add Coupon
                </h1>
                <div className="flex justify-center items-center">
                    <input
                        {...register("CouponDiscount", { required: true })}
                        type="number"
                        className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-300 w-[500px]"
                        placeholder="Coupon price"
                        required
                    />
                </div>
                <div className="flex justify-center items-center">
                    <button className=" px-9 py-2 mt-6 text-lg text-white font-semibold rounded-lg bg-slate-400 duration-200 active:bg-slate-500">
                        <input type="submit" value={"Submit"} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFlower;
