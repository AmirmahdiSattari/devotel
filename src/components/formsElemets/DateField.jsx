import { useEffect, useRef } from "react";
import Pikaday from "pikaday";

export default function DateField({ name, register, errors, validation, label }) {
    const myDatepicker = useRef(null);
    useEffect(() => {
        const picker = new Pikaday({
            field: myDatepicker.current
        });
        return () => picker.destroy();
    }, []);
    return (
        <div className="w-full">
            <span className="label-text pb-1 opacity-70">{label}</span>
            <input type="text"
                {...register(name, validation)}
                className="input pika-single !p-6 w-full"
                defaultValue="Pick a date"
                ref={myDatepicker} />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
        </div>
    );
}