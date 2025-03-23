import Certificate from '../Components/Certificate'
import Conatiner from '../Components/Conatiner'

const StudentCertificate = () => {
  return (
    <div className="w-full py-8 mt-4 text-center">
    <Conatiner>
        <div className="flex flex-wrap">
        <div className="p-2 w-full">
        <h1 className="text-2xl font-bold hover:text-gray-500 text-slate-700">Certificate</h1>
        </div>
        </div>
        <div className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 py-8">
        <Certificate/>
      </div>
      </div>
    </Conatiner>
    </div>
   
  )
}

export default StudentCertificate