-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "PublishingType" AS ENUM ('POST', 'COMMENT');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "is_name_public" BOOLEAN NOT NULL DEFAULT true,
    "is_email_public" BOOLEAN NOT NULL DEFAULT true,
    "role" "Role" NOT NULL DEFAULT E'USER',
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
    "like_counter" INTEGER,
    "dislike_counter" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "like_counter" INTEGER,
    "dislike_counter" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_comment_id" INTEGER NOT NULL,
    "publishingType" "PublishingType" NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikePost" (
    "id" SERIAL NOT NULL,
    "is_like" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "post_comment_id" INTEGER NOT NULL,
    "publishingType" "PublishingType" NOT NULL,

    CONSTRAINT "LikePost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikePost" ADD CONSTRAINT "LikePost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
