import { Divider, Progress, Spin } from "antd";
import Chart from "../Chart";
import { useSalesinDayQuery, useSalesinMonthQuery, useSalesinWeekQuery, useSalesinYearQuery } from "../../redex/feature/salse/salse";
import Watch from "../Time/Watch";
import Timer from "../Time/Timer";

const Dashbord = () => {
    const { data: salesDay, isFetching: isFetchingDay } = useSalesinDayQuery(undefined);

    const {
        data: salesWeek,
        isFetching: isFetchingWeek,
    } = useSalesinWeekQuery(undefined);

    const {
        data: salesMonth,
        isFetching: isFetchingMonth,

    } = useSalesinMonthQuery(undefined);


    const {
        data: salesYear,
        isFetching: isFeatchingYear
    } = useSalesinYearQuery(undefined);



    return (
        <div className="bg-[#f5f5f5] p-8 ">
            <div className="p-4 rounded-xl flex-row lg:flex space-x-5">
                <div className=" basis-9/12 shadow-xl rounded-lg p-3">
                    <div>
                        <h1>Welcome</h1>
                        <Divider />
                        <div className="flex items-center justify-center p-2 ml-4">
                            <div className="flex-1 text-sm text-[#8c8c8c]">New Login <h1 className="text-xl font-semibold">1000</h1></div>
                            <div className="flex-1 text-sm text-[#8c8c8c]">New Regester <h1 className="text-xl font-semibold">2000</h1></div>
                            <div className="flex-1 text-sm text-[#8c8c8c]">Time <h1 className="text-xl font-semibold"> <Watch /></h1></div>
                            <div className="flex-1 text-sm text-[#8c8c8c]"><p className="line-clamp-1">How Long you in website</p><h1 className="text-xl font-semibold"><Timer startTime={Math.floor(Date.now() / 1000)} /></h1></div>
                        </div>
                        <div className="flex justify-center items-center mt-20 mb-20 lg:mt-64"> <Spin size="large" /></div>
                    </div>
                </div>

                <div className="basis-2/6">
                    <div className="shadow-xl rounded-xl"><h1 className="text-center font-bold text-2xl mt-10 underline">
                        Daily Salse
                    </h1>
                        {isFetchingDay ? <p><Spin /></p> : <Chart data={salesDay?.data} />}
                    </div>

                    <div className="shadow-xl rounded-xl">
                        <h1 className="text-center font-bold text-2xl mt-10 underline">
                            Weekly Salse
                        </h1>
                        {isFetchingWeek ? <p><Spin /></p> : <Chart data={salesWeek?.data} />}
                    </div>

                </div>
            </div>


            <div className="flex-row lg:flex gap-4 mt-4">
                <div className="shadow-xl rounded-xl basis-2/6"><h1 className="text-center font-bold text-2xl mt-10 underline">
                    MonthLy Salse
                </h1>
                    {isFetchingMonth ? <p><Spin /></p> : <Chart data={salesMonth?.data} />}
                </div>

                <div className="shadow-xl rounded-xl basis-2/6">
                    <h1 className="text-center font-bold text-2xl mt-10 underline">
                        Yearly Salse
                    </h1>
                    {isFeatchingYear ? <p><Spin /></p> : <Chart data={salesYear?.data} />}
                </div>

                <div className="shadow-xl rounded-xl basis-2/6">
                    <h1 className="text-center font-bold text-2xl mt-10 underline">Proportion of each category</h1>
                    <div className="flex gap-14 justify-center items-center mt-11 pb-10  lg:mt-14">
                        <Progress type="circle" percent={75} />
                        <Progress type="circle" percent={39} />
                        <Progress type="circle" percent={100} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashbord;