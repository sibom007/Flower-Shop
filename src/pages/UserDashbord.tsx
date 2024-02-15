import {
  useSalesinDayQuery,
  useSalesinMonthQuery,
  useSalesinWeekQuery,
  useSalesinYearQuery,
} from "../redex/feature/salse/salse";
import Chart from "./Chart";
import { Alert, Spin } from "antd";

const UserDashbord = () => {
  // const { data: salesDay } = useSalesinDayQuery(undefined);
  // const { data: salesMonth } = useSalesinMonthQuery(undefined);
  // const { data: salesWeek } = useSalesinWeekQuery(undefined);
  // const { data: salesYear } = useSalesinYearQuery(undefined);

  const {
    data: salesDay,
    isLoading: isLoadingDay,
    isError: isErrorDay,
  } = useSalesinDayQuery(undefined, { refetchOnMountOrArgChange: true });
  const {
    data: salesMonth,
    isLoading: isLoadingMonth,
    isError: isErrorMonth,
  } = useSalesinMonthQuery(undefined, { refetchOnMountOrArgChange: true });
  const {
    data: salesWeek,
    isLoading: isLoadingWeek,
    isError: isErrorWeek,
  } = useSalesinWeekQuery(undefined, { refetchOnMountOrArgChange: true });
  const {
    data: salesYear,
    isLoading: isLoadingYear,
    isError: isErrorYear,
  } = useSalesinYearQuery(undefined, { refetchOnMountOrArgChange: true });
  return (
    <div>
      <div>
        <div className="grid grid-cols-3 mx-20 mt-10 border-2 rounded-xl shadow-xl bg-[#eae8dc]">
          <div className=" text-center  p-10">
            <p className="text-lg font-semibold border-r-2 border-orange-400">
              New Login <br />{" "}
              <span className="font-extrabold text-5xl text-[#b6b196]">
                22K
              </span>{" "}
            </p>
          </div>
          <div className=" text-center  p-10">
            <p className="text-lg font-semibold border-r-2 border-orange-400">
              View Page <br />{" "}
              <span className="font-extrabold text-5xl text-[#b6b196]">
                22K
              </span>{" "}
            </p>
          </div>
          <div className=" text-center  p-10">
            <p className="text-lg font-semibold ">
              New Regester <br />{" "}
              <span className="font-extrabold text-5xl text-[#b6b196]">
                22K
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div>
        {/* Render loading spinners while data is being fetched */}
        {isLoadingDay || isLoadingMonth || isLoadingWeek || isLoadingYear ? (
          <Spin className="flex justify-center mt-16" size="large" />
        ) : (
          <>
            <div>
              {" "}
              <div>
                <h1 className="text-center font-bold text-2xl mt-10 underline">
                  Daily Salse
                </h1>
                <Chart data={salesDay?.data} />
              </div>
              <div>
                <h1 className="text-center font-bold text-2xl mt-10 underline">
                  Monthly Salse
                </h1>
                <Chart data={salesMonth?.data} />
              </div>
              <div>
                <h1 className="text-center font-bold text-2xl mt-10 underline">
                  Weekly Salse
                </h1>
                <Chart data={salesWeek?.data} />
              </div>
              <div>
                <h1 className="text-center font-bold text-2xl mt-10 underline">
                  Yearly Salse
                </h1>
                <Chart data={salesYear?.data} />
              </div>
            </div>
          </>
        )}
        {/* Render error messages if any of the queries encounter an error */}
        {isErrorDay && (
          <Alert message="Error fetching sales data for the day" type="error" />
        )}
        {isErrorMonth && (
          <Alert
            message="Error fetching sales data for the month"
            type="error"
          />
        )}
        {isErrorWeek && (
          <Alert
            message="Error fetching sales data for the week"
            type="error"
          />
        )}
        {isErrorYear && (
          <Alert
            message="Error fetching sales data for the year"
            type="error"
          />
        )}
      </div>
    </div>
  );
};

export default UserDashbord;
