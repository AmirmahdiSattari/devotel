import React, { useEffect, useState } from 'react';
import ApiService from '../../utils/api/api';
import { ToastContainer, toast } from 'react-toastify';
import BackHome from '../navigation/BackHome';

function DataTable() {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.get('/insurance/forms/submissions');

                setColumns(response.data.columns);
                setData(response.data.data);
                setFilteredData(response.data.data);
                setSelectedColumns(response.data.columns);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load data.');
                setLoading(false); // Stop the loading state even on error
            }
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        filterData(event.target.value);
    };

    const filterData = (query) => {
        const lowerCaseQuery = query.toLowerCase();

        if (query === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) =>
                selectedColumns.some((column) =>
                    item[column]?.toString().toLowerCase().includes(lowerCaseQuery)
                )
            );
            setFilteredData(filtered);
        }
    };

    if (loading) {

        return (
            <div className="flex justify-center items-center h-screen ">
                <p className='text-3xl'>
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <section className="md:w-10/12 w-11/12 !mx-auto flex flex-col
         items-start justify-between !py-20 min-h-screen overflow-hidden">

            <img
                className="h-72 object-cover -z-20 absolute right-0 blur-xs md:blur-none brightness-50"
                src="https://devotel.com/wp-content/uploads/2024/12/s6-bg.svg"
                alt="Background"
            />


            <h2 className="text-3xl font-bold mb-5">Insurance Application Table</h2>

            {/* Search */}
            <div className="!my-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered w-full max-w-xs !outline-none !p-4"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {/* Column Selector */}
            <div className="!py-6">
                <h3 className="text-lg font-medium !mb-4">Select Columns to Display</h3>
                <div className="flex flex-wrap items-center justify-start gap-7 ">
                    {columns.map((column, index) => (
                        <label key={index} className="cursor-pointer">
                            <input
                                className='!mx-2'
                                type="checkbox"
                                checked={selectedColumns.includes(column)}
                                onChange={() => {
                                    setSelectedColumns((prev) =>
                                        prev.includes(column)
                                            ? prev.filter((col) => col !== column)
                                            : [...prev, column]
                                    );
                                }}
                            />
                            {column}
                        </label>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="!overflow-x-auto w-full">
                <table className="table table-zebra table-pin-rows table-pin-cols w-full">
                    <thead>
                        <tr>
                            {selectedColumns.map((column, index) => (
                                <th key={index} className="text-left !py-6 !px-2">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {selectedColumns.map((column, colIndex) => (
                                    <td key={colIndex} className="!py-4 !px-2">
                                        {row[column]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}

            <ToastContainer />
        </section>
    );
}

export default DataTable;
