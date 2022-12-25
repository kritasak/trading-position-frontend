import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Setting from "./pages/setting/setting";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/setting" element={<Setting />} />
            </Routes>
        </BrowserRouter>
    );
}

// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>
//                     Edit <code>src/App.js</code> and save to reload.
//                 </p>
//                 <a
//                     className="App-link"
//                     href="https://reactjs.org"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     Learn React JavaScript
//                 </a>
//             </header>
//         </div>
//     );
// }

export default App;
