/*
  Warnings:

  - You are about to drop the `statTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "statTask" DROP CONSTRAINT "statTask_taskID_fkey";

-- DropTable
DROP TABLE "statTask";

-- CreateTable
CREATE TABLE "StatTask" (
    "id" SERIAL NOT NULL,
    "taskID" INTEGER,
    "time" INTEGER NOT NULL DEFAULT 0,
    "stop_time" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StatTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatTask" ADD CONSTRAINT "StatTask_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
