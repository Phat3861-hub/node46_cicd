import express from "express";

import rootRouter from "../src/routes/root.router.js";
import { responseError } from "../src/common/helpers/response.helper.js";
import { handleError } from "../src/common/helpers/error.helper.js";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import prisma from "../src/common/prisma/init.prisma.js";
import initSocket from "../src/common/socket/init.socket.js";

const app = express();

// app.use((error, req, res, next) => {
//   const resData = responseError(error.message, error.code, error.stack);
//   res.status(resData.code).json(resData);
// });

// middleware giúp phân giải dữ liệu từ json sang đối tượng javascript
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "google.com"],
  })
);

app.use(express.static("."));

app.use(rootRouter);

app.use(handleError);

// socket client - server
const httpServer = createServer(app);

initSocket(httpServer);

httpServer.listen(3069, () => {
  console.log(`Server Online At Port 3069`);
});

/**
 * PRISMA
 *    - npm i prisma
 *    - npm i @prisma/client
 *
 *    - npx prisma init: khởi tạo prisma
 *       - tạo ra .env
 *       - tạo ra prisma/schema.prisma
 *
 *    - npx prisma db pull
 *    - npx prisma generate
 *
 * *** Cập nhật lại DB
 *    prisma: chỉ cần chạy 2 câu lệnh sau:
 *       npx prisma db pull
 *       npx prisma generate
 *
 *    sequelize:
 *       npx sequelize-auto -h localhost -d db_cyber_media -u root -x 1234 -p 3307  --dialect mysql -o src/models -a src/models/additional.json -l esm
 */

// app.use(
//   "/video/video-list",
//   (req, res, next) => {
//     console.log(`middleware 1`);
//     const payload = `payload`;
//     res.payload = payload;
//     next();
//   },
//   (req, res, next) => {
//     console.log(`middleware 2`);
//     console.log(res.payload);
//     next();
//   },
//   (req, res, next) => {
//     console.log(`middleware 3`);
//     next();
//   }
// );

/**
 * Database first
 * Đi từ câu lệnh SQL để tạo ra table
 *    - tạo table bằng câu lệnh SQL
 *    - sequelize-auto
 *    - npm i sequelize-auto
 *
 *    - npx sequelize-auto -h localhost -d db_cyber_media -u root -x 1234 -p 3307  --dialect mysql -o src/models -a src/models/additional.json -l esm
 */
/**
// BE - ExpressJS CURD
    // Routes
    "Express CRUD Routes": {
      "scope": "javascript, javascriptreact, typescriptreact, typescript",
      "prefix": "express-router-crud",
      "body": [
          "import express from 'express';",
          "",
          "const ${1:module}Router = express.Router();",
          "",
          "// Tạo route CRUD",
          "${1:module}Router.post('/', ${1:module}Controller.create);",
          "${1:module}Router.get('/', ${1:module}Controller.findAll);",
          "${1:module}Router.get('/:id', ${1:module}Controller.findOne);",
          "${1:module}Router.patch('/:id', ${1:module}Controller.update);",
          "${1:module}Router.delete('/:id', ${1:module}Controller.remove);",
          "",
          "export default ${1:module}Router;"
      ],
      "description": "Snippet for Express CRUD routes"
  },
  "Express CRUD Controller": {
      "scope": "javascript, javascriptreact, typescriptreact, typescript",
      "prefix": "express-controller-crud",
      "body": [
          "export const ${1:module}Controller = {",
          "   create: async function (req, res, next) {",
          "      try {",
          "         const result = await ${2:${1:module}Service}.create(req);",
          "         const response = ${3:responseSuccess}(result, `Create ${1:module} successfully`);",
          "         res.status(response.code).json(response);",
          "      } catch (err) {",
          "         next(err);",
          "      }",
          "   },",
          "",
          "   findAll: async function (req, res, next) {",
          "      try {",
          "         const result = await ${1:module}Service.findAll(req);",
          "         const response = responseSuccess(result, `Get all ${1:module}s successfully`);",
          "         res.status(response.code).json(response);",
          "      } catch (err) {",
          "         next(err);",
          "      }",
          "   },",
          "",
          "   findOne: async function (req, res, next) {",
          "      try {",
          "         const result = await ${1:module}Service.findOne(req);",
          "         const response = responseSuccess(result, `Get ${1:module} #${req.params.id} successfully`);",
          "         res.status(response.code).json(response);",
          "      } catch (err) {",
          "         next(err);",
          "      }",
          "   },",
          "",
          "   update: async function (req, res, next) {",
          "      try {",
          "         const result = await ${1:module}Service.update(req);",
          "         const response = responseSuccess(result, `Update ${1:module} #${req.params.id} successfully`);",
          "         res.status(response.code).json(response);",
          "      } catch (err) {",
          "         next(err);",
          "      }",
          "   },",
          "",
          "   remove: async function (req, res, next) {",
          "      try {",
          "         const result = await ${1:module}Service.remove(req);",
          "         const response = responseSuccess(result, `Remove ${1:module} #${req.params.id} successfully`);",
          "         res.status(response.code).json(response);",
          "      } catch (err) {",
          "         next(err);",
          "      }",
          "   }",
          "};"
      ],
      "description": "Snippet for Express CRUD controller"
  },
  "Express CRUD Service": {
      "scope": "javascript, javascriptreact, typescriptreact, typescript",
      "prefix": "express-service-crud",
      "body": [
          "export const ${1:module}Service = {",
          "   create: async function (req) {",
          "      return `This action create`;",
          "   },",
          "",
          "   findAll: async function (req) {",
          "      return `This action returns all ${1:module}`;",
          "   },",
          "",
          "   findOne: async function (req) {",
          "      return `This action returns a id: ${req.params.id} ${1:module}`;",
          "   },",
          "",
          "   update: async function (req) {",
          "      return `This action updates a id: ${req.params.id} ${1:module}`;",
          "   },",
          "",
          "   remove: async function (req) {",
          "      return `This action removes a id: ${req.params.id} ${1:module}`;",
          "   },",
          "};"
      ],
      "description": "Snippet for Express CRUD service"
  }

  */
