'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface LeadCaptureFormProps {
  onSuccess?: () => void;
}

export function LeadCaptureForm({ onSuccess }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    isRecruiter: false,
    receiveUpdates: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.company) {
      toast.error('Please fill in all required fields', {
        position: 'top-right',
        duration: 1500
      });
      return;
    }

    setIsLoading(true);

    try {
      // Store in localStorage for chat session
      const newUser = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        isRecruiter: formData.isRecruiter,
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9),
      };
      localStorage.setItem('reginfo_current_user', JSON.stringify(newUser));

      // Store in database/email service
      const existingData = JSON.parse(localStorage.getItem('reginfo_leads') || '[]');
      const newLead = {
        ...newUser,
        receiveUpdates: formData.receiveUpdates,
      };
      existingData.push(newLead);
      localStorage.setItem('reginfo_leads', JSON.stringify(existingData));

      // Send email notification via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'lead',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          isRecruiter: formData.isRecruiter,
          receiveUpdates: formData.receiveUpdates,
        }),
      });

      toast.success('Thanks for your interest! We\'ll be in touch soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        isRecruiter: false,
        receiveUpdates: false,
      });
      // Call the success callback to trigger parent state update
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.success('Thanks for your interest! We\'ll be in touch soon.');
      onSuccess?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          disabled={isLoading}
          className="bg-white/10 backdrop-blur-md border-primary/13 text-black placeholder:text-muted-foreground hover:bg-white/15 hover:border-primary/30 hover:shadow-sm focus:border-primary"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email Address <span className="text-red-400">*</span>
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          disabled={isLoading}
          className="bg-white/10 backdrop-blur-md border-primary/13 text-black placeholder:text-muted-foreground hover:bg-white/15 hover:border-primary/30 hover:shadow-sm focus:border-primary"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
          Company <span className="text-red-400">*</span>
        </label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your Company"
          disabled={isLoading}
          className="bg-white/10 backdrop-blur-md border-primary/13 text-black placeholder:text-muted-foreground hover:bg-white/20 hover:border-primary/40 hover:shadow-sm focus:border-primary"
        />
      </div>

      {/* Recruiter Checkbox */}
      <div className="flex items-center space-x-3">
        <Checkbox
          id="isRecruiter"
          name="isRecruiter"
          checked={formData.isRecruiter}
          onCheckedChange={(checked) =>
            setFormData(prev => ({ ...prev, isRecruiter: checked as boolean, receiveUpdates: false }))
          }
          disabled={isLoading}
          className="border-primary/16"
        />
        <label
          htmlFor="isRecruiter"
          className="text-sm text-foreground cursor-pointer"
        >
          I am a recruiter
        </label>
      </div>

      {/* Receive Updates Checkbox - Only for Recruiters */}
      {formData.isRecruiter && (
        <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border border-white/20">
          <Checkbox
            id="receiveUpdates"
            name="receiveUpdates"
            checked={formData.receiveUpdates}
            onCheckedChange={(checked) =>
              setFormData(prev => ({ ...prev, receiveUpdates: checked as boolean }))
            }
            disabled={isLoading}
            className='border-primary/15'
          />
          <label
            htmlFor="receiveUpdates"
            className="text-sm text-foreground cursor-pointer"
          >
            Send me your resume and connect for opportunities
          </label>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 text-white font-semibold h-11 transition-all cursor-pointer"
      >
        {isLoading ? 'Submitting...' : 'Get Started'}
      </Button>

    </form>
  );
}
