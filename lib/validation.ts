/**
 * Email validation
 * Returns true if email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

/**
 * Phone validation
 * Validates Indian phone numbers (exactly 10 digits)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Name validation
 * Must be non-empty and at least 2 characters
 */
export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

/**
 * Validate all required fields for lead capture
 */
export function validateLeadForm(
  name: string,
  email: string,
  phone: string,
  isRecruiter: boolean,
  recruiterConsent?: boolean
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!validateName(name)) {
    errors.name = 'Please enter a valid name (at least 2 characters)';
  }

  if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validatePhone(phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (isRecruiter && !recruiterConsent) {
    errors.recruiterConsent = 'Please accept the recruiter terms';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
