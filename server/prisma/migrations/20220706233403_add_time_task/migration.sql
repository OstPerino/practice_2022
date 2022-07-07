-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "start_time" INTEGER DEFAULT 0,
ADD COLUMN     "status" BOOLEAN DEFAULT false,
ADD COLUMN     "time" INTEGER DEFAULT 0;
