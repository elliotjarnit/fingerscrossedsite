/*
  Warnings:

  - The primary key for the `PermittedPurchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `wineId` to the `PermittedPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "permittedPurchaseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_permittedPurchaseId_fkey" FOREIGN KEY ("permittedPurchaseId") REFERENCES "PermittedPurchase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "id", "permittedPurchaseId", "userId") SELECT "createdAt", "id", "permittedPurchaseId", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_permittedPurchaseId_key" ON "Order"("permittedPurchaseId");
CREATE TABLE "new_PermittedPurchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "wineId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PermittedPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PermittedPurchase_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "Wine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PermittedPurchase" ("createdAt", "id", "userId") SELECT "createdAt", "id", "userId" FROM "PermittedPurchase";
DROP TABLE "PermittedPurchase";
ALTER TABLE "new_PermittedPurchase" RENAME TO "PermittedPurchase";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
