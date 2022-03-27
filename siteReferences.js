const indexPage = {
  filename: "index.html",
  template: "./src/views/index.ejs",
  name: "this is the home page page",
  siteName: "Philip's Website",
};

const aboutPage = {
  filename: "about.html",
  template: "./src/views/pages/about.ejs",
  name: "this is the about page",
  siteName: "Philip's Website | About",
};

const contactPage = {
  filename: "contact.html",
  template: "./src/views/pages/contact.ejs",
  name: "this is the contact page",
  siteName: "Philip's Website | Contact",
};

module.exports = { indexPage, aboutPage, contactPage };
