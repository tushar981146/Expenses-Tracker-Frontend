import SpendingBarChart from "./SpendingBarChart"
import IncomeExpenseDonut from "./IncomeExpenseDonut"
import { useEffect, useState } from "react";
import { useExpensesStore } from "../store/useExpensesStore";


function Report() {

  const { expenses, fetchExpenses, titleList, fetchTitleList } = useExpensesStore();
  const [selectedCategory, setSelectedCategory] = useState("");


  useEffect(() => {
    fetchTitleList();
  }, [fetchTitleList]);

  useEffect(() => {
    if (selectedCategory) {
      fetchExpenses(selectedCategory);
    }
  }, [selectedCategory, fetchExpenses]);

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };



  return (
    <div>
      <div className="toolbar">
        <h2 className="page-header__title">Reports</h2>
        <select value={selectedCategory} onChange={handleSelectChange} className="select-field">
          <option value="">-- Select Report --</option>
          {titleList.map((c) => (
            <option key={c._id} value={c._id}>{c.title}</option>
          ))}
        </select>
      </div>

      <div className="report-grid">
        <div className="chart-card">
          <SpendingBarChart expenses={expenses} />
        </div>
        <div className="chart-card">
          <IncomeExpenseDonut expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default Report
