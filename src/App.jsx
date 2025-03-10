import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HeroBanner } from "./components/elements";
import DynamicForm from "./components/forms/DynamicForms";
import DynamicTable from "./components/table/DynamicTable";
import BackHome from "./components/navigation/BackHome";
// import DataTable from './components/tables/DataTable'; // Make sure you have the DataTable component

function App() {
  return (
    <Router>
      <main className="flex flex-col items-center justify-center min-h-screen relative overflow-x-hidden">
        <ToastContainer />

        <BackHome />

        <div className="dropdown mb-72 absolute top-20 left-0">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1  !rounded-2xl !p-4"
          >
            Theme
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
          >
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Default"
                value="default"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Retro"
                value="retro"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Cyberpunk"
                value="cyberpunk"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Valentine"
                value="valentine"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller  btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Aqua"
                value="aqua"
              />
            </li>
          </ul>
        </div>

        <Routes>
          <Route path="/form" element={<DynamicForm />} />

          <Route path="/data" element={<DynamicTable />} />

          <Route path="/" element={<HeroBanner />} />
        </Routes>
        <footer className="bg-base-200 w-full p-3 mt-4 flex items-center justify-center">
          <p className="text-primary">
            Developed by Joy
            <span className="text-base-content"> You can reach me via email at <a className="text-primary" href="mailto:amirmahdisatttariams@gmail.com">amirmahdisattariams@gmail.com</a>.</span>
          </p>
        </footer>

      </main>
    </Router>
  );
}

export default App;
