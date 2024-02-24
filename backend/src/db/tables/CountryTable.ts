import { type PrismaClient } from "@prisma/client";
import { prisma } from "../prisma";
import { fetchCountries } from "../fetchCountries";
import type { ICountry } from "../../interfaces/Country";

class CountryTable {
  private readonly prisma: PrismaClient;
  constructor(prismaInstance: PrismaClient) {
    this.prisma = prismaInstance;
  }

  // load countries from external API
  public async loadCountries(): Promise<boolean> {
    const countries = await fetchCountries();
    const result = await (
      await prisma.country.createMany({ data: countries })
    ).count;
    if (result > 0) return true;
    return false;
  }

  public async getCountries(): Promise<ICountry[] | null> {
    const countries = await this.prisma.country.findMany();
    if (countries === null || countries === undefined) {
      return null;
    }
    return countries;
  }
}
export default new CountryTable(prisma);
