/*
  Warnings:

  - You are about to drop the column `code` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `flag` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Country` table. All the data in the column will be lost.
  - Added the required column `flag_emoji` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flag_svg` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_eng` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_pol` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "code",
DROP COLUMN "flag",
DROP COLUMN "name",
ADD COLUMN     "flag_emoji" TEXT NOT NULL,
ADD COLUMN     "flag_svg" TEXT NOT NULL,
ADD COLUMN     "name_eng" TEXT NOT NULL,
ADD COLUMN     "name_pol" TEXT NOT NULL;
