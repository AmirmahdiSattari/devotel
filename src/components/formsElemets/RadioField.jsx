
const RadioField = ({ label, name, register, options }) => {
    return (
        <div className="w-full flex flex-col gap-4">
            <span className="label-text pb-1 opacity-70">{label}</span>
            {options?.map((option) => (
                <label key={option} className="label cursor-pointer !px-6">
                    <input
                        type="radio"
                        {...register(name)}
                        value={option}
                        className="radio"
                    />
                    <span className="label-text">{option}</span>
                </label>
            ))}
        </div>
    );
};

export default RadioField;
