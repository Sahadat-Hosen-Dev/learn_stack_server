function generateEmailTemplate(otp: string): string {
  return `
            <div style="font-family: Arial; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #4CAF50;">Verification OTP</h2>
            <p>Your OTP is:</p>
            <h3 style="background: #e8f5e9; color: #4CAF50; padding: 10px; border-radius: 5px; display: inline-block;">
                ${otp}
            </h3>
            <p>Please use this within 10 minutes.</p>
            </div>
        `;
}

export default generateEmailTemplate;
