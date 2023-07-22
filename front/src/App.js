import { BrowserRouter,  Link, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Pratice from "./pages/pratice";
import Compete from "./pages/compete";
import Login from "./pages/login"
import NewUser from "./pages/newuser";

function App() {
  return (
    <div>
      {/* navbar */}
      <BrowserRouter>
          <div className=" w-full shadow-xl bg-gray-900 sticky p-5 justify-around text-center top-0 flex text-lg">
            {/* <img src={logo} className=" rounded-lg float-left" width="100px"></img> */}
            <p className=" text-blue-400 text-2xl">Tally Typo</p>
            <div className=" my-auto">
            <Link className="px-10 p-2 hover:border-b-2 hover:border-blue-600 active:text-blue-600" to={'/'}>Home</Link>
            <Link className="px-10 p-2 hover:border-b-2 hover:border-blue-600 active:text-blue-600" to={'/pratice'}>Pratice</Link>
            <Link className="px-10 p-2 hover:border-b-2 hover:border-blue-600 active:text-blue-600" to={'/compete'}>Compete</Link>
            <Link className="px-10 p-2 hover:border-b-2 hover:border-blue-600 active:text-blue-600" to={'/login'}>Login</Link>
          </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/pratice" element={<Pratice />}></Route>
            <Route path="/compete" element={<Compete />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/newuser" element={<NewUser />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
