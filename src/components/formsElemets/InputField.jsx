const InputField = ({ name, placeholder, register, errors, validation, label, type = "text" }) => (
    <div className="w-full">
        <span className="label-text pb-1 opacity-70">{label}</span>
        <input
            type={type}
            {...register(name, validation)}
            placeholder={placeholder}
            className="input w-full border !p-6 rounded-md !outline-none"
        />
        {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
    </div>
);


export default InputField
