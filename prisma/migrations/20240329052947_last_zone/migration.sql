/*
  Warnings:

  - You are about to drop the column `lastMap` on the `User` table. All the data in the column will be lost.
  - Added the required column `lastZone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastMap",
ADD COLUMN     "lastZone" TEXT NOT NULL;
