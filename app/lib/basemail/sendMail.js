'use strict'
const nodemailer = require('nodemailer')


const SenMail = async (options, email) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'toan210597ntu@gmail.com',
      clientId: '111021480568-u7nd27a29i23hfgalgl54vcna1g5l94r.apps.googleusercontent.com',
      clientSecret: 'lVDO6CQihwxxY1PgbqSXcjDE',
      refreshToken:'1/QVtnf24Ad8HxbIFi5vZJiwvLNSKOWkdwRzpsIiY3c22kSf2JBSbNXFq5cui2oS_k'  
    }
  })
  
  let mailOptions = {
    from: '"Phòng Trọ Cô Mai" <toan210597ntu@gmail.com>',
    to: email,
    subject: options.subject,
    text: options.text,
    html: options.content
  }
  await transporter.sendMail(mailOptions, function (err, res) {
    if( err)
    {
      console.log('Lỗi', err)
    }
    else
    {
      console.log("Đã gửi mail");
      // Preview only available when sending through an Ethereal account
    }
  })
}

export default {
  SenMail
}