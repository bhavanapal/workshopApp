import Conatiner from '../Components/Conatiner'
import AdminForm from '../modules/student/AdminForm'


const WorkshopForm = () => {
  return (
  <div className="w-full py-8 mt-4 text-center">
  <Conatiner>
  <div className="flex flex-wrap">
  <div className="p-2 w-full">
  <h1 className="text-center text-2xl leading-tight m-8 text-gray-800">Create the Form For Workshop</h1>
  </div>
  </div>
  <div className="flex items-center justify-center">
  <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 py-8">
  <AdminForm/> 
  </div>
  </div>   
 </Conatiner>
  </div>
  )
}

export default WorkshopForm