/*
  Warnings:

  - You are about to drop the column `status` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "WorkPart" ADD COLUMN     "status" "WorkStatus" NOT NULL DEFAULT 'DRAFT';
