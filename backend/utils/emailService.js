import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Test email service
transporter.verify((error, success) => {
  if (error) {
    console.log('Email Service Error:', error.message);
  } else {
    console.log('Email Service Ready:', success);
  }
});

// Send order information
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
    return { success: false, message: 'Failed to send email' };
  }
};

// Send delivery confirmation email, eta kaj kore na 
export const sendDeliveryConfirmationEmail = async (email, orderId, items, amount, address) => {
  try {
    console.log('Sending delivery confirmation email to:', email);
    const itemsList = items
      .map(item => `<li>${item.name} x ${item.quantity} - $${item.price * item.quantity}</li>`)
      .join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Order Delivered - Deshi Rasoi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Your Order Has Been Delivered! 🎉</h2>
          
          <p>Dear ${address.firstName},</p>
          
          <p>Great news! Your order from Deshi Rasoi has been successfully delivered to your doorstep.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>Order Summary:</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            
            <h4>Items Delivered:</h4>
            <ul>
              ${itemsList}
            </ul>
            
            <h4>Delivered To:</h4>
            <p>
              ${address.firstName} ${address.lastName}<br>
              ${address.street}<br>
              ${address.city}${address.state ? ', ' + address.state : ''}<br>
              ${address.country || ''} ${address.zipcode || ''}<br>
              Phone: ${address.phone}
            </p>
            
            <h3 style="border-top: 2px solid #ddd; padding-top: 10px; margin-top: 20px;">
              Total Amount: <span style="color: #ff6b6b;">$${amount}</span>
            </h3>
          </div>
          
          <p style="background-color: #d4edda; padding: 15px; border-radius: 5px; color: #155724;">
            <strong>✓ Order Status: DELIVERED</strong>
          </p>
          
          <p style="margin-top: 20px;">We hope you enjoyed your meal! Please visit us again soon.</p>
          
          <p style="margin-top: 30px; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px;">
            © 2026 Deshi Rasoi. All rights reserved.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Delivery confirmation email sent successfully:', info.response);
    return { success: true, message: 'Delivery confirmation email sent' };
  } catch (error) {
    console.log('Email send error:', error.message);
    // if mail fails to reach, the order will still be marked , kaj kore na 
    return { success: false, message: 'Failed to send delivery confirmation email' };
  }
};
