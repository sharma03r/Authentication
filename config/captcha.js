const request = require("request");

module.exports.isCaptchaVerified = async (req) => {
  if (
    req.body["g-recaptcha-response"] === undefined ||
    req.body["g-recaptcha-response"] === "" ||
    req.body["g-recaptcha-response"] === null
  ) {
    req.flash("error", "Invalid Captcha!");
    return false;
  }

  const verificationURL =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    "6Ld2zdsoAAAAANEO9SDVusoBE_tkXj5kiXor1UNW" +
    "&response=" +
    req.body["g-recaptcha-response"] +
    "&remoteip=" +
    req.connection.remoteAddress;

  await request(verificationURL, function (error, response, body) {
    body = JSON.parse(body);

    if (body.success !== undefined && !body.success) {
      //req.flash("error", "Captcha Verifiction Failed!");
      return false;
    }
  });
  return true;
};
