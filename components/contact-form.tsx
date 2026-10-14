'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields',{
        position: 'top-right',
        duration: 1500
      });
      return;
    }

    setIsLoading(true);

    try {
      // Send contact to Brevo (List ID 10)
      const response = await fetch('/api/brevo/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          listId: 10,
        }),
      });

      if (response.ok) {
        toast.success('Message sent! Thanks for reaching out.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          disabled={isLoading}
          className="bg-white/10 backdrop-blur-md border-primary/13 text-black placeholder:text-muted-foreground focus:border-primary hover:bg-white/15 hover:border-primary/30 hover:shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          disabled={isLoading}
          className="bg-white/10 backdrop-blur-md border-primary/13 text-black placeholder:text-muted-foreground focus:border-primary hover:bg-white/15 hover:border-primary/30 hover:shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          disabled={isLoading}
          rows={4}
          className="bg-white/10 backdrop-blur-md border border-primary/13 text-foreground placeholder:text-muted-foreground focus:border-primary min-h-32 resize-none w-fullhover:bg-white/15 hover:border-primary/30 hover:shadow-sm"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 text-white font-semibold h-11 transition-all cursor-pointer"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
