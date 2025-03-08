/*
  Warnings:

  - You are about to drop the column `requestId` on the `comment` table. All the data in the column will be lost.
  - Added the required column `postId` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_requestId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "requestId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
