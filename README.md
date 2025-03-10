Core Technologies Used
React Hook Form – Efficiently manages form state with minimal re-renders and built-in validation.
React Router DOM – Enables seamless client-side navigation without full-page reloads.
Axios – Handles API requests through a structured service layer.
Vite Proxy – Resolves CORS issues by forwarding API requests, enabling smooth cross-origin communication.
How the Dynamic Form Works
The application dynamically renders forms based on structures retrieved from an API, allowing flexibility without manual field configurations.

Key Features:
Dynamic Field Rendering: The API provides the form structure, and fields are mapped accordingly.
Automated Validation: Rules (e.g., required fields, number-only inputs) are applied dynamically.
Conditional Visibility & Dynamic Options: Fields appear or update based on user selections.
Handling CORS Issues
Rather than modifying backend headers, Vite’s built-in proxy forwards API requests, eliminating browser CORS restrictions.

API requests are prefixed with /api, which Vite reroutes to the backend seamlessly.
How We Handle Forms Dynamically
Instead of hardcoding form fields, the app dynamically fetches and renders form configurations from an API.

Process:
Fetching Form Structure: On load, the app requests the form structure from an API.
Dynamic Rendering: Fields are mapped and displayed based on the API response.
Validation & State Management: React Hook Form ensures efficient validation and state handling.
Handling Conditional Visibility & Dynamic Options
Some fields depend on other selections (e.g., selecting a country updates state options).
Using watch() from React Hook Form, the app dynamically updates field options in real time.
Fields only appear when certain conditions are met, improving user experience.
Why React Hook Form?
Optimized Performance: Reduces unnecessary re-renders compared to traditional controlled inputs.
Built-in Validation: Simplifies enforcement of required fields, numeric inputs, and other constraints.
How the Dynamic Table Works
The table adapts dynamically by fetching column definitions and data from an API, eliminating the need for static configurations.

Key Features & Dynamic Behavior:
Dynamic Columns & Data:

The API provides both column names and data entries.
If the API structure changes, the table updates automatically.
Search & Filtering:

Users can search within any visible column.
The dataset is filtered dynamically based on search input.
Selectable Columns:

Users can toggle columns on/off to display only relevant data.
This enhances usability, especially for large datasets.
Optimized Rendering:

useState efficiently manages column selection and filtered results.
The table updates reactively as the dataset or columns change.
Why This Approach?
Scalability: New columns can be added to the API without frontend modifications.
Flexibility: Users can customize their table views as needed.
Performance: Only visible columns are rendered, improving efficiency.

----- amirmahdisattariams@gmail.com
