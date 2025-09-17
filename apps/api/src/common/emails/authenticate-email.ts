export function authenticateEmail(accessLink: string) {
  return `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Solicitação de acesso - Prosspecta</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Poppins', Verdana, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="520" cellpadding="0" cellspacing="0" border="0" style="max-width: 520px; background-color: #070d08; border: 1px solid #eaeaea; border-radius: 24px; padding: 34px;">
                  <tr>
                    <td align="center" style="padding: 30px 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 400; text-align: center;">
                        Acesse sua conta do <span style="font-weight: 600;">Prosspecta</span>
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom: 32px;">
                      <p style="margin: 0; color: #ffffff; font-size: 16px; text-align: center;">
                        Clique no botão abaixo para acessar sua conta
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 32px 0;">
                      <a href="${accessLink}" style="display: block; background-color: rgba(105, 255, 102, 0.1); border-radius: 50px; height: 48px; line-height: 48px; text-decoration: none; color: #69ff66; font-weight: 600; font-size: 16px; text-align: center;">
                        Clique aqui para acessar
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 16px 0;">
                      <p style="margin: 0; color: #ffffff; font-size: 16px; text-align: center;">
                        ou copie e cole o link de acesso no seu navegador:<br>
                      </p>
                      <a href="${accessLink}" style="color: #69ff66; text-decoration: none; font-size: 12px; word-break: break-all;">
                        ${accessLink}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                      <p style="margin: 0; color: #ffffff; font-size: 12px; text-align: center;">
                        Este link de acesso será válido apenas pelos próximos 10 minutos.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`
}
