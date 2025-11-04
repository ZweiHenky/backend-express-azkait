

export const contentHtmlAprovedJob = (verificationUrl:string) =>{
    const htmlTemplate = `
<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8" />
            <title>Correo Azkait</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
        </head>
        <body style="margin:0; padding:0; background-color:#f3f4f6; font-family: 'Poppins', sans-serif; font-weight: 400; font-style: normal">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;">
            <tr>
                <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; max-width:600px;">
                    <tr>
                    <td>
                        <img src="https://d25ltszcjeom5i.cloudfront.net/142306/txximlwrhf/Copia_de_banner_de_CTA_y_mail_header_6.png" alt="Banner Azkait" style="width:100%; height:auto; display:block;" />
                    </td>
                    </tr>
                    <tr>
                    <td style="padding: 32px 24px; color:#374151; font-size:16px;">
                        <p style="color:#2563eb; font-weight:500; font-size:18px; margin:0 0 16px;">Hola, ¿cómo estás?</p>
                        <p style="margin:0 0 16px;">
                          ¡Listo! Hemos validado tu vacante y ha sido aprobada <span style="color: #2563eb;">exitosamente</span>.
                          Ya está visible en nuestra plataforma y lista para conectar con talento tech especializado.
                        </p>
<p>
                          Puedes ver el detalle y seguimiento desde tu panel:
                        </p>
                        <p style="text-align: center; margin: 24px 0;">
                        <a href="\${verificationUrl}" style="background-color:#f97316; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:9999px; display:inline-block; font-weight:500;">Ver mis vacantes</a>
                        </p>
                        <p style="margin:0 0 16px;">
                          Gracias por sumarte a la transformación del reclutamiento tech con Azkait.
                        </p>
                        <p style="font-weight:500; margin:0;">El equipo de Azkait</p>
                    </td>   
                    </tr>
                    <tr>
                    <td style="padding: 0 24px;">
                        <hr style="border-top:1px solid #d1d5db; margin:24px 0;" />
                    </td>
                    </tr>
                    <tr>
                    <td style="padding: 24px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="50%" style="font-size:14px; color:#4b5563; vertical-align:top;">
                            <img src="https://d25ltszcjeom5i.cloudfront.net/142306/phrmelqtvl/AZKAitLogo_OK_2.png" alt="Logo Azkait" style="width:100px; height:auto; margin-bottom:8px;" />
                            <p style="margin:0;"><strong>Azka it Consulting</strong></p>
                            <p style="margin:0;">Lago Zurich 219 12, Granada</p>
                            <p style="margin:0;">México</p>
                            </td>
                            <td width="50%" style="font-size:12px; color:#6b7280; vertical-align:top; padding-top:16px;">

                            <table cellpadding="0" cellspacing="0" style="margin-bottom:8px; margin-left:auto;">
                                <tr>
                                <td >
                                  <a href="https://www.facebook.com/azkait/" target="_blank">
                                    <div style="width:32px; height:32px; background:#ffffff; border-radius:50%; display:inline-block; text-align:center;">
                                      <img src="https://d25ltszcjeom5i.cloudfront.net/142306/uqxbxifvqt/facebook_new.png" alt="Facebook"  style="width:28px; margin-top:5px;" />
                                    </div>
                                  </a>
                                </td>
                                <td >
                                  <a href="https://www.linkedin.com/company/azka-it-consulting/?viewAsMember=true" target="_blank">
                                    <div style="width:32px; height:32px; background:#ffffff; border-radius:50%; display:inline-block; text-align:center;">
                                      <img src="https://d25ltszcjeom5i.cloudfront.net/142306/xpasjjtanw/linkedin_new.png" alt="LinkedIn" style="width:28px; margin-top:5px;" />
                                    </div>
                                  </a>
                                </td>
                                <td >
                                  <a href="https://www.instagram.com/azka_it/" target="_blank">
                                    <div style="width:32px; height:32px; background:#ffffff; border-radius:50%; display:inline-block; text-align:center;">
                                      <img src="https://d25ltszcjeom5i.cloudfront.net/142306/dhccxvnyyy/insta_new.png" alt="Instagram"  style="width:28px; margin-top:5px;" />
                                    </div>
                                  </a>
                                </td>
                                <td>
                                    <a href="https://www.youtube.com/channel/UCCjUkvLo8FI-X3er5vHZ-Rw" target="_blank">
                                      <div style="width:32px; height:32px; background:#ffffff; border-radius:50%; display:inline-block; text-align:center;">
                                       <img src="https://d25ltszcjeom5i.cloudfront.net/142306/ddbsmmwcad/youtube_new.png" alt="Email"  style="width:28px; margin-top:5px;" />
                                      </div>
                                    </a>
                                </td>
                                </tr>
                            </table>
                            <p style="margin:0; text-align:right;">Recibiste este correo porque te registraste en nuestro sitio web.</p>
                            <a href="#" style="color:#3b82f6; text-decoration:underline; text-align:right; display: block;">Darme de baja</a>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>

                </table>
                </td>
            </tr>
            </table>
        </body>
        </html>`
    ;

    const htmlFinal = htmlTemplate.replace('${verificationUrl}', verificationUrl);


    return htmlFinal
}