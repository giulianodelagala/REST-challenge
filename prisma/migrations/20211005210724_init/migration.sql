/*
  Warnings:

  - You are about to drop the column `post_id` on the `LikePost` table. All the data in the column will be lost.
  - You are about to drop the `LikeComment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dislike_counter` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `like_counter` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_comment_id` to the `LikePost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `LikePost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dislike_counter` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `like_counter` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PublishingType" AS ENUM ('POST', 'COMMENT');

-- DropForeignKey
ALTER TABLE "LikeComment" DROP CONSTRAINT "LikeComment_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "LikeComment" DROP CONSTRAINT "LikeComment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "LikePost" DROP CONSTRAINT "LikePost_post_id_fkey";

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "dislike_counter" INTEGER NOT NULL,
ADD COLUMN     "like_counter" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LikePost" DROP COLUMN "post_id",
ADD COLUMN     "post_comment_id" INTEGER NOT NULL,
ADD COLUMN     "type" "PublishingType" NOT NULL;

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "dislike_counter" INTEGER NOT NULL,
ADD COLUMN     "like_counter" INTEGER NOT NULL;

-- DropTable
DROP TABLE "LikeComment";

-- CreateTable
CREATE TABLE "Reports" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "post_comment_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
