/*
  Warnings:

  - You are about to drop the `HelpRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HelpResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HelpRequest" DROP CONSTRAINT "HelpRequest_createdById_fkey";

-- DropForeignKey
ALTER TABLE "HelpRequest" DROP CONSTRAINT "HelpRequest_createdByOrganizationId_fkey";

-- DropForeignKey
ALTER TABLE "HelpResponse" DROP CONSTRAINT "HelpResponse_requestId_fkey";

-- DropForeignKey
ALTER TABLE "HelpResponse" DROP CONSTRAINT "HelpResponse_userId_fkey";

-- DropTable
DROP TABLE "HelpRequest";

-- DropTable
DROP TABLE "HelpResponse";

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "urgency" "Urgency" NOT NULL DEFAULT 'MEDIUM',
    "status" "HelpStatus" NOT NULL DEFAULT 'OPEN',
    "createdById" TEXT,
    "createdByOrganizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdByOrganizationId_fkey" FOREIGN KEY ("createdByOrganizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
