import { Plus, List, Link } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useExpensesStore } from '../store/useExpensesStore';
import ListItem from './ListItems';


const SimpleTodoList = () => {

    const {  fetchTitleList, addTitleList, titleList } = useExpensesStore();
    const [localList, setLocalList] = useState([]);

    useEffect(() => {
        fetchTitleList();
    }, []);

     useEffect(() => {
        setLocalList(titleList.map(item => ({ ...item, isEditing: false })));
    }, [titleList]);


    const [newItemTitle, setNewItemTitle] = useState('');

    // Function to add a new item
    const handleAddItem = (e) => {
        e.preventDefault();
        const trimmedTitle = newItemTitle.trim();
        if (trimmedTitle === '') return;


        addTitleList(trimmedTitle);
        
    };

    
    const handleToggleEdit = (id) => {
        setLocalList(localList.map(item =>
            item._id === id ? { ...item, isEditing: !item.isEditing } : item
        ));
    };

    

    return (
        <div className="w-full mx-auto py-4">

            {/* Input Form for New Item */}
            <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
                <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="e.g., Check current mortgage rate"
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                        className="flex-grow px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        required
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors w-full sm:w-auto"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Task
                    </button>
                </form>
            </div>

            {/* List Display */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Budget Lists ({titleList.length})</h2>
                {titleList.length > 0 ? (
                    <div  className="space-y-4 text-black">
                        {titleList.map(item => (
                            <ListItem  key={item._id} item={item}  onToggleEdit={(id) => handleToggleEdit(id)}  />
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
                        <List className="w-8 h-8 mx-auto mb-2" />
                        <p>No tasks yet! Add a new item above to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SimpleTodoList;