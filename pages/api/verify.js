import request from 'request'

export default async (req, res) => {
    if (
      req.body.token === undefined ||
      req.body.token === "" ||
      req.body.token === null
    ) {
      return res.json({ success: false, msg: "Please Select captcha" });
    }
    const secretKey = process.env.GOOGLE_CAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.token}&remoteip=${req.socket.remoteAddress}`;
    request(url, (err, response, body) => {
      body = JSON.parse(body);
      if (body.success !== undefined && !body.success) {
        return res.json({
          success: false,
          msg: "You are not human bot",
          error: err,
          response: response,
        });
      }
      return res.json({
        success: true,
        msg: "Verifed user is human",
        resp: response,
      });
    });
}