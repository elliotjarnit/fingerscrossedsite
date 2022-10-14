-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PermittedPurchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "wineId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PermittedPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PermittedPurchase_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "Wine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PermittedPurchase" ("createdAt", "id", "userId", "wineId") SELECT "createdAt", "id", "userId", "wineId" FROM "PermittedPurchase";
DROP TABLE "PermittedPurchase";
ALTER TABLE "new_PermittedPurchase" RENAME TO "PermittedPurchase";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
