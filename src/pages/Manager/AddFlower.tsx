import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../redex/hook";
import { selectCurrentUser } from "../../redex/store";
import { useAddflowerMutation } from "../../redex/feature/flower/flowerApi";
import { toast } from "sonner";

const AddFlower = () => {
  const { register, handleSubmit, reset } = useForm();
  const user = useAppSelector(selectCurrentUser);
  const [addflower, { isLoading }] = useAddflowerMutation();
  const onSubmit = async (data: FieldValues) => {
    const Dataneedbacend = {
      name: data.name,
      createdBy: user?._id,
      color: data.color,
      price: parseInt(data.price),
      quantity: parseInt(data.quantity),
      bloomDate: data.bloomDate,
      type: [data.type],
      size: data.size,
      fragrance: data.fragrance,
      Fpoint: parseInt(data.Fpoint)
    };
    await addflower(Dataneedbacend);
    if (isLoading === true) {
      toast.loading("Loding ...");
    }
    toast.success("Flower add done");
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 h-screen">
        <h1 className="text-center text-xl font-semibold space-y-5 mt-5 mb-5 md:text-2xl underline">
          Add Your Own Book
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mx-24 ">
          <input
            {...register("name", { required: true })}
            type="text"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="name"
            required
          />
          <input
            {...register("color", { required: true })}
            type="text"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="color"
            required
          />
          <input
            {...register("type", { required: true })}
            type="text"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="type"
            required
          />

          <input
            {...register("fragrance", { required: true })}
            type="text"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="fragrance"
            required
          />
          <input
            {...register("price", { required: true })}
            type="number"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="price"
            required
          />
          <input
            {...register("quantity", { required: true })}
            type="text"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="quantity"
            required
          />
          <input
            {...register("bloomDate", { required: true })}
            type="date"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="Bloom Date"
            required
          />
          <input
            {...register("Fpoint", { required: true })}
            type="number"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="Fpoint"
            required
          />
          <select
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("size")}
          >
            <option value="big">Big</option>
            <option value="medium">Medium</option>
            <option value="small">Small</option>
          </select>
        </div>
        <div className="mx-24">
          <button className="p-3 mt-4 w-full text-lg text-white font-semibold rounded-lg bg-yellow-400 hover:bg-yellow-500 duration-200 active:translate-x-3  active:translate-y-3">
            <input type="submit" value={"Submit"} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFlower;
