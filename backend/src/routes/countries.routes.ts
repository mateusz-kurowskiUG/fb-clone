import { Router, type Request, type Response } from "express";
import CountryTable from "../db/tables/CountryTable";

const countriesRouter = Router();

countriesRouter.get("/", async (req: Request, res: Response) => {
  const countries = await CountryTable.getCountries();
  if (countries !== null && countries.length > 0) {
    console.log(countries);

    return res.status(200).send(countries);
  }
  return res.status(404).send("No countries found");
});
export default countriesRouter;
