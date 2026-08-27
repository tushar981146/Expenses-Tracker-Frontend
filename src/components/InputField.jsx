const InputField = ({ label, type = 'text', value, onChange, placeholder, icon: Icon }) => (
    <div className="input-field input-field__icon">
        <label>{label}</label>
        <Icon size={16} />
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="input-field__control"
        />
    </div>
);


export default InputField;