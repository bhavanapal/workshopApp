import AuthContextProvider from "./Context/AuthContextProvider"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminSgnUp from "./modules/auth/AdminSgnUp";
// import AdminLogin from "./modules/auth/AdminLogin";
import Dashboard from "./Pages/Dashboard";
import FormContextProvider from "./Context/FormContextProvider";
// import AdminForm from "./modules/student/AdminForm";
// import StudentProfile from "./modules/student/StudentProfile";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import WorkshopForm from "./Pages/workshopForm";
import Profile from "./Pages/Profile";

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
           <Route path = "/studentprofile/:workshopId" element= {<Profile/>}/>
        </Routes>
      </Router>
      </FormContextProvider>
    </AuthContextProvider>
  )
}

export default App