
const SelectField = ({ label, name, register, errors, options, required }) => {
    return (
        <div className="w-full">
            <label className="label text-xl">{label}</label>
            <select
                {...register(name, {
                    required: required ? "This field is required" : false,
                })}
                className="select select-bordered w-full"
            >
                {options?.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <span className="text-red-500">{errors[name]?.message}</span>
            )}
        </div>
    );
};

export default SelectField;
