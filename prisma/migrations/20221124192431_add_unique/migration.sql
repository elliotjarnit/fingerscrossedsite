/*
  Warnings:

  - A unique constraint covering the columns `[paymentIntentSecret]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentIntentSecret_key" ON "Order"("paymentIntentSecret");
