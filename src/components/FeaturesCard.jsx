const FeatureCard = ({ icon: Icon, title }) => (
    <div className="feature-card">
        <div className="feature-card__icon">
            <Icon size={18} />
        </div>
        <p>{title}</p>
    </div>
);

export default FeatureCard;