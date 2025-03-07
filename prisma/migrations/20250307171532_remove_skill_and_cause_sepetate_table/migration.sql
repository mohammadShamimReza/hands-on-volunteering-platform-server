/*
  Warnings:

  - You are about to drop the `UserCause` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCause" DROP CONSTRAINT "UserCause_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_userId_fkey";

-- DropTable
DROP TABLE "UserCause";

-- DropTable
DROP TABLE "UserSkill";
