/*
  Warnings:

  - You are about to drop the column `volunteerHours` on the `User` table. All the data in the column will be lost.
  - Added the required column `causes` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "volunteerHours",
ADD COLUMN     "causes" TEXT NOT NULL,
ADD COLUMN     "skills" TEXT NOT NULL;
