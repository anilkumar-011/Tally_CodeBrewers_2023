import { BrowserRouter,  Link, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Pratice from "./pages/pratice";
import Compete from "./pages/compete";

function App() {
  return (
    <div>
      {/* navbar */}
      <BrowserRouter>
          <div className=" w-full sticky justify-around text-center top-0 flex text-lg">
            {/* <img src={logo} className=" rounded-lg float-left" width="100px"></img> */}
            Tally Typo
            <div className=" my-auto">
            <Link className="px-10 p-2 hover:border-b-2 hover:border-blue-600 active:text-blue-600" to={'/'}>Home</Link>
            <Link className="px-10 p-2 hover:border-b-2 hover:border-blue-600 active:text-blue-600" to={'/pratice'}>Pratice</Link>
            <Link className="px-10 p-2 hover:border-b-2 hover:border-blue-600 active:text-blue-600" to={'/compete'}>Compete</Link>
          </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/pratice" element={<Pratice />}></Route>
            <Route path="/compete" element={<Compete />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
