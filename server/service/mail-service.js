import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

class MailService {
    constructor() {
        this.tranporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail (to, link) {
        await this.tranporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation for ' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>To activate follow the link</h1>
                    <a href="${process.env.API_URL}/api/activate/${link}">${process.env.API_URL}/api/activate/${link}</a>
                </div>
            `
        })
    }

    async sendRestoredPassword (to, pass) {
        await this.tranporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account password for ' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>New account password</h1>
                    <p>New password: ${pass}</p>
                    <p>We recommend that you change this password to yours. You can do it in your personal account</p>
                </div>
            `
        })
    }

    async sendRecoveryLink (to, link) {
        await this.tranporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account password for ' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>Password recovery link</h1>
                    <a href="${process.env.API_URL}/api/recovery/${link}">${process.env.API_URL}/api/recovery/${link}</a>
                </div>
            `
        })
    }
}

export default new MailService()