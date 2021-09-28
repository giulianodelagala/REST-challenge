/*
  Warnings:

  - You are about to drop the column `commentId` on the `LikeComment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `LikeComment` table. All the data in the column will be lost.
  - You are about to drop the column `isLike` on the `LikeComment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `LikeComment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `LikePost` table. All the data in the column will be lost.
  - You are about to drop the column `isLike` on the `LikePost` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `LikePost` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `LikePost` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `comment_id` to the `LikeComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_like` to the `LikeComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `LikeComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_like` to the `LikePost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `LikePost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `LikePost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "LikeComment" DROP CONSTRAINT "LikeComment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "LikeComment" DROP CONSTRAINT "LikeComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "LikePost" DROP CONSTRAINT "LikePost_postId_fkey";

-- DropForeignKey
ALTER TABLE "LikePost" DROP CONSTRAINT "LikePost_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "LikeComment" DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "isLike",
DROP COLUMN "userId",
ADD COLUMN     "comment_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_like" BOOLEAN NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LikePost" DROP COLUMN "createdAt",
DROP COLUMN "isLike",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_like" BOOLEAN NOT NULL,
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "password" VARCHAR(255) NOT NULL,
    "is_email_public" BOOLEAN NOT NULL DEFAULT true,
    "email_verified_at" TIMESTAMP(3),
    "is_name_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikePost" ADD CONSTRAINT "LikePost_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikePost" ADD CONSTRAINT "LikePost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeComment" ADD CONSTRAINT "LikeComment_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeComment" ADD CONSTRAINT "LikeComment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
