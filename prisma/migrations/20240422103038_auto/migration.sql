/*
  Warnings:

  - You are about to drop the `_LikeToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikeToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_LikeToPost_B_index";

-- DropIndex
DROP INDEX "_LikeToPost_AB_unique";

-- DropIndex
DROP INDEX "_LikeToUser_B_index";

-- DropIndex
DROP INDEX "_LikeToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LikeToPost";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LikeToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Like" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "postId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("createdAt", "id") SELECT "createdAt", "id" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
