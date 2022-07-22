import dbConnect from "@/lib/dbConnect";
import Contact from '@/lib/models/Contact.model';
import nodemailer from "nodemailer";

export const createContact = async (req, res) => {
  try {
    await dbConnect();
    const contact = new Contact(req.body);
    await contact.save();
    await sendEmail(createMessage(contact), process.env.EMAIL_TO);
    res.status(200).json({ success: true, contact })
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json(error.errors || ["Unkown error"]);
  }
}
async function sendEmail(message, to) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.serviciodecorreo.es",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    let info = await transporter.sendMail({
      from: `"Universelle Web" <${process.env.EMAIL_USER}>`,
      to,
      subject: "New contact from Universelle Web",
      html: message
    });
    if (process.env.NODE_ENV === "development") {
      console.log(info);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    throw {
      status: 500,
      errors: ["Error sending email"]
    }
  }
}

function createMessage(contact) {
  const {
    name, company, position, country, email, phone, needAppointment, service, timing, description, _id
  } = contact;

  const message = `
    <p>Automatic message from universelle web:</p>
    <p>Contact information:</p>
    <ul>
      <li><b>Unique Id:</b> ${_id}</li>
      <li><b>Name:</b> ${name}</li>
      <li><b>Company:</b> ${company}</li>
      <li><b>Position:</b> ${position}</li>
      <li><b>Country:</b> ${country}</li>
      <li><b>Email:</b> ${email}</li>
      <li><b>Phone:</b> ${phone}</li>
      <li><b>Need appointment:</b> ${needAppointment}</li>
      <li><b>Service:</b> ${service}</li>
      <li><b>Timing:</b> ${timing}</li>
      <li><b>Description:<b/> ${description}</li>
    </ul>
    `.trim();
  return message;
}

