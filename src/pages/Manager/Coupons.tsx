import { Table, TableColumnsType } from "antd";
import { useGetCouponQuery } from "../../redex/feature/salse/salse";

type TCouponData = {
    _id: string;
    CreateBy: string;
    CouponDiscount: number;
    CouponCode: string;
}


const Coupons = () => {
    const { data: Flowerdata, isFetching } = useGetCouponQuery(undefined)
    const columns: TableColumnsType<TCouponData> = [
        {
            title: 'CouponCode',
            dataIndex: 'CouponCode',
        },
        {
            title: 'Price',
            dataIndex: 'CouponDiscount',
        },
    ];

    const tableData = Flowerdata?.data?.map(
        ({ _id, CouponCode, CouponDiscount }: TCouponData) => ({
            key: _id,
            CouponDiscount,
            CouponCode
        })
    );

    return (
        <div className="p-5 rounded-xl">
            <h1 className="text-center text-xl font-semibold space-y-5 mt-5 mb-5 md:text-2xl underline">
                All Coupons
            </h1>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                style={{ boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"}}
            />
        </div>
    );
};

export default Coupons;