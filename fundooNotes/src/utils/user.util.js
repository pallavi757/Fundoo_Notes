import dotenv from 'dotenv';
dotenv.config();

const nodemailer = require('nodemailer')
const{google}=require('googleapis')

const CLIENT_ID='290606273107-t7u83saosbdr95hol0krrjmflqk4fbm9.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//041UIXtrSw0Z8CgYIARAAGAQSNwF-L9IrRaryhRFIWgsxy-FPtw-asyiJz9s98z9TjK89gE6p-T5T8nkmFlCWOYL2EqJ5DEKMdz8'

const oauth2client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oauth2client.setCredentials({refresh_token:REFRESH_TOKEN})

export async function sendMail(email,token)
{
    try{
      const accessToken=await oauth2client.getAccessToken()

      const transport=nodemailer.createTransport({
        service:'gmail',
        auth:{
           type:'OAuth2',
           user:'yoursdemo123@gmail.com',
           clientId:CLIENT_ID,
           clientSecret:CLIENT_SECRET,
           refreshToken:REFRESH_TOKEN,
           accessToken:accessToken 
        }
      })

      const mailOption={
        from:'YOURSDEMO123<yoursdemo123@gmail.com>',
        to:email,
        sub:'Hello from gmail using API',
        text:'Hello from gmail email using API',
        html:`<h1>To reset your password<a href="http://localhost:3000/resetpassword/${token}">Click here</a></h1>`
      };

      const result=await transport.sendMail(mailOption)
      return result
    }catch(error){
        return error;
    }
}
// sendMail()
// .then((result)=>console.log('Email sent...',result))
// .catch((error)=>console.log(error.message)); 