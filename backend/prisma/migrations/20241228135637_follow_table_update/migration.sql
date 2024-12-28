/*
  Warnings:

  - Made the column `following_id` on table `Follows` required. This step will fail if there are existing NULL values in that column.
  - Made the column `follower_id` on table `Follows` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_following_id_fkey";

-- AlterTable
ALTER TABLE "Follows" ALTER COLUMN "following_id" SET NOT NULL,
ALTER COLUMN "follower_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
