import AuthContextProvider from "./Context/AuthContextProvider"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard";
import FormContextProvider from "./Context/FormContextProvider";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import WorkshopForm from "./Pages/workshopForm";
import Profile from "./Pages/Profile";
import StudentCertificate from "./Pages/StudentCertificate";

const App = () => {
  return (
    <AuthContextProvider>
      <FormContextProvider>
      <Router>
        <Routes>
           <Route path = "/" element={<Home/>}/>
           <Route path = "/login" element={<Login/>}/>
           <Route path = "/dashboard" element= {<Dashboard/>}/>
           <Route path = "/adminform" element= {<WorkshopForm/>}/>
           <Route path = "/feedback/:Id" element= {<Profile/>}/> 
           <Route path = "/certificate/:Id" element= {<StudentCertificate/>}/> 
        </Routes>
      </Router>
      </FormContextProvider>
    </AuthContextProvider>
  )
}

export default App