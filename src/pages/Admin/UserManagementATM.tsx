import { Button, Table, TableColumnsType } from "antd";
import { TUser } from "../../types/authSlice.Type";
import { useTotalUserQuery, useUpdateUserRoleMutation } from "../../redex/feature/auth/authApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";


const UserManagementATM = () => {
    const {
        data: TotalUser,
        isFetching: isFeatchingTUser
    } = useTotalUserQuery(undefined);

    const [UpdateUserRole, { status, isLoading }] = useUpdateUserRoleMutation();

    const handleadmin = async (data: FieldValues) => {

        const Dataneedbacend = {
            id: data.key,
            role: "admin"
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
            title: 'Admin',
            key: 'x',
            render: (item) => {
                return (
                    <div>
                        <Button disabled={item.role === "admin"} onClick={() => handleadmin(item)}>Admin</Button>
                    </div>
                );
            },
        },
        {
            title: 'Manager',
            key: 'y',
            render: (item) => {
                return (
                    <div>
                        <Button disabled={item.role === "manager"} onClick={() => handlemanager(item)}>Manager</Button>
                    </div>
                );
            },
        },

    ];

    const tableData = TotalUser?.data?.map(
        ({ _id, username, email, role }) => ({
            key: _id,
            username,
            email,
            role,
        })
    );


    return (
        <div className="p-4 m-4 rounded-xl">
            <Table
                loading={isFeatchingTUser}
                columns={columns}
                dataSource={tableData}
            />
        </div>
    );
};

export default UserManagementATM;