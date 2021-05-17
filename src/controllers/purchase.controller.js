const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { purchaseService, wenjoyService, emailService } = require('../services');

const createPurchase = catchAsync(async (req, res) => {
  // 1. Get wenjoy url.
  const wenjoy = await wenjoyService.generatePaymentLink(req.user, req.body);
  // 2. Create Purchase
  const purchase = await purchaseService.createPurchase(wenjoy, req.user, req.body);
  // 3. Send Emails to Customer, Cree-ando & Brands.
  const to = 'mattiasbylin@hotmail.com';
  const subject = 'Gracias por tu compra';
  const html = `
  <img src="https://cree-ando.com/wp-content/uploads/2021/04/Mundo-virtual-Cree-Ando-foro-2-1024x570.png" style="height: 100px; width: 100vw; object-fit: cover; border-radius: 25px 25px 0px 0px;">
  <h1>¡Has iniciado una compra!</h1>
  <p>
    Gracias ${req.user.name} por realizar 
    tu pedido en el marketplace de Cree-Ando.
  </p>
  <p>
    El identificador de tu compra es: ${wenjoy.purchase_id},
    en caso de que requieras compartir el pago con otra persona aqui esta el link de pago: ${wenjoy.payment_url}.
  </p>
  <img src="https://cree-ando.com/wp-content/uploads/2021/04/Mundo-virtual-Cree-Ando-foro-2-1024x570.png" style="height: 100px; width: 100vw; object-fit: cover; border-radius: 0px 0px 25px 25px;">
  `;
  const emailToCustomer = await emailService.sendEmail(to, subject, html);
  // 4. Send Emails to Cree-ando & Brands.
  const toCreeAndo = 'mattiasbylin@hotmail.com';
  const subjectCreeAndo = 'Se realizo una compra';
  const htmlCreeAndo = `
  <img src="https://cree-ando.com/wp-content/uploads/2021/04/Mundo-virtual-Cree-Ando-foro-2-1024x570.png" style="height: 100px; width: 100vw; object-fit: cover; border-radius: 25px 25px 0px 0px;">
  <h1>¡Equipo: se inicio una compra!</h1>
  <p>
    El consumidor ${req.user.name} ha realizod una compra.
  </p>
  <p>
    El identificador de su compra es: ${wenjoy.purchase_id},
    El link de pago es: ${wenjoy.payment_url}.
  </p>
  <img src="https://cree-ando.com/wp-content/uploads/2021/04/Mundo-virtual-Cree-Ando-foro-2-1024x570.png" style="height: 100px; width: 100vw; object-fit: cover; border-radius: 0px 0px 25px 25px;">
  `;
  const emailtoCreeAndo = await emailService.sendEmail(toCreeAndo, subjectCreeAndo, htmlCreeAndo);
  // 5. Send Emails to Cree-ando & Brands.
  const toBrand = 'mattiasbylin@hotmail.com';
  const subjectBrand = 'Se ha iniciado una orden';
  const htmlBrand = `
    <img src="https://cree-ando.com/wp-content/uploads/2021/04/Mundo-virtual-Cree-Ando-foro-2-1024x570.png" style="height: 100px; width: 100vw; object-fit: cover; border-radius: 25px 25px 0px 0px;">
    <h1>¡Equipo: se inicio una compra!</h1>
    <p>
      El consumidor ${req.user.name} ha realizod una compra, con tu marca. Recuerda que a penas haya pago por parte del consumidor se te habilitara la opción de processar y despachar la mercancia.
    </p>
    <p>
      En Cree-ando sabemos que si tu creces nosotros creceremos.
    </p>
    <img src="https://cree-ando.com/wp-content/uploads/2021/04/Mundo-virtual-Cree-Ando-foro-2-1024x570.png" style="height: 100px; width: 100vw; object-fit: cover; border-radius: 0px 0px 25px 25px;">
    `;
  const emailtoBrand = await emailService.sendEmail(toBrand, subjectBrand, htmlBrand);
  // 5. Return status with wenjoy payment url to client.
  res.status(httpStatus.CREATED).json({
    code: httpStatus.OK,
    message: 'Success: purchase created and wenjoy link provided',
    data: {
      purchase,
      emails: {
        emailToCustomer: `${emailToCustomer} to client`,
        emailtoCreeAndo: `${emailtoCreeAndo} to cree-adno`,
        emailtoBrand: `${emailtoBrand} to brand`,
      },
    },
  });
});

module.exports = {
  createPurchase,
};
