import nodemailer from 'nodemailer';

// Configure email transporter (using Gmail or your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Test email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.log('Email Service Error:', error.message);
  } else {
    console.log('Email Service Ready:', success);
  }
});

// Send order confirmation email
export const sendOrderConfirmationEmail = async (email, orderId, items, amount, address) => {
  try {
    console.log('Sending email to:', email);
    const itemsList = items
      .map(item => `<li>${item.name} x ${item.quantity} - $${item.price * item.quantity}</li>`)
      .join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✓ Order Confirmation - Deshi Rasoi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Order Placed Successfully! ✓</h2>
          
          <p>Dear ${address.firstName},</p>
          
          <p>Thank you for your order! Your delicious food is being prepared.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            
            <h4>Items Ordered:</h4>
            <ul>
              ${itemsList}
            </ul>
            
            <h4>Delivery Address:</h4>
            <p>
              ${address.firstName} ${address.lastName}<br>
              ${address.street}<br>
              ${address.city}<br>
              Phone: ${address.phone}
            </p>
            
            <h3 style="border-top: 2px solid #ddd; padding-top: 10px; margin-top: 20px;">
              Total Amount: <span style="color: #ff6b6b;">$${amount}</span>
            </h3>
          </div>
          
          <p>Your order status: <strong style="color: #ffc107;">Food Processing</strong></p>
          
          <p>Track your order in your profile page.</p>
          
          <p style="margin-top: 30px; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px;">
            © 2026 Deshi Rasoi. All rights reserved.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return { success: true, message: 'Confirmation email sent' };
  } catch (error) {
    console.log('Email send error:', error.message);
    // Don't throw error - email is optional, order should still be processed
    return { success: false, message: 'Failed to send email' };
  }
};
