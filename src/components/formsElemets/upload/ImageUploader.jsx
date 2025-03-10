// "use client";
// import { getAuthToken } from "@/utils/admin/auth";
// import copyToClipboard from "@/utils/copyUrl";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// const ImageUpload = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         setError,
//     } = useForm();
//     const [imageUrl, setImageUrl] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setErrorState] = useState(null);

//     const handleFileUpload = async (data, event) => {
//         event.preventDefault(); // Prevent default form submission behavior

//         if (!data.image || !data.image[0]) {
//             setError("image", {
//                 type: "manual",
//                 message: "Please select a file to upload",
//             });
//             return;
//         }

//         const formData = new FormData();
//         // console.log("Uploading file:", data.image[0]); // Debugging
//         const token = getAuthToken();

//         formData.append("image", data.image[0]); // Ensure key matches backend requirement

//         setLoading(true);
//         setErrorState(null);

//         try {
//             const response = await fetch(
//                 "https://dayanupbackend.liara.run/api/v1/upload/image",
//                 {
//                     method: "POST",
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Replace with your actual token
//                     },
//                     body: formData, // No need to set 'Content-Type' for FormData
//                 },
//             );

//             const result = await response.json();
//             // console.log("Response:", result); // Debugging

//             if (response.ok) {
//                 setImageUrl(result.imageUrl); // Assuming backend returns imageUrl
//             } else {
//                 setErrorState(result.message || "Error uploading image");
//             }
//         } catch (err) {
//             console.error("Upload Error:", err);
//             setErrorState("Failed to upload image");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="image-upload flex items-start justify-between gap-4 ">

//             <form
//                 onSubmit={handleSubmit(handleFileUpload)}
//                 encType="multipart/form-data"
//                 className="flex w-8/12 h-full flex-col items-start justify-around gap-5 "
//             >
//                 {/* image url */}
//                 <p className="text-xl font-bold"> {`محل آپلود تصویر 👇`}</p>
//                 {imageUrl && (
//                     <div className="flex items-center justify-between gap-2">
//                         <p className="rounded-25 bg-base-200 p-4 border-2 border-primary/20 text-primary">{imageUrl}</p>
//                         <button className="rounded-25 border-2 border-primary/20 bg-base-200 p-4 text-primary"
//                             onClick={() => copyToClipboard(imageUrl)}
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     fill="currentColor"
//                                     d="M19.53 8L14 2.47a.75.75 0 0 0-.53-.22H11A2.75 2.75 0 0 0 8.25 5v1.25H7A2.75 2.75 0 0 0 4.25 9v10A2.75 2.75 0 0 0 7 21.75h7A2.75 2.75 0 0 0 16.75 19v-1.25H17A2.75 2.75 0 0 0 19.75 15V8.5a.75.75 0 0 0-.22-.5m-5.28-3.19l2.94 2.94h-2.94Zm1 14.19A1.25 1.25 0 0 1 14 20.25H7A1.25 1.25 0 0 1 5.75 19V9A1.25 1.25 0 0 1 7 7.75h1.25V15A2.75 2.75 0 0 0 11 17.75h4.25ZM17 16.25h-6A1.25 1.25 0 0 1 9.75 15V5A1.25 1.25 0 0 1 11 3.75h1.75V8.5a.76.76 0 0 0 .75.75h4.75V15A1.25 1.25 0 0 1 17 16.25"
//                                 />
//                             </svg>
//                         </button>
//                     </div>
//                 )}

//                 <div>
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         {...register("image", { required: "Image is required" })}
//                         className="file-input file-input-bordered w-full max-w-xs"
//                     />
//                     {errors.image && (
//                         <span className="text-red-500">{errors.image.message}</span>
//                     )}
//                 </div>

//                 <button type="submit" className="btn btn-neutral" disabled={loading}>
//                     {loading ? "دارم آپلود می‌کنم، استرس نده" : "آپلود تصویر"}
//                 </button>
//             </form>

//             {imageUrl && (
//                 <div className="flex w-4/12 flex-col items-center justify-start gap-3">
//                     <img
//                         src={imageUrl}
//                         alt="Uploaded"
//                         className="h-60 w-auto max-w-md rounded-25"
//                     />
//                     {/* <p className="">{`آپلود شد ✅`}</p> */}
//                 </div>
//             )}

//             {error && (
//                 <div className="mt-4 text-red-500">
//                     <p>{error}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ImageUpload;
