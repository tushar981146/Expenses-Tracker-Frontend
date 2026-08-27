const SummaryCard = ({ title, value, icon: Icon, colorClass, isGoal, goalPercentage }) => {

    const formatCurrency = (amount) => `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const formattedValue = isGoal ? `${goalPercentage}% reached` : formatCurrency(value);
    
    // Determine goal bar color and progress width
    const goalColor = goalPercentage >= 100 ? 'summary-card__bar-fill--success' : 'summary-card__bar-fill--warning';
    const goalWidth = goalPercentage > 100 ? '100%' : `${goalPercentage}%`;

    return (
        <div className="summary-card">
            <div className="summary-card__header">
                <p className="summary-card__title">{title}</p>
                <div className="summary-card__icon">
                    <Icon size={18} />
                </div>
            </div>
            
            <p className="summary-card__value">{formattedValue}</p>

            {isGoal && (
                <div>
                    <div className="summary-card__bar">
                        <div 
                            className={`summary-card__bar-fill ${goalColor}`}
                            style={{ width: goalWidth }}
                        ></div>
                    </div>
                    <p className="summary-card__title" style={{ marginTop: '0.4rem' }}>Goal: $6,000</p>
                </div>
            )}
        </div>
    );
};

export default SummaryCard;
