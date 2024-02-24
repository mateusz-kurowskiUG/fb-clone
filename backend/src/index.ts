import express, { Router, json } from "express";
import cors from "cors";
import usersRouter from "./routes/users.routes";
import authRouter from "./routes/auth.routes";
import { prisma } from "./db/prisma";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swaggerOptions";
import CountryTable from "./db/tables/CountryTable";
import countriesRouter from "./routes/countries.routes";

prisma
  .$transaction([
    prisma.comment.deleteMany({}),
    prisma.post.deleteMany({}),
    prisma.profile.deleteMany({}),
    prisma.user.deleteMany({})
  ])
  .then(() => {
    console.log("Database cleared");
    CountryTable.loadCountries()
      .then((_) => {
        console.log("Countries loaded");
      })
      .catch((error) => {
        console.log("failed to load countries: ", error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
const port = 3000;
const router = Router();

app.use(cors());
app.use(json());

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
router.use("/countries", countriesRouter);
app.use("/api", router);
try {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} catch (error) {
  app.listen(port + 1, () => {
    console.log(`Example app listening on port ${port + 1}`);
  });
}
