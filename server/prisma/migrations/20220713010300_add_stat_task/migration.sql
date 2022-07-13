-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "create_time" INTEGER DEFAULT 0,
ADD COLUMN     "last_activity" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "statTask" (
    "id" SERIAL NOT NULL,
    "taskID" INTEGER,
    "time" INTEGER NOT NULL DEFAULT 0,
    "stop_time" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "statTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "statTask" ADD CONSTRAINT "statTask_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
