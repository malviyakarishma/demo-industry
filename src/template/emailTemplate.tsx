type EmailTemplateProps = {
    name: string;
    email: string;
    country: string;
    mobile: string;
    requirement: string;
    logoUrl: string;
  };
  
  export default function EmailTemplate({ name, email, country, mobile, requirement, logoUrl }: EmailTemplateProps) {
    return `
      <table role="presentation" width="100%" style="font-family: Arial, sans-serif; background:#f7fafd;">
        <tr>
          <td align="center">
            <table role="presentation" style="max-width:500px; width:100%; margin:32px auto; background:#fff; border-radius:12px; box-shadow:0 2px 14px rgba(0,0,60,0.08); overflow:hidden;">
              <tr>
                <td align="center" style="background:#019FE9; padding:28px 0 14px 0;">
                  <img src="${logoUrl}" alt="Company Logo" style="height:62px; width:auto; display:block; margin:0 auto;"/>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 26px 0 26px;">
                  <h2 style="margin:0; color:#019FE9; font-weight:bold; font-size:1.3rem; letter-spacing:1px; text-align:center;">New Inquiry Received</h2>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 26px 0 26px; color:#222; font-size:1rem;">
                  <p style="margin:0 0 20px 0;">
                    You have received a new message via your website contact form:
                  </p>
                  <table style="width:100%; font-size:1rem; color:#222;">
                    <tr><td style="padding:7px 0; font-weight:bold; width:120px; color:#019FE9;">Name:</td><td style="padding:7px 0;">${name}</td></tr>
                    <tr><td style="padding:7px 0; font-weight:bold; color:#019FE9;">Email:</td><td style="padding:7px 0;">${email}</td></tr>
                    <tr><td style="padding:7px 0; font-weight:bold; color:#019FE9;">Country:</td><td style="padding:7px 0;">${country}</td></tr>
                    <tr><td style="padding:7px 0; font-weight:bold; color:#019FE9;">Mobile:</td><td style="padding:7px 0;">${mobile}</td></tr>
                    <tr><td style="padding:7px 0; font-weight:bold; color:#019FE9;">Requirement:</td><td style="padding:7px 0;">${requirement}</td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:34px 0 18px 0; color:#019FE9; font-size:0.92rem;">
                  Dev Vansh Engineers &mdash; Website Inquiry Notification
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;
  }
  