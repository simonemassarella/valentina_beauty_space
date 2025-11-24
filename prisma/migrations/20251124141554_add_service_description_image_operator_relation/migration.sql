-- AlterTable
ALTER TABLE "Service" ADD COLUMN "description" TEXT;
ALTER TABLE "Service" ADD COLUMN "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "_OperatorServices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OperatorServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Operator" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OperatorServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_OperatorServices_AB_unique" ON "_OperatorServices"("A", "B");

-- CreateIndex
CREATE INDEX "_OperatorServices_B_index" ON "_OperatorServices"("B");
