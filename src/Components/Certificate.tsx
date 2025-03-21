import {jsPDF} from "jspdf";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {ref, get} from 'firebase/database';
import { database } from "../config/Firebase";

type CertificateType={
    collegeName : string;
    workshopName : string;
    date : string;
    time : string;
    studentName : string;
}

const Certificate = ({collegeName,workshopName ,date ,time,studentName}:CertificateType) => { 
const [certificate, setCertificateData] = useState<any>();
const {Id} = useParams();


// fetch the certificate data from firebase
useEffect(() => {
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
        }
loadForms();   
},[Id])


 const generateCertificate = () =>{ 
    // setCertificateData();

    const doc = new jsPDF();
    doc.setFont("helvetica","normal");

    // title
    doc.setFontSize(22);
    doc.text("Certificate of Workshop", 20,30, {align:'center'});

    // student information
    doc.setFontSize(16);
    doc.text(`This is to certifies that ${studentName}`, 20, 50 , {align:'center'});
    doc.text(`has successfully completed the Workshop: ${workshopName}`,20,60 , {align:'center'});
    doc.text(`from: ${collegeName}`,20,60 , {align:'center'});
    doc.text(`date: ${date}`, 20,50);
    doc.text(`time:${time}`, 20,60);
    doc.text('Authorized Signature:_______' ,105,220,{align:'center'});
    doc.save(`${studentName}_Certificate.pdf`); //"certificate.pdf"

    //  const pdfData = doc.output("datauristring");
    };
    return (
    <div>
        <h2>Certificate for Workshop</h2>
          <button onClick={generateCertificate}> Download Certificate</button>
    </div>
  )
}

export default Certificate