import { useState } from "react";
import { Edit, Trash2, Check } from 'lucide-react';
import { useExpensesStore } from "../store/useExpensesStore";
import { useNavigate } from "react-router-dom";

const ListItem = ({ item }) => {
  const [editTitle, setEditTitle] = useState(item.title);
  const { isLoading, updateTitleList, deleteTitleList, toggleEdit, setCurrentTitle } = useExpensesStore();
  const navigate = useNavigate();


  const handleUpdate = () => {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle || isLoading) return;

    // Update the title in store and close edit mode
    updateTitleList(item._id, trimmedTitle);
  };

  const handleDelete = () => {

    deleteTitleList(item._id);
  };

  const handleDivClick = (id) => {

    setCurrentTitle(id)
    navigate(`/expenses/${id}`); 
  };
  return (
    <div className="list-item">
      {item.isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
          autoFocus
          className="input-field__control"
        />
      ) : (
        <span onClick={() => handleDivClick(item.id)} className="list-item__text">
          {item.title}
        </span>
      )}

      <div className="list-item__actions">
        <button
          onClick={() => item.isEditing ? handleUpdate() : toggleEdit(item._id)}
          className="icon-btn"
          title={item.isEditing ? 'Save' : 'Edit'}
        >
          {item.isEditing ? <Check size={16} /> : <Edit size={16} />}
        </button>
        <button onClick={handleDelete} className="icon-btn" title="Delete">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
