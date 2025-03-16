interface EmailOptions {
    to: string,
    subject: string,
    text: string
}

export async function sendEmail(options: EmailOptions) {
    console.log(options);
}