-- AlterTable
ALTER TABLE "User" ALTER COLUMN "causes" SET DEFAULT ARRAY[]::"causes"[],
ALTER COLUMN "skills" SET DEFAULT ARRAY[]::"skills"[];
