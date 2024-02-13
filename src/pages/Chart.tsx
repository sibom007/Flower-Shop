import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const Chart = ({ data }: any) => {
  return (
    <div className="mx-10 text-center">
      <BarChart
        width={1600}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Bar dataKey="totalSales" fill="#eae8dc" label={{ position: "top" }}>
          {data.map((index: number) => (
            <Bar
              key={`bar-${index}`}
              dataKey="yourDataKey"
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default Chart;
