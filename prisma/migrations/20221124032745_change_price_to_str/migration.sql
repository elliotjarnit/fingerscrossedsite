-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "price" TEXT NOT NULL,
    "quantityAvailable" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Wine" ("createdAt", "description", "id", "image", "name", "price", "quantityAvailable") SELECT "createdAt", "description", "id", "image", "name", "price", "quantityAvailable" FROM "Wine";
DROP TABLE "Wine";
ALTER TABLE "new_Wine" RENAME TO "Wine";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
