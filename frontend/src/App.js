import Navbar from './Components/Navbar';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Create from './Components/Create';
import Read from './Components/Read';
import Update from './Components/Update';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
      <Routes>
       <Route exact path="/" element={<Create/>}/>
       <Route  path="/all" element={<Read/>}/>
       <Route  path="/:id" element={<Update/>}/>
      </Routes>
     </BrowserRouter>
      

    </div>
  );
}

export default App;
