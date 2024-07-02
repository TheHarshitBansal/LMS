const generateResetPasswordEmail = (resetPasswordURL) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 0;
                margin: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                text-align: center;
                padding: 10px 0;
            }
            .email-content {
                margin: 20px 0;
            }
            .email-footer {
                text-align: center;
                font-size: 12px;
                color: #777;
                margin-top: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                font-size: 16px;
                color: #fff;
                background-color: #007BFF;
                text-decoration: none;
                border-radius: 5px;
            }
            .button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Reset Your Password</h1>
            </div>
            <div class="email-content">
                <p>Hello,</p>
                <p>You can reset your password by clicking the button below:</p>
                <p>
                    <a href="${resetPasswordURL}" target="_blank" class="button">Reset your password</a>
                </p>
                <p>If the button above does not work, you can copy and paste the following link into your browser:</p>
                <p>
                    <a href="${resetPasswordURL}" target="_blank">${resetPasswordURL}</a>
                </p>
                <p>If you did not request a password reset, please ignore this email.</p>
            </div>
            <div class="email-footer">
                <p>Thank you,<br>Your Company Name</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };

  export default generateResetPasswordEmail;
  