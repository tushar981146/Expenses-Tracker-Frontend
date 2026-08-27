import { ResponsiveContainer, PieChart, Legend, Pie, Cell, Tooltip } from 'recharts'


const formatCurrency = (amount) => `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;





const IncomeExpenseDonut = ({expenses= []}) => {

    const totalIncome = expenses
    .filter((exp) => exp.type === "Income")
    .reduce((acc, exp) => acc + exp.amount, 0);

  const totalExpenses = expenses
    .filter((exp) => exp.type === "Expense")
    .reduce((acc, exp) => acc + exp.amount, 0);

  const balance = totalIncome - totalExpenses;

  // If income = 950, expenses = 1739.95, balance = -789.95
  const savingsGoal =
    totalIncome > 0
      ? Math.round((balance / totalIncome) * 100)
      : 0; // can be negative if overspending

  // Dynamic chart data
  const chartData = [
    { name: "Income", value: totalIncome, color: "#10B981" },
    { name: "Expenses", value: totalExpenses, color: "#EF4444" },
    { name: "Balance", value: Math.abs(balance), color: "#6366F1" },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent * 100 > 8) {
      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          style={{ fontSize: "12px" }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }
    return null;
  };

    
    return (
        <div className="chart-panel">
      <h3 className="chart-panel__title">
        Income vs. Expenses
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ padding: "10px 0" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
            formatter={(value, name) => [formatCurrency(value), name]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
    );
};

export default IncomeExpenseDonut;
