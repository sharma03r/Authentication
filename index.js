const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const db = require("./config/mongoose");
const flash = require("connect-flash");
const coustomMware = require("./config/middleware");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(flash());
app.use(coustomMware.setFlash);

app.use(expressLayouts);

app.use(
  session({
    name: "user-auth",
    secret: "blahblah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/user-auth",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(express.urlencoded({ extended: true }));

//extract style and script from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error starting the app ${err}`);
  }
  console.log(`App running on port ${port}`);
});
