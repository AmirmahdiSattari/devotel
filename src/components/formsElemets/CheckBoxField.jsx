const CheckboxField = ({ label, name, register, options }) => {
    return (
        <div className="w-full flex flex-col gap-5">
            <span className="label-text pb-1 opacity-70">{label}</span>
            {options.map((option) => (
                <label key={option} className="label cursor-pointer">
                    <input
                        type="checkbox"
                        {...register(name)}
                        value={option}
                        className="checkbox"
                    />
                    <span className="label-text">{option}</span>
                </label>
            ))}
        </div>
    );
};

export default CheckboxField;
