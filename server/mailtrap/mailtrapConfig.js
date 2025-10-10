const { MailtrapClient } = require("mailtrap");
require ("dotenv").config()

const TOKEN = process.env.mailtrap_token;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Auth Tutorial",
};

module.exports = {client,sender}