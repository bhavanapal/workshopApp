import {jsPDF} from "jspdf";
import { useState } from "react";
import {storage,db} from "../config/Firebase";
import { useFormDataContext } from "../Context/FormContext";

type CertificateType={
    collegeName : string;
    workshopName : string;
    date : string;
    time : string;
    studentName : string;
}

const Certificate = ({collegeName,workshopName ,date ,time,studentName}:CertificateType) => {
 const [loading, setLoading] = useState(false);
 const {formData} = useFormDataContext();


 const generateCertificate = () =>{
    if(!formData) return;
    setLoading(true);
    const doc = new jsPDF();
    doc.setFont("helvetica","normal");

    // title
    doc.setFontSize(22);
    doc.text("Certificate of Workshop", 20,30);

    // student information
    doc.setFontSize(16);
    doc.text(`This is to certifies that ${studentName}`, 20, 50 , {align:'center'});
    doc.text(`has successfully completed the Workshop: ${workshopName}`,20,60 , {align:'center'});
    doc.text(`from: ${collegeName}`,20,60 , {align:'center'});
    doc.text(`date: ${date}`, 20,50);
    doc.text(`time:${time}`, 20,60);
    doc.text('Signature:_______' ,105,220,{align:'center'});
    doc.save("certificate.pdf");
    
     // now save certificate data to firebase
     const certificateData = {
         studentName,
         workshopName,
         collegeName,
         date,
         time:db.ServerValue.TIMESTAMP,
     };

    // save the PDF as a blob to upload to firebase storage
    const pdfBlob = doc.output("blob");

    // upload the PDF certificate to firebase Storage
       const storageRef = storage.ref();
       const certificateRef = storageRef.child(`certificates/${db.workshopId}_certificate.pdf`);
       certificateRef.put(pdfBlob);

       // save certificate data to firebase realtime database
        //   const certificateRef = db.ref(`certificates/${workshopId}`);
          certificateRef.set(certificateData)
       .then(()=>{
           console.log(`Certificate uploaded to firebase Storage.`);
   
           // After uploading the certificate,get the download URL
           certificateRef.getDownloadURL().then((url:any) => {
               console.log("Certificate URL:" , url);
           });
       })
       .catch((error:any) =>{
           console.error("Error uploading certificate:", error);
       });
       setLoading(false);
    };
    return (
    <div>
        <h2>Certificate for Workshop</h2>
        {formData? ( <div>
            <p>Student Name : {studentName}</p>
            <p>Workshop Name : {workshopName}</p>
            <p>College Name : {collegeName}</p>
            <p>Date Issued : {date}</p>
            <p>Time : {time}</p>
            <button onClick={() => generateCertificate} disabled={loading}>
         {loading? 'Generating...' : 'Download Certificate'}
     </button>
        </div>
     ):(
        <p>No student data available.Please fill out the form first.</p>
     ) } 
    </div>
  )
}

export default Certificate