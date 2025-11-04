import nodemailer, { Transporter } from 'nodemailer';


export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}


export class EmailService {

  private transporter: Transporter

  constructor(
      MAILER_SERVICE: string,
      MAILER_EMAIL: string,
      MAILER_SECRET_KEY: string
  ) {
    this.transporter = nodemailer.createTransport( {
        service: MAILER_SERVICE,
        auth: {
            user: MAILER_EMAIL,
            pass: MAILER_SECRET_KEY,
        }
    });
  }


  async sendEmail( options: SendMailOptions ): Promise<boolean> {

    const { to, subject, htmlBody, attachements = [] } = options;


    try {

      const sentInformation = await this.transporter.sendMail( {
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      // console.log( sentInformation );

      return true;
    } catch ( error ) {
      return false;
    }

  }


}
