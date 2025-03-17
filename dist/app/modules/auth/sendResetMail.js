"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../../config"));
function sendEmail(to, html) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ✅ 1. Create Transporter with Debugging Enabled
            const transporter = nodemailer_1.default.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: config_1.default.email, // Ensure this is correct
                    pass: config_1.default.appPass, // Ensure this is correct
                },
                logger: true, // ✅ Logs all email info
                debug: true, // ✅ Enables debugging mode
            });
            // ✅ 2. Send Email
            const info = yield transporter.sendMail({
                from: `"No-Reply" <${config_1.default.email}>`, // Sender address
                to, // Recipient email
                subject: 'Reset Password Link', // Subject
                html, // Email body
            });
            // ✅ 3. Log Email Success
            return {
                message: 'Email sent',
                previewUrl: nodemailer_1.default.getTestMessageUrl(info),
            };
        }
        catch (error) {
            // ✅ 4. Log Errors
            console.error('❌ Email sending failed:', error);
        }
    });
}
