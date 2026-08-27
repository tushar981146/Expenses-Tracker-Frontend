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
        <div>
            <div className="form-card">
                <h2>Add New Task</h2>
                <form onSubmit={handleAddItem} className="toolbar" style={{ justifyContent: 'flex-start', marginBottom: 0 }}>
                    <input
                        type="text"
                        placeholder="e.g., Check current mortgage rate"
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                        className="input-field__control"
                        style={{ maxWidth: '420px' }}
                        required
                    />
                    <button type="submit" className="btn btn--primary">
                        <Plus size={16} />
                        Add Task
                    </button>
                </form>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <h2 style={{ marginBottom: '0.8rem' }}>All Budget Lists ({titleList.length})</h2>
                {titleList.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                        {titleList.map(item => (
                            <ListItem key={item._id} item={item} onToggleEdit={(id) => handleToggleEdit(id)}  />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <List size={24} style={{ margin: '0 auto 0.4rem' }} />
                        <p>No tasks yet! Add a new item above to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SimpleTodoList;