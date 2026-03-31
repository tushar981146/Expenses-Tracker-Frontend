import { create } from 'zustand'
import { axiosInstance } from '../libs/axios.js'
import toast from 'react-hot-toast';


export const useExpensesStore = create((set) => ({
    expenses: [],
    titleList: [],
    isLoading: false,


    fetchExpenses: async (id) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`/expenses/get/${id}`);
            set({ expenses: response.data });
        } catch (error) {
            toast.error('Failed to fetch expenses');
        } finally {
            set({ isLoading: false });
        }
    },


    addExpense: async (expense, id) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post(`/expenses/add/${id}`, expense);

            set((state) => ({
                expenses: [...state.expenses, response.data]
            }));
            toast.success('Expense added successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add expense');
        } finally {
            set({ isLoading: false });
        }
    },


    deleteExpense: async (id) => {
        set({ isLoading: true });
        try {
            await axiosInstance.delete(`/expenses/title-delete${id}`);
            set((state) => ({ expenses: state.expenses.filter((expense) => expense.id !== id) }));
            toast.success('Expense deleted successfully');
        } catch (error) {
            toast.error('Failed to delete expense');
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTitleList: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get('/expenses/title-fetch');


            const listWithEditing = response.data.map(item => ({
                ...item,
                
                isEditing: false
            }));

            


            set({ titleList: listWithEditing });
        } catch (error) {
            console.error("error while setting fetch title data", error)
            toast.error('Failed to fetch title list');
        } finally {
            set({ isLoading: false });
        }
    },


    addTitleList: async (title) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post('/expenses/title', { title });


             set((state) => ({
            titleList: [...state.titleList, response.data]
        }));
            toast.success('Title added successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add title');
        } finally {
            set({ isLoading: false });
        }
    },

    updateTitleList: async (id, title) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.put(`/expenses/title-update/${id}`, { title });
            set((state) => ({
                titleList: state.titleList.map((item) =>
                    item._id === id ? response.data : item
                )
            }));
            toast.success('Title updated successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update title');
        } finally {
            set({ isLoading: false });
        }
    },

    deleteTitleList: async (id) => {
        set({ isLoading: true });
        try {
            await axiosInstance.delete(`/expenses/title-delete/${id}`);
            set((state) => ({
                titleList: state.titleList.filter((item) => item._id !== id)
            }));
            toast.success('Title deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete title');
        } finally {
            set({ isLoading: false });
        }
    },

    toggleEdit: (id) => {
        set((state) => ({
            titleList: state.titleList.map(item =>
                item._id === id ? { ...item, isEditing: !item.isEditing } : item
            )
        }));
    },
}));