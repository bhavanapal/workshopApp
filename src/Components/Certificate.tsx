import {jsPDF} from "jspdf";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {ref, get, set} from 'firebase/database';
import { database } from "../config/Firebase";

type CertificateType={
    collegeName : string;
    workshopName : string;
    date : string;
    time : string;
    studentName : string;
}

const Certificate = ({collegeName,workshopName ,date ,time,studentName}: CertificateType) => { 
const[certificateData,setCertificateData] = useState();
 const {Id} = useParams();
console.log("certificate link Id:", Id);


// fetch the certificate data from firebase
useEffect(() => {
  if(Id){
    const loadForms = async() => {
        try{
            const fetchedForms = ref(database, `feedbacks/${Id}`); //${Id}
            const snapshot = await get(fetchedForms);
            
        if(snapshot.exists()){
            const data = snapshot.val();
            console.log("Fetched data from Firebase:", data);
            setCertificateData(data);
          } else {
            console.error("No data available for this Id");
          } 
        } catch(error) {
            console.error("Error fetching data from firebase:", error);
          } 
        };
loadForms(); 
} else{
  console.error("No Id provided in the URL");
}  
},[Id])


 const generateCertificate = () =>{ 
  // if(!certificateData){
  //   alert("No data available to generate the certificate.");
  //   return;
  // }

    const doc = new jsPDF();
    doc.setFont("helvetica","normal");

    // title
    doc.setFontSize(22);
    doc.text("Certificate of Workshop", 105,40,{align:'center'}); //20,30

    // student information
    doc.setFontSize(16);
    doc.text(`This is to certifies that ${studentName}`, 105, 70 ,{align:'center'});
    doc.text(`has successfully completed the Workshop: ${workshopName}`,105, 70 ,{align:'center'});
    doc.text(`from: ${collegeName}`,105, 70 , {align:'center'}); //20,60
    doc.text(`date: ${date}`, 105, 150 ,'center'); //20,50
    doc.text(`time:${time}`,105, 150 ,'center');
    doc.text('Authorized Signature:_______' ,105,220, {align:'center'});
   const pdfName = (`${studentName}_Certificate.pdf`); //"certificate.pdf"
   doc.save(pdfName);
      // const pdfData = doc.output("datauristring");
      console.log(pdfName);

      // save certificate data in firebase
    //   const certificateRef = ref(database, 'certificates/' + Id);
    //   set(certificateRef,{
    //     studentName,
    //     workshopName,
    //     date,time,
    //     CertificateUrl : pdfName,
    //     timeStamp: new Date().toISOString(),
    //   }).then(() => {
    //     alert("Certificate generated and saved!");
    //   }).catch((error:any) =>{
    //     console.log("Error saving certificate data:",error);
    //   });
    // };

    // if(loading){
    //   return <div>Loading certificate data...</div>
    // }

    // if(!certificateData){
    //   return <div>No data found for this certificate.</div>;
    // }
 }

    return (
    <div>
        <h2>Certificate for Workshop </h2>
          <button onClick={generateCertificate}> Download Certificate</button>
    </div>
  )

}

export default Certificate