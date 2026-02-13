/*
  Warnings:

  - You are about to drop the column `templateId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `templateVersion` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `playbookId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playbookVersion` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_gameId_fkey";

-- DropIndex
DROP INDEX "Character_templateId_idx";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "templateId",
DROP COLUMN "templateVersion",
ADD COLUMN     "playbookId" TEXT NOT NULL,
ADD COLUMN     "playbookVersion" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Template";

-- CreateTable
CREATE TABLE "Playbook" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "schema" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,

    CONSTRAINT "Playbook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Playbook_gameId_name_version_key" ON "Playbook"("gameId", "name", "version");

-- CreateIndex
CREATE INDEX "Character_playbookId_idx" ON "Character"("playbookId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_playbookId_fkey" FOREIGN KEY ("playbookId") REFERENCES "Playbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playbook" ADD CONSTRAINT "Playbook_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
