-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "like_counter" SET DEFAULT 0,
ALTER COLUMN "dislike_counter" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "verifyCode" VARCHAR(5);
