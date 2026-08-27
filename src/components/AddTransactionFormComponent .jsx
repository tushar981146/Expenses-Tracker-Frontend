import React, { useState } from 'react';
import {
    Plus, DollarSign, ArrowUpRight, Calendar, Tag, FileText,
    ArrowDownLeft
} from 'lucide-react';
import { useExpensesStore } from '../store/useExpensesStore';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';




const categories = ['Food', 'Work', 'Housing', 'Health', 'Utilities', 'Miscellaneous'];
const transactionTypes = ['Expense', 'Income'];

// Helper component for structuring input fields
const InputGroup = ({ label, icon: Icon, children }) => (
    <div className="transaction-field">
        <label className="transaction-field__label">
            <Icon size={16} />
            <span>{label}</span>
        </label>
        {children}
    </div>
);



const AddTransactionFormComponent = () => {

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'Expense',
        category: categories[0],
        date: "", // Default to today
    });

    const { authUser} = useAuthStore();
    const id = authUser ? authUser._id : null;
    

    const { addExpense, currentTitle } = useExpensesStore();

    // NOTE: If you were using this component in a production environment, 
    // you would replace the usage of 'alert' with a custom modal or toast notification.

    const handleSubmit = (e) => {
        e.preventDefault();


        const parsedAmount = parseFloat(formData.amount);
        const finalAmount = formData.type === 'Expense' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

        if (isNaN(parsedAmount) || parsedAmount <= 0 || formData.description.trim() === '') {

            console.error("Please enter valid transaction details.");
            return;
        }



        addExpense({
            ...formData,
            amount: parsedAmount,
            titleId: currentTitle
             
        }, id);
    };

    return (
            <div className="form-card">
            <h3>
                <Plus size={18} style={{ display: 'inline-block', marginRight: '0.45rem' }} />
                <span>Add New Transaction</span>
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="transaction-form-grid">

                    {/* Description */}
                    <div className="transaction-field--wide">
                        <InputGroup label="Description" icon={FileText}>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="e.g., Dinner with client"
                                className="transaction-field__control"
                                required
                            />
                        </InputGroup>
                    </div>

                    {/* Amount */}
                    <InputGroup label="Amount" icon={DollarSign}>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            placeholder="100.00"
                            step="0.01"
                            min="0.01"
                            className="transaction-field__control"
                            required
                        />
                    </InputGroup>

                    {/* Type (Income/Expense) */}
                    <InputGroup label="Type" icon={ArrowUpRight}>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="transaction-field__control"
                        >
                            {transactionTypes.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </InputGroup>

                    {/* Category */}
                    <InputGroup label="Category" icon={Tag}>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="transaction-field__control"
                            required
                        >
                            {categories.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </InputGroup>

                    {/* Date */}
                    <InputGroup label="Date" icon={Calendar}>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="transaction-field__control"
                            required
                        />
                    </InputGroup>

                </div>

                <div className="toolbar" style={{ justifyContent: 'flex-end', marginTop: '0.8rem' }}>
                    <button type="submit" className="btn btn--primary">
                        <Plus size={16} />
                        Record Transaction
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTransactionFormComponent;
