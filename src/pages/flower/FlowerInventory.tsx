import { toast } from "sonner";
import { useGetflowerQuery } from "../../redex/feature/flower/flowerApi";
import { TFlower, formatBloomDate } from "../../types/Flower.Type";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
const FlowerInventory = () => {
  const [sdata, setsdata] = useState({});
  const { data, isLoading, isError, error, refetch } = useGetflowerQuery(sdata);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (isLoading === true) {
      toast.loading("loding...");
    }
    if (error) {
      toast.error("Data Not Found", { duration: 1000 });
    }
  }, [isLoading, error, isError]);
  const onSubmit = async (data: FieldValues) => {
    const d = { Searchfild: data.Searchfild, search: data.search };
    setsdata(d);
    refetch();
  };

  return (
    <div className="px-24 mt-10">
      <h1 className="text-center text-2xl mb-3 font-semibold underline">
        Flower Of Inventory
      </h1>
      <form className="flex justify-end" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <select
            className="block w-[320px] mb-2 px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("Searchfild")}
          >
            <option value="">Select Data</option>
            <option value="price">Price</option>
            <option value="bloomDate">BloomDate</option>
            <option value="color">Color</option>
            <option value="type">Type</option>
            <option value="size">Size</option>
            <option value="fragrance">Fragrance</option>
          </select>
          <input
            className="p-2 w-[320px] mb-4 border-2 rounded-l-lg  focus:border-blue-300 bg-[#eae8dc] outline-none text-lg"
            type="text"
            placeholder="Search"
            {...register("search")}
          />

          <button
            className="text-lg text-white font-semibold rounded-r-lg bg-yellow-600 hover:bg-yellow-700 duration-200  p-2"
            type="submit"
          >
            Search...
          </button>
        </div>
      </form>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3  grid-cols-3 gap-5">
        {data?.data &&
          data?.data.map((flower: TFlower, index: number) => (
            <div key={index} className="bg-[#eae8dc] border-4 p-5 rounded-lg">
              <div className="rounded-md p-2">
                <img
                  className="aspect-w-24 aspect-h-2 rounded-2xl"
                  src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 grid-cols-2 gap-3 p-3">
                <p className="text-base text-neutral-500 font-semibold md:text-sm">
                  Name : {flower?.name}
                </p>
                <p className="text-base text-neutral-500 font-semibold md:text-sm">
                  Color : {flower?.color}
                </p>
                <p className="text-base text-neutral-500 font-semibold md:text-sm">
                  BloomDate : {formatBloomDate(flower?.bloomDate)}
                </p>
                <p className="text-base text-neutral-500 font-semibold md:text-sm">
                  Price : {flower?.price}
                </p>
                <p className="text-base text-neutral-500 font-semibold md:text-sm">
                  Quantity : {flower?.quantity}
                </p>
                <p className="text-base text-neutral-500 font-semibold md:text-sm">
                  Size : {flower?.size}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FlowerInventory;
