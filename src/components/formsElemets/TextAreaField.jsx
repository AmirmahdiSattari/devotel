
const TextAreaField = ({ label, name, placeholder, register, errors, validation }) => (
    <div className="w-full">
        <legend className="pb-2 opacity-70">{label}</legend>
        <textarea {...register(name, validation)} placeholder={placeholder}
            className="textarea w-full border !p-6 rounded-md" />
        {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
    </div>
);

export default TextAreaField;