const { Payment, Order, Purchase } = require('../models');

const updatePayment = async (userBody) => {
  const payment = await Payment.findOne({ purchase_id: userBody.purchase_id }).exec();
  payment.purchase_description = userBody.purchase_description;
  payment.purchase_current_value = userBody.purchase_current_value;
  payment.purchase_state = userBody.purchase_state;
  payment.purchase_signature = userBody.purchase_signature;
  await payment.save();
  let newStatus = '';
  if (userBody.purchase_state === 'PURCHASE_STARTED') {
    newStatus = 'Confirmando pago';
  } else if (userBody.purchase_state === 'PURCHASE_PAYMENT') {
    newStatus = 'Pago parcial, esperando pago completo';
  } else if (userBody.purchase_state === 'PURCHASE_FINISHED') {
    newStatus = 'Pago exitoso, alistando producto';
  } else if (userBody.purchase_state === 'PURCHASE_REJECTED') {
    newStatus = 'Pago rechazado, esperando pago completo';
  }
  const orders = await Order.updateMany({ purchaseId: payment.purchaseId }, { $set: { orderStatus: newStatus } });
  const purchase = await Purchase.findById(payment.purchaseId);
  purchase.purchase_state = newStatus;
  await purchase.save();
  return { orders, payment };
};


module.exports = {
  updatePayment,
};
