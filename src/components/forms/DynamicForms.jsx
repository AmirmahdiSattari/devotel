import { useEffect, useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import ApiService from "../../utils/api/api";
import {
    CheckBoxField,
    DateField,
    InputField,
    RadioField,
    SelectField,
} from "../formsElemets";
import { validations } from "../../../constants/validations";
import BackHome from "../navigation/BackHome";

function DynamicForm() {
    const [formStructure, setFormStructure] = useState(null);
    const [selectedForm, setSelectedForm] = useState(null);
    const [dynamicOptions, setDynamicOptions] = useState({});

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        async function fetchFormStructure() {
            try {
                const response = await ApiService.get("/insurance/forms");
                console.log("🔴🔴🔴🔴");
                console.log(response.data);
                setFormStructure(response.data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load form structure");
            }
        }

        fetchFormStructure();
    }, []);

    const fetchDynamicOptions = useCallback(async (field) => {
        try {
            const response = await ApiService.get(field.dynamicOptions.endpoint);
            setDynamicOptions((prev) => ({
                ...prev,
                [field.id]: response.data,
            }));
        } catch (error) {
            console.log(error);
            toast.error("Failed to load dynamic options");
        }
    }, []);

    const fetchOptionsFromServer = useCallback(
        async (endpoint, dependentValue, field) => {
            if (!dependentValue) return;
            try {
                const strcEndpoint = endpoint.split("/api")[1];
                const structuredEndpoint = `${strcEndpoint}?${field.dynamicOptions.dependsOn}=${dependentValue}`;
                const response = await ApiService.get(structuredEndpoint);
                setDynamicOptions((prev) => ({
                    ...prev,
                    [field.id]: response.data.states,
                }));
            } catch (error) {
                console.error(`Failed to load options for ${field.id}:`, error);
            }
        },
        []
    );

    useEffect(() => {
        if (selectedForm) {
            selectedForm.fields.forEach((field) => {
                if (field.dynamicOptions) {
                    fetchDynamicOptions(field);
                }
            });
        }
    }, [selectedForm, fetchDynamicOptions]);

    const handleVisibility = useMemo(
        () => (field) => {
            if (!field) return false;

            const dependentValue = field?.visibility?.dependsOn
                ? watch(field.visibility.dependsOn)
                : null;

            if (field?.dynamicOptions?.dependsOn) {
                const dependentValueApi = watch(field.dynamicOptions.dependsOn);
                fetchOptionsFromServer(
                    field.dynamicOptions.endpoint,
                    dependentValueApi,
                    field
                );
                return !!dependentValueApi;
            }

            if (field?.visibility) {
                const { condition, value } = field.visibility;
                return condition === "equals" ? dependentValue === value : false;
            }

            return true;
        },
        [watch, fetchOptionsFromServer]
    );

    const handleSelectForm = useCallback(
        (index) => {
            setSelectedForm(formStructure[index]);
        },
        [formStructure]
    );

    const onSubmit = useCallback(
        async (data) => {
            if (!data) return;

            const endPoint = "/insurance/forms/submit";
            try {
                console.log(data);
                const response = await ApiService.post(endPoint, data);
                const { status, message } = response.data;
                if (status === "success") {
                    toast.success(message);
                    reset();
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to submit form");
            }
        },
        [reset]
    );

    if (!formStructure) return <p>Loading...</p>;

    return (
        <main className="container w-11/12 h-full min-h-screen mx-auto p-4 flex flex-col items-center justify-between gap-2 sm:!py-20 relative">

            <img
                className="h-72 object-cover -z-20 "
                src="https://devotel.com/wp-content/uploads/2024/12/s6-bg.svg"
                alt="Background"
            />

            <p className="sm:text-3xl text-xl font-bold text-center">
                Select one of Options 👇
            </p>
            <section className="w-11/12 mx-auto flex flex-wrap items-center justify-between gap-5 sm:!py-10">
                {formStructure.map((res, i) => (
                    <div
                        key={i}
                        className="stack sm:size-28 min-w-max hover:scale-105 duration-300 !mx-auto"
                        onClick={() => handleSelectForm(i)}
                    >
                        <div className="border-base-content card bg-base-100 border text-center">
                            <div className="card-body flex items-center justify-center">
                                <span className="h-auto !text-center  sm:text-xl font-bold !px-5">
                                    {res.title}
                                </span>
                            </div>
                        </div>
                        <div className="border-base-content card bg-base-100 border text-center">
                            <div className="card-body flex items-center justify-center" />
                        </div>
                        <div className="border-base-content card bg-base-100 border text-center">
                            <div className="card-body flex items-center justify-center" />
                        </div>
                        <div className="border-base-content card bg-base-100 border text-center">
                            <div className="card-body flex items-center justify-center" />
                        </div>
                    </div>
                ))}
            </section>

            {/* Render selected form fields */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 items-center w-full"
            >
                {selectedForm?.fields.map((field, i) => {
                    if (!handleVisibility(field)) return null;

                    return (
                        <div key={i} className="flex w-full flex-col">
                            <div className="divider !py-6">{field.label}</div>
                            <div className="card bg-base-300 rounded-box h-min !p-12 place-items-center mb-6 flex flex-col items-center justify-between gap-5">
                                {(() => {
                                    switch (field.type) {
                                        case "text":
                                            return (
                                                <InputField
                                                    label={field.label}
                                                    name={field.id}
                                                    register={register}
                                                    errors={errors}
                                                    validation={
                                                        field.required ? validations.mustFilled : {}
                                                    }
                                                />
                                            );
                                        case "number":
                                            return (
                                                <InputField
                                                    label={field.label}
                                                    name={field.id}
                                                    type={"number"}
                                                    register={register}
                                                    errors={errors}
                                                    validation={
                                                        field.required ? validations.mustFilled : {}
                                                    }
                                                />
                                            );
                                        case "date":
                                            return (
                                                <DateField
                                                    label={field.label}
                                                    name={field.id}
                                                    register={register}
                                                    errors={errors}
                                                    validation={
                                                        field.required ? validations.mustFilled : {}
                                                    }
                                                />
                                            );
                                        case "select":
                                            return (
                                                <SelectField
                                                    label={field.label}
                                                    name={field.id}
                                                    register={register}
                                                    errors={errors}
                                                    options={dynamicOptions[field.id] || field.options}
                                                    required={field.required}
                                                />
                                            );
                                        case "radio":
                                            return (
                                                <RadioField
                                                    label={field.label}
                                                    name={field.id}
                                                    register={register}
                                                    options={field.options}
                                                />
                                            );
                                        case "checkbox":
                                            return (
                                                <CheckBoxField
                                                    label={field.label}
                                                    name={field.id}
                                                    register={register}
                                                    options={field.options}
                                                />
                                            );
                                        case "group":
                                            return field.fields.map((nestedField) => {
                                                if (!handleVisibility(nestedField)) return null;

                                                switch (nestedField.type) {
                                                    case "text":
                                                        return (
                                                            <InputField
                                                                key={nestedField.id}
                                                                label={nestedField.label}
                                                                name={nestedField.id}
                                                                register={register}
                                                                errors={errors}
                                                                validation={
                                                                    nestedField.required
                                                                        ? validations.mustFilled
                                                                        : {}
                                                                }
                                                            />
                                                        );
                                                    case "number":
                                                        return (
                                                            <InputField
                                                                key={nestedField.id}
                                                                label={nestedField.label}
                                                                name={nestedField.id}
                                                                type={"number"}
                                                                register={register}
                                                                errors={errors}
                                                                validation={
                                                                    nestedField.required
                                                                        ? validations.mustFilled
                                                                        : {}
                                                                }
                                                            />
                                                        );
                                                    case "select":
                                                        return (
                                                            <SelectField
                                                                key={nestedField.id}
                                                                label={nestedField.label}
                                                                name={nestedField.id}
                                                                register={register}
                                                                errors={errors}
                                                                options={
                                                                    dynamicOptions[nestedField.id] ||
                                                                    nestedField.options
                                                                }
                                                                required={nestedField.required}
                                                            />
                                                        );
                                                    case "radio":
                                                        return (
                                                            <RadioField
                                                                key={nestedField.id}
                                                                label={nestedField.label}
                                                                name={nestedField.id}
                                                                register={register}
                                                                options={nestedField.options}
                                                            />
                                                        );
                                                    case "checkbox":
                                                        return (
                                                            <CheckBoxField
                                                                key={nestedField.id}
                                                                label={nestedField.label}
                                                                name={nestedField.id}
                                                                register={register}
                                                                options={nestedField.options}
                                                            />
                                                        );
                                                    default:
                                                        return null;
                                                }
                                            });
                                        default:
                                            return null;
                                    }
                                })()}
                            </div>
                        </div>
                    );
                })}
                {selectedForm && (
                    <div className="flex items-center justify-center gap-5 w-full">
                        <button
                            type="submit"
                            className="btn btn-primary !mt-5 w-5/12 mx-auto"
                        >
                            Submit
                        </button>
                        <button
                            type="submit"
                            className="btn btn-error !mt-5 w-5/12 mx-auto text-white"
                            onClick={() => reset()}
                        >
                            Clear
                        </button>
                    </div>
                )}
            </form>

            <ToastContainer />
        </main>
    );
}

export default DynamicForm;
