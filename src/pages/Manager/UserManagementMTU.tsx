import { Button, Table, TableColumnsType } from "antd";
import { TUser, TtableUserData } from "../../types/authSlice.Type";
import { useTotalUserQuery, useUpdateUserRoleMutation } from "../../redex/feature/auth/authApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";


const UserManagementMTU = () => {
    const {
        data: TotalUser,
        isFetching: isFeatchingTUser
    } = useTotalUserQuery(undefined);

    const [UpdateUserRole, { status, isLoading }] = useUpdateUserRoleMutation();

    const handlemanager = async (data: FieldValues) => {

        const Dataneedbacend = {
            id: data.key,
            role: "manager"
        };
        await UpdateUserRole(Dataneedbacend);
        if (isLoading === true) {
            toast.loading("Loding ...");
        }
        if (status === "uninitialized") {
            toast.success("User Update SuccessFully")
        }
        if (status === "rejected") {
            toast.error("Something is wrong !")
        }

    }
    const handleuser = async (data: FieldValues) => {
        const Dataneedbacend = {
            id: data.key,
            role: "user"
        };
        await UpdateUserRole(Dataneedbacend);
        if (isLoading === true) {
            toast.loading("Loding ...");
        }
        if (status === "uninitialized") {
            toast.success("User Update SuccessFully")
        }
        if (status === "rejected") {
            toast.error("Something is wrong !")
        }

    }



    const columns: TableColumnsType<TUser> = [
        {
            title: 'Name',
            dataIndex: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Manager',
            key: 'x',
            render: (item) => {
                return (
                    <div>
                        <Button disabled={item.role === "manager"} onClick={() => handlemanager(item)}>Manager</Button>
                    </div>
                );
            },
        },
        {
            title: 'Seles Man',
            key: 'y',
            render: (item) => {
                return (
                    <div>
                        <Button disabled={item.role === "user"} onClick={() => handleuser(item)}>Seles Man</Button>
                    </div>
                );
            },
        },

    ];
    const nonAdminUsers = TotalUser?.data?.filter((user: TUser) => user.role !== 'admin');

    const tableData = nonAdminUsers?.map(
        ({ _id, username, email, role }: TtableUserData) => ({
            key: _id,
            username,
            email,
            role,
        })
    );


    return (
        <div className="p-4 m-4 rounded-xl">
            <h1 className="text-center text-xl font-semibold space-y-5 mt-5 mb-5 md:text-2xl underline">
                All user
            </h1>
            <Table
                loading={isFeatchingTUser}
                columns={columns}
                dataSource={tableData}
            />
        </div>
    );
};

export default UserManagementMTU;