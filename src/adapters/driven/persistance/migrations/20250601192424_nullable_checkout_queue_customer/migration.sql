-- DropForeignKey
ALTER TABLE "checkout_queue" DROP CONSTRAINT "checkout_queue_customerId_fkey";

-- AlterTable
ALTER TABLE "checkout_queue" ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "checkout_queue" ADD CONSTRAINT "checkout_queue_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;
