import { Button, Modal, Table, TableColumnsType } from "antd";
import { useBulkDeleteflowerMutation, useDeleteFlowerByIdMutation, useGetflowerQuery } from "../../redex/feature/flower/flowerApi";
import React, { useState } from "react";
import { useAppSelector } from "../../redex/hook";
import { useCurrentToken } from "../../redex/store";
import { verifyToken } from "../../utils/veryfyToken";
import { TUser } from "../../types/authSlice.Type";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAddsalesMutation, usePointUpdateMutation } from "../../redex/feature/salse/salse";
import { TResponse } from "../../types/global.Type";
import { TFlower } from "../../types/Flower.Type";



export type TDataType = {
  _id: string
  name: string
  price: number
  quantity: number
  color: string
  size: string
  fragrance: string
}





const FlowerInventory = () => {
  const { register, handleSubmit } = useForm()
  const [DeleteButton, setDeleteButton] = useState(false)
  const [DeleteID, setDeleteID] = useState<React.Key[]>([])
  const [Params, setParams] = useState({})
  const { data: Flowerdata, isFetching } = useGetflowerQuery(Params)
  const [BulkDeleteflower] = useBulkDeleteflowerMutation()
  const [DeleteFlowerById] = useDeleteFlowerByIdMutation()
  const [addsales] = useAddsalesMutation();
  const [PointUpdate] = usePointUpdateMutation();
  const token = useAppSelector(useCurrentToken);
  let user: TUser;
  if (token) {
    user = verifyToken(token);
  }




  const columns: TableColumnsType<TDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Color',
      dataIndex: 'color',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    {
      title: 'Details',
      key: 'x',
      render: () => {
        return (
          <div>
            <Button>Details</Button>
          </div>
        );
      },
    },

  ];

  if (user!.role === 'user') {
    columns.push(
      {
        title: 'Sell',
        key: 's',
        render: (items) => {
          return (
            <div>
              <Button
                onBlur={() => setInputValueID(items.key)}
                onClick={() => setModal2Open(true)}
              >Sell</Button>
            </div>
          );
        },
      },
    );
  }

  if (user!.role === 'manager') {
    columns.push(
      {
        title: 'Update',
        key: 'y',
        render: (Item) => {
          return (
            <div>
              <Link to={`/manager/flowerinventory/${Item.key}`}>
                <Button>Update</Button>
              </Link>
            </div>
          );
        },
      },
      {
        title: 'Duplicate',
        key: 'z',
        render: (Item) => {
          return (
            <div>
              <Link to={`/manager/DuplicateFlower/${Item.key}`}>
              <Button>Duplicate</Button>
              </Link>
            </div>
          );
        },
      },
      {
        title: 'Delete',
        key: 'd',
        render: (Item) => {
          return (
            <div>
              <Button onClick={() => handlerSingledelete(Item.key)}>Delete</Button>
            </div>
          );
        },
      }
    );
  }




  const tableData = Flowerdata?.data?.map(
    ({ _id, name, price, quantity, color, size }: TFlower) => ({
      key: _id,
      name,
      price,
      quantity,
      color,
      size,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setParams(data);
  }


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TDataType[]) => {
      if (selectedRows.length === 0) {
        setDeleteButton(false)
      } else {
        setDeleteButton(true)
      }
      setDeleteID(selectedRowKeys)
    },
  }


  const Handledelete = async () => {
    const ids = DeleteID;
    await BulkDeleteflower(ids)
  }
  const handlerSingledelete = async (id: string) => {
    const userId = { id };
    await DeleteFlowerById(userId)
    toast.success("Flower is Deleted")
  }


  const [modal2Open, setModal2Open] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValueID, setInputValueID] = useState("");

  const handleInputChange = (e: FieldValues) => {
    setInputValue(e.target.value);
  };
  const handleOk = async () => {
    const res = await addsales({
      flowerId: inputValueID,
      quantitySold: parseInt(inputValue),
    }) as TResponse<any>;
    if (res?.data?.success === true) {
      toast.success("Sell has Done")
    }
    const updatepointInfo = { userId: user?._id, FlowerId: inputValueID }
    await PointUpdate(updatepointInfo)
    setModal2Open(false);
  };

  return (
    <div className="p-20">
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
          {user!.role === 'user' ? "" : <div className="flex justify-end mb-2">
            <button onClick={Handledelete} className={` ${DeleteButton === false ? 'hidden' : 'text-lg text-white font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-700 duration-200 p-2'}`}>
              Select Delete
            </button>
          </div>}
        </div>
      </form>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
      />
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


  );
};

export default FlowerInventory;


















