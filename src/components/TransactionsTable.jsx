import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import AddTransactionFormComponent from "./AddTransactionFormComponent "
import { useExpensesStore } from '../store/useExpensesStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';


const TransactionsTable = () => {

    const { expenses, isLoading, fetchExpenses, currentTitle } = useExpensesStore();
    const { authUser} = useAuthStore()

    const formatCurrency = (amount) => `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const { _id } = authUser;
    



    useEffect(() => {
        fetchExpenses(_id, currentTitle);
    }, [fetchExpenses]);

    console.log("this is expenses", expenses)





    return (
        <div>
            <div className="table-card">
                <h3>Recent Transactions</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table className="table-shell">
                        <thead>
                            <tr>
                                {['Date', 'Description', 'Amount', 'Type', 'Category'].map((header) => (
                                    <th key={header} scope="col">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((transaction, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{transaction.date}</td>
                                            <td>{transaction.description}</td>
                                            <td className={transaction.type === 'Expense' ? 'type-pill type-pill--expense' : 'type-pill type-pill--income'}>
                                                {transaction.type === 'Expense' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                                                {formatCurrency(Math.abs(transaction.amount))}
                                            </td>
                                            <td>{transaction.type}</td>
                                            <td>
                                                <span className="type-pill type-pill--income">{transaction.category}</span>
                                            </td>
                                        </tr>
                                    );
                                
                                
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <AddTransactionFormComponent />
        </div>
    );
};

export default TransactionsTable;