
const emailTemplate = (otp: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div
      style="
        font-family: Helvetica, Arial, sans-serif;
        width: 100%;
        line-height: 2;
      "
    >
      <div style="width: 100%">
        <p style="font-size: 1.1em">Hi,</p>
        <p>
          Use the following OTP to complete your Sign In procedure. OTP is valid
          for 5 minutes
        </p>
        <h2
          style="
            background: #00466a;
            margin: 0 auto;
            width: max-content;
            padding: 0 10px;
            color: #fff;
            border-radius: 4px;
          "
        >
          ${otp}
        </h2>
        <p style="font-size: 0.9em">Regards,<br />Yusha Tahlil</p>
        <hr style="border: none; border-top: 1px solid #eee" />
      </div>
    </div>
  </body>
</html>
`;

export default emailTemplate;
