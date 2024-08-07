/*
  Warnings:

  - Added the required column `tier` to the `MapStatus` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MapStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tier" INTEGER NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "MapStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MapStatus" ("complete", "id", "name", "userId") SELECT "complete", "id", "name", "userId" FROM "MapStatus";
DROP TABLE "MapStatus";
ALTER TABLE "new_MapStatus" RENAME TO "MapStatus";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
