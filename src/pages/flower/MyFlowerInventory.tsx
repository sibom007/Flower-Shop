import {
  useGetUserflowerByIdQuery,
  useDeleteFlowerByIdMutation,
  useBulkDeleteflowerMutation,
} from "../../redex/feature/flower/flowerApi";
import { useAppSelector } from "../../redex/hook";
import { selectCurrentUser } from "../../redex/store";
import {
  BulkDeleteData,
  TFlower,
  formatBloomDate,
} from "../../types/Flower.Type";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import { toast } from "sonner";
import { useAddsalesMutation } from "../../redex/feature/salse/salse";
import { FieldValues } from "react-hook-form";

const MyFlowerInventory = () => {
  const [Deletemethod, setDeleteMethod] = useState("");
  const [button, setbutton] = useState(true);
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);

  const user = useAppSelector(selectCurrentUser);
  const id = user?._id;

  const { data, isLoading, isError, refetch } = useGetUserflowerByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [BulkDeleteflower] = useBulkDeleteflowerMutation();
  const [deleteflowerById] = useDeleteFlowerByIdMutation();
  useEffect(() => {
    if (data?.data.length > 0) {
      setbutton(false);
    }
  }, [data]);

  const handledelete = async (id: string) => {
    const userId = { id };
    await deleteflowerById(userId);
    refetch();
  };

  const handleCheckboxChange = (flowerId: string) => {
    if (selectedFlowers.includes(flowerId)) {
      setSelectedFlowers(selectedFlowers.filter((id) => id !== flowerId));
    } else {
      setSelectedFlowers([...selectedFlowers, flowerId]);
    }
  };

  const bulkDeleteData: BulkDeleteData = {
    ids: selectedFlowers,
  };

  const handleBulkDelete = async () => {
    const ids = bulkDeleteData;
    await BulkDeleteflower(ids);
    refetch();
  };
  
  const [addsales] = useAddsalesMutation();
  const [modal2Open, setModal2Open] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValueID, setInputValueID] = useState("");

  const handleInputChange = (e: FieldValues) => {
    setInputValue(e.target.value);
  };

  const handleOk = async () => {
    await addsales({
      flowerId: inputValueID,
      quantitySold: parseInt(inputValue),
    });
    toast.success("Sell Done");
    refetch();
    setModal2Open(false);
  };

  return (
    <div className="px-24 mt-10">
      <h1 className="text-center text-2xl mb-3 font-semibold underline">
        My Flower Of Inventory
      </h1>
      <div className="flex justify-end mb-3">
        {" "}
        <select
          className="block px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => setDeleteMethod(e.target.value)}
        >
          <option value="">Select the Delete Method</option>
          <option value="delete">Delete</option>
          <option value="bulkdelete">Multipul Delete</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          className={`p-3 mb-2 rounded-lg text-base font-medium bg-yellow-600 hover:bg-yellow-700 text-white duration-500 ${
            Deletemethod === "bulkdelete" ? "block" : "hidden"
          }`}
          onClick={handleBulkDelete}
          disabled={button}
        >
          Multipul Delete
        </button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3  grid-cols-3 gap-5">
        {isLoading || isError || data.data.length === 0 ? (
          <div className="flex md:mt-8 lg:mt-10 lg:text-lg md:ml-24 lg:ml-7 sm:w-[320px]  lg:w-[650px] items-center">
            {" "}
            <p className=" text-red-400 font-bold lg:text-6xl mr-4">
              Have No Data !
            </p>
            <Spin className="" size="large" />
          </div>
        ) : (
          data?.data &&
          data?.data.map((flower: TFlower, index: number) => (
            <div key={index} className="bg-[#eae8dc] border-4 p-5 rounded-lg">
              <div className="rounded-md p-2">
                <input
                  className={`size-5 mb-2 active:border-indigo-200 active:border-opacity-35 ${
                    Deletemethod === "bulkdelete" ? "block" : "hidden"
                  }`}
                  type="checkbox"
                  checked={selectedFlowers.includes(flower._id)}
                  onChange={() => handleCheckboxChange(flower._id)}
                />

                <img
                  className="aspect-w-24 aspect-h-2 rounded-2xl"
                  src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 grid-cols-2 gap-3 p-3 items-center">
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
                <div className="flex items-center justify-between space-x-48">
                  <p>
                    <button
                      onBlur={() => setInputValueID(flower?._id)}
                      onClick={() => setModal2Open(true)}
                      className="text-lg text-white font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-700 duration-200 active:translate-x-2 active:translate-y-2 py-2 px-4"
                    >
                      Sell
                    </button>
                  </p>
                  <div className="flex items-center space-x-3">
                    <p className="text-base text-neutral-500 font-semibold md:text-sm">
                      <Link
                        to={`/user/myflowerinventory/updateflower/${flower._id}`}
                        className="text-lg text-white font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-700 duration-200 active:translate-x-2 active:translate-y-2 py-2 px-4"
                      >
                        Edit
                      </Link>
                    </p>

                    <p className="text-base text-neutral-500 font-semibold md:text-sm">
                      <button
                        onClick={() => handledelete(flower._id)}
                        className="text-lg text-white font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-700 duration-200 active:translate-x-2 active:translate-y-2 py-2 px-4"
                      >
                        Delete
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <Modal
          title="For sales give the Quantity"
          style={{ background: "#eae8dc" }}
          centered
          open={modal2Open}
          onOk={handleOk}
          onCancel={() => setModal2Open(false)}
        >
          <p className="ml-7 mb-2 text-lg font-semibold">Quantity</p>
          <p className="text-center">
            <input
              className="p-2 w-[420px] bg-[#eae8dc] rounded-lg"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
            />
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default MyFlowerInventory;
