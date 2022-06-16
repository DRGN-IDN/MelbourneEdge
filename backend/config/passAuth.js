/* 
* 29/1/21 2:34pm - Mark Sturtz - created the nodemailer tool to send data to the web 
* 29/1/21 9:30pm - Mark Sturtz - added the edge.perience3@gmail.com to the transporter
* 29/1/21 11:50pm - Mark Sturtz - changes from id to uuid for transparency 
* 30/1/21 1:56am - Mark Sturtz - changed link to utilise port 3000, was 5000
# 30/1/21 3:40am - Mark Sturtz - changed personalised dummy gmail back to edge.perience3@gmail.com with added comments
* 30/1/21 4:33pm - Phuong Dang- fixed user and password for sendResetLink
*/
var nodemailer = require('nodemailer');

function sendResetLink(Email, uuid) {
  //read
    console.log(`http://localhost:3000/resetpassword/`, uuid)

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'edge.periencet3@gmail.com', //testing to be done on this email.
        pass: 'edget3perience' //we can use JWT's for better security
      }
    });
    
    var mailOptions = {
      from: 'edge.periencet3@gmail.com',
      to: Email,
      subject: 'Melbourne Edge Password Reset',
      text: `To reset your password, please click on this link: http://localhost:3000/resetpassword/${uuid}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

module.exports = sendResetLink;