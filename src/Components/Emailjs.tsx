import emailjs from '@emailjs/browser';

export const Emailjs = async (studentEmail: string, workshopLink:string, subject:string) =>{
    try{
        const response = await emailjs.send(
         import.meta.env.VITE_EMAILJS_SERVICE_ID,
         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
         {
            from_name: 'Workshop Certificate',
            to_email : studentEmail,
            subject: subject,
            message : `Hello, \n\nYour workshop profile is now active. You can view your profile using the link below:\n\n${workshopLink}`,
         },
         //'Yoour_User_ID' Replace with your EmailJs UserID
        );
        console.log('Email sent successfully:', response);
    }catch(error){
        console.log('Error sending email',error);
    }
  }

  // set up the email template data
    // const templateParams= {
    //     to_email: studentEmail,
    //     subject: "Your workshop Profile Link",
    //     message : `Hello, \n\nYour workshop profile is now active. You can view your profile using the link below:\n\n${workshopLink}`,
    //   };

    //   // send the email using EmailJS
    //   emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,templateParams,EMAILJS_USER_ID)
    //   .then((response) =>{
    //     console.log('Email sent successfully:', response);
    //   }, (error:any) =>{
    //     console.log('Error sending email', error);
    //   });
    
