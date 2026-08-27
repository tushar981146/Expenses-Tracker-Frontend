
import { useEffect, useState } from "react";
import { useExpensesStore } from "../store/useExpensesStore";
import SummaryCard from "./SummaryCard";
import { LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useAuthStore } from "../store/useAuthStore";




function HomeDashboard() {

    const { expenses, fetchExpenses, fetchTitleList, titleList } = useExpensesStore();
    const { authUser } = useAuthStore();
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchTitleList();


        fetchExpenses(authUser._id);

        

    }, [fetchTitleList])


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


    const handleSelectChange = (e) => {
        setSelectedCategory(e.target.value);
        fetchExpenses(e.target.value);

    };
    return (
        <div className="dashboard-content">
            {/* Summary Cards Section (Responsive Grid) */}
            <div className="summary-grid">
                <SummaryCard
                    title="Total Balance"
                    value={balance}
                    icon={Wallet}
                    colorClass="text-indigo-600"
                />
                <SummaryCard
                    title="Monthly Income"
                    value={totalIncome}
                    icon={ArrowUpRight}
                    colorClass="text-green-600"
                />
                <SummaryCard
                    title="Monthly Expenses"
                    value={totalExpenses}
                    icon={ArrowDownLeft}
                    colorClass="text-red-600"
                />
                <SummaryCard
                    title="Savings Goal"
                    value={savingsGoal} // Total goal amount, not displayed directly
                    icon={LayoutDashboard} // Reusing dashboard icon for savings goal
                    colorClass="text-yellow-600"
                    isGoal={true}
                    goalPercentage={savingsGoal}
                />
            </div>


            <div className="toolbar">
                
                {/* Dropdown */}
                <select
                    value={selectedCategory}
                    onChange={handleSelectChange}
                    className="select-field"
                >
                    <option value="">-- Select Report --</option>
                    {titleList.map((c) => (
                        <option key={c._id} value={c._id}>{c.title}</option>
                    ))}
                </select>
            </div>

        </div>
    )
}

export default HomeDashboard
