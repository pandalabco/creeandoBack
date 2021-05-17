const { Payment, Order, Purchase, Brand } = require('../models');

const createPurchase = async (wenjoy, consumer, body) => {
  // 1. Include Fawn.
  // 2. Create orders.
  let payment = await Payment.create({
    purchase_id: wenjoy.purchase_id,
    purchase_link: wenjoy.payment_url,
    purchase_description: '',
    purchase_total_value: 5000,
    purchase_state: 'PURCHASE_STARTED',
    payedBy: consumer.id,
  });
  let purchase = await Purchase.create({
    orderdBy: consumer.id,
    payments: [payment.id],
  });
  const asyncRes = await Promise.all(
    body.purchaseList.map(async (i) => {
      const order = await Order.create({
        orderdBy: consumer.id,
        brand: i.brand,
        product: [i.product],
        purchaseId: purchase.id,
        payments: [payment.id],
        address: consumer.address,
        city: consumer.city,
      });
      return order;
    })
  );
  const resultOrders = await asyncRes.map((a) => a._id);
  // 4. Create purchase.
  // 3. Create payment.

  // 5. Update orders and payment with pucharse id product stock.
  payment = await Payment.findById(payment.id);
  payment.purchaseId = purchase.id;
  payment.orders = resultOrders;
  const paymentResult = await payment.save();
  purchase = await Purchase.findById(purchase.id);
  purchase.orders = resultOrders;
  const purchaseResult = await payment.save();
  return { purchaseResult, asyncRes, paymentResult };
};

module.exports = {
  createPurchase,
};
