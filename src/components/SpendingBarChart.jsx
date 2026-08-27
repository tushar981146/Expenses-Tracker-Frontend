import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import { useExpensesStore } from '../store/useExpensesStore';
import { useEffect, useState, useMemo } from 'react';

const COLORS = ['#4F46E5', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#06B6D4', '#F43F5E'];

const SpendingBarChart = ({ expenses }) => {
    
    
    // fetch available titles once
    

    // transform expenses -> chart data
    const chartData = useMemo(() => {
        if (!expenses || expenses.length === 0) return [];

        // group by category
        const categoryTotals = expenses.reduce((acc, exp) => {
            const category = exp.category || "Uncategorized";
            acc[category] = (acc[category] || 0) + exp.amount;
            return acc;
        }, {});

        // convert to array for Recharts
        return Object.entries(categoryTotals).map(([name, value], idx) => ({
            name,
            value: Math.abs(value), // keep positive for chart
            color: COLORS[idx % COLORS.length]
        }));
    }, [expenses]);

    

    return (
        <div className="chart-panel">
                <h3 className="chart-panel__title">Monthly Spending by Category</h3>


            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                    <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip
                        cursor={{ fill: '#f3f4f6' }}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                        formatter={(value, name, props) => [`$${value}`, props.payload.name]}
                    />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingBarChart;
