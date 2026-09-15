/*
  Warnings:

  - You are about to drop the column `downVotes` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `upVotes` on the `Comment` table. All the data in the column will be lost.
  - Changed the type of `category` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FOOD', 'MOVIES', 'PLACES', 'SERVICES', 'PRODUCTS', 'OTHER');

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "downVotes",
DROP COLUMN "upVotes";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
