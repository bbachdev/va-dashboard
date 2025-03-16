import * as Mailjet from "node-mailjet"

interface EmailOptions {
    to: string,
    subject: string,
    text: string
}

export async function sendEmail(options: EmailOptions) {
  const mailjetClient = Mailjet.Client.apiConnect(process.env.EMAIL_SENDER_API_KEY!, process.env.EMAIL_SENDER_SECRET!)
  const emailRequest = await mailjetClient.post("send", { version: "v3.1"}).request({
    Messages: [
      {
        FromEmail: process.env.EMAIL_FROM_ADDRESS!,
        FromName: process.env.EMAIL_FROM_NAME!,
        To: [
          {
            Email: options.to,
            Name: options.to
          }
        ],
        Subject: options.subject,
        TextPart: options.text
      }
    ]
  })
  console.log(emailRequest.body);
  return emailRequest.response.status;
}