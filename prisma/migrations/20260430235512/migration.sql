/*
  Warnings:

  - You are about to drop the column `schema` on the `Playbook` table. All the data in the column will be lost.
  - Added the required column `template` to the `Playbook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playbook" DROP COLUMN "schema",
ADD COLUMN     "template" JSONB NOT NULL;
