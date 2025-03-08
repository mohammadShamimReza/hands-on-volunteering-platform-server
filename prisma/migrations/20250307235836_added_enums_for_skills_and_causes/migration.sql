/*
  Warnings:

  - The `causes` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `skills` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "skills" AS ENUM ('Academic', 'Art', 'Business', 'Communication', 'Computer', 'Cooking', 'Craft', 'Creative', 'Design', 'Engineering', 'Finance', 'Health', 'Language', 'Leadership', 'Legal', 'Management', 'Marketing', 'Music', 'Photography', 'Programming', 'Science', 'Social');

-- CreateEnum
CREATE TYPE "causes" AS ENUM ('Animal', 'Arts', 'Children', 'Community', 'Crisis', 'Culture', 'Disability', 'Disaster', 'Education', 'Employment', 'Elderly', 'Environment', 'Health', 'Human', 'Humanitarian', 'International', 'Poverty', 'Rights', 'Social', 'Sports', 'Technology');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "causes",
ADD COLUMN     "causes" "causes"[],
DROP COLUMN "skills",
ADD COLUMN     "skills" "skills"[];
