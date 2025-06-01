-- CreateTable
CREATE TABLE "checkout_queue" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "products" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkout_queue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "checkout_queue" ADD CONSTRAINT "checkout_queue_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
