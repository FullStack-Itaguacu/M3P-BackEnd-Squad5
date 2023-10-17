const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:3333",
  schemes: ["http"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be 'header', 'query' or 'cookie'
      name: "Authentication", // name of the header, query parameter or cookie
      description: "Insira a chave de atentiação JWT",
    },
  },
};

const outputFile = "./src/services/swagger-output.json";
const endpointsFiles = ["./src/routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./src/index.js"); // Your project's root file
});
