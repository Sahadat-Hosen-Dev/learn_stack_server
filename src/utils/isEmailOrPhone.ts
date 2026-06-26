const isEmailOrPhone = (credential: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{11}$/; // Assuming Bangladeshi phone number format (11 digits)

  if (emailRegex.test(credential)) {
    return "email";
  } else if (phoneRegex.test(credential)) {
    return "phone";
  } else {
    return "invalid";
  }
};

export default isEmailOrPhone;
