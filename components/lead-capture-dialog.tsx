'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { validateLeadForm } from '@/lib/validation';

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function LeadCaptureDialog({
  open,
  onOpenChange,
  onSuccess,
}: LeadCaptureDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isRecruiter: false,
    recruiterConsent: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate form
      const validation = validateLeadForm(
        formData.name,
        formData.email,
        formData.phone,
        formData.isRecruiter,
        formData.recruiterConsent
      );
      if (!validation.valid) {
        setErrors(validation.errors);
        toast.error('Please fix the errors in the form');
        setIsLoading(false);
        return;
      }

      // If recruiter, verify consent
      if (formData.isRecruiter && !formData.recruiterConsent) {
        setErrors({
          recruiterConsent: 'Please accept the recruiter terms to continue',
        });
        toast.error('Please accept the recruiter terms');
        setIsLoading(false);
        return;
      }

      // Success - just close and call onSuccess
      toast.success(`Welcome, ${formData.name}! Ready to chat.`);

      // Reset form and close dialog
      setFormData({
        name: '',
        email: '',
        phone: '',
        isRecruiter: false,
        recruiterConsent: false,
      });
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('[v0] Form submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Started</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              className={errors.name ? 'border-destructive' : ''}
              required
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className={errors.email ? 'border-destructive' : ''}
              required
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone (10 digits) *
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isLoading}
              maxLength={10}
              className={errors.phone ? 'border-destructive' : ''}
              required
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Recruiter Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isRecruiter"
              name="isRecruiter"
              checked={formData.isRecruiter}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  isRecruiter: checked as boolean,
                }))
              }
              disabled={isLoading}
            />
            <Label htmlFor="isRecruiter" className="text-sm cursor-pointer">
              I'm a recruiter interested in partnership
            </Label>
          </div>

          {/* Recruiter Consent */}
          {formData.isRecruiter && (
            <div className="space-y-2 p-3 bg-secondary/10 rounded-md border border-secondary/20">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="recruiterConsent"
                  name="recruiterConsent"
                  checked={formData.recruiterConsent}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      recruiterConsent: checked as boolean,
                    }))
                  }
                  disabled={isLoading}
                />
                <Label
                  htmlFor="recruiterConsent"
                  className="text-xs cursor-pointer flex-1"
                >
                  I consent to be contacted regarding recruitment and partnership
                  opportunities
                </Label>
              </div>
              {errors.recruiterConsent && (
                <p className="text-xs text-destructive ml-6">
                  {errors.recruiterConsent}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Start Chatting'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your information is secure and will only be used to provide assistance.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
