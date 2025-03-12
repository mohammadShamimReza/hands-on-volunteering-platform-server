-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "createdByTeamId" TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdByTeamId_fkey" FOREIGN KEY ("createdByTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
