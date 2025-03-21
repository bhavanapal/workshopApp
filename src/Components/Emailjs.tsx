import emailjs from '@emailjs/browser';

export const SendEmailjs = async (toEmail: string, message:string, subject:string) =>{ 
    // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    try{
        const response = await emailjs.send(
         import.meta.env.VITE_EMAILJS_SERVICE_ID,
         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
         {
            from_name: 'Workshop Feedback & Workshop Certificate',
            to_email :  toEmail, 
            subject:    subject,
            message :   message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_ID,
        );
        console.log('Email sent successfully:', response);
        window.localStorage.setItem('otp', otp);
    }catch(error){
        console.log('Error sending email',error);
        throw new Error('Error sending OTP email');
    }
  }