import { useNavigate, useParams } from "react-router-dom";
import {
  useSingleflowerByIdQuery,
  useUpdateflowerMutation,
} from "../../redex/feature/flower/flowerApi";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const Updateflower = () => {
  const navigete = useNavigate();
  const { FlowerId } = useParams();
  const { data, isLoading } = useSingleflowerByIdQuery(FlowerId);
  const currentdata = data?.data[0];
  const [updateflower, { isSuccess }] = useUpdateflowerMutation();
  const { register, handleSubmit, reset } = useForm();

  if (isLoading === true) {
    toast.loading("Loading ...", { duration: 1000 });
  }
  if (isSuccess === true) {
    toast.success("Update successfull", { duration: 1000 });
  }

  const onSubmit = async (data: FieldValues) => {
    const Dataneedbacend = {
      id: FlowerId,
      name: data.name === "" ? currentdata.name : data.name,
      color: data.color === "" ? currentdata.color : data.color,
      price: data.price === "" ? currentdata.price : parseInt(data.price),
      quantity:
        data.quantity === "" ? currentdata.quantity : parseInt(data.quantity),
      bloomDate: data.bloomDate === "" ? currentdata.bloomDate : data.bloomDate,
      type: data.type === "" ? currentdata.type : [data.type],
      size: data.size === "" ? currentdata.size : data.size,
      fragrance: data.fragrance === "" ? currentdata.fragrance : data.fragrance,
    };
    await updateflower(Dataneedbacend);
    reset()
    navigete("/manager/flowerinventory")
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 h-screen">
        <h1 className="text-center text-xl font-semibold space-y-5 mt-5 mb-5 md:text-2xl">
          Add Your Own Book
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mx-24 ">
          <input
            {...register("name")}
            type="text"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="name"
          />
          <input
            {...register("color")}
            type="text"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="color"
          />
          <input
            {...register("type")}
            type="text"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="type"
          />

          <input
            {...register("fragrance")}
            type="text"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="fragrance"
          />
          <input
            {...register("price")}
            type="number"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="price"
          />
          <input
            {...register("quantity")}
            type="text"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="quantity"
          />
          <input
            {...register("bloomDate")}
            type="date"
            className="mt-2 p-2 outline-none border-2 rounded focus:border-indigo-500"
            placeholder="Bloom Date"
          />
          <select
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("size")}
          >
            <option value="">Select Size</option>
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

export default Updateflower;
