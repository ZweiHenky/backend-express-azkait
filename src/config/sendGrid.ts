import { CustomError } from "../domain"

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export class SendGrid {

    private readonly email:string | undefined = process.env.SENDGRID_EMAIL

    public getEmail = () =>{
        return this.email
    }

    static sendEmail = async( to:string, subject:string, html:string):Promise<boolean> =>{

        const instance = new SendGrid()

        if (!instance.getEmail()) {
            throw CustomError.internalServerError("variable email not found")
        }

        console.log(instance.getEmail());
        

        const msg = {
            to: to, // Change to your recipient
            from: instance.getEmail(), // Change to your verified sender
            subject: subject,
            html: html,
        }
        
        return sgMail.send(msg)
        .then((res:any) => {
            console.log(res);
            
            return true
        })
        .catch((error:any) => {
            console.log(error);
            
            return false
        })
    }
    
}