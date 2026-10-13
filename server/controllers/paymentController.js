import { addCreditsToUser } from '../models/Pricing.js';
import { findUserByEmail } from '../models/User.js';

const orders = new Map();

/**
 * POST /api/payment/create-order
 * Creates a Cashfree checkout session order
 */
export const createOrder = async (req, res, next) => {
  try {
    const { amount, credits = 1, email, phone = '+91 8376980140', planName = 'Pay Per Release (PPR)' } = req.body;

    const orderId = `order_cf_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const parsedAmount = Number(amount) || 706.82;

    const order = {
      orderId,
      orderAmount: parsedAmount,
      orderCurrency: 'INR',
      credits: Number(credits) || 1,
      planName,
      customerDetails: {
        email: email || 'muskandhaniya12@gmail.com',
        phone: phone || '+91 8376980140'
      },
      merchantName: 'VUSIC RECORDS PRIVATE LIMITED',
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    orders.set(orderId, order);

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/payment/verify
 * Verifies simulated or webhook payment
 */
export const verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentMode = 'UPI_QR', paymentMethod = 'UPI QR', details = {} } = req.body;
    const txnId = `CF-TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const paidAt = new Date().toISOString();

    const order = orders.get(orderId);
    if (!order) {
      // Fallback order for seamless testing
      return res.status(200).json({
        success: true,
        message: 'Payment received successfully via Cashfree Gateway!',
        order: {
          orderId: orderId || `order_cf_${Date.now()}`,
          orderAmount: 706.82,
          orderCurrency: 'INR',
          credits: 1,
          merchantName: 'VUSIC RECORDS PRIVATE LIMITED',
          status: 'PAID',
          paymentDetails: {
            transactionId: txnId,
            status: 'PAID',
            paymentMode,
            paymentMethod,
            paidAt,
            details
          }
        },
        credits: 1
      });
    }

    order.status = 'PAID';
    order.paymentDetails = {
      transactionId: txnId,
      status: 'PAID',
      paymentMode,
      paymentMethod,
      paidAt,
      details
    };

    // Credit to user
    const user = addCreditsToUser(order.customerDetails.email, order.credits);

    res.status(200).json({
      success: true,
      message: 'Payment successfully processed! Credits added to your account.',
      order,
      credits: user?.credits || order.credits
    });
  } catch (err) {
    next(err);
  }
};
