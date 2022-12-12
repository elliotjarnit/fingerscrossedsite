/*
  Warnings:

  - Added the required column `paymentIntentSecret` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wineId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "permittedPurchaseId" TEXT NOT NULL,
    "paymentIntentSecret" TEXT NOT NULL,
    "wineId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_permittedPurchaseId_fkey" FOREIGN KEY ("permittedPurchaseId") REFERENCES "PermittedPurchase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "Wine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "id", "permittedPurchaseId", "status", "userId") SELECT "createdAt", "id", "permittedPurchaseId", "status", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_permittedPurchaseId_key" ON "Order"("permittedPurchaseId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
