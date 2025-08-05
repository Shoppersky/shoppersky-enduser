'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';

interface FAQSection {
  title: string;
  questions: {
    q: string;
    a: string;
  }[];
}

const faqSections: FAQSection[] = [
  {
    title: 'Delivery',
    questions: [
      {
        q: 'Do I need to be home for the delivery?',
        a: 'Yes, someone needs to be present to receive fresh and frozen items. However, for shelf-stable items, we can arrange a safe place delivery.',
      },
      {
        q: 'Can I return items after delivery?',
        a: "Yes, you can return items within 24 hours if they don't meet our quality standards. Contact our customer service for assistance.",
      },
      {
        q: 'What if a product is out of stock?',
        a: "We'll offer you a similar alternative or provide a refund for the item.",
      },
      {
        q: 'Can I pick up my order instead of delivery?',
        a: 'Yes, you can select the pickup option during checkout from our store location.',
      },
      {
        q: 'What should I do if my order arrives damaged?',
        a: "Contact us immediately with photos of the damaged items, and we'll arrange a replacement or refund.",
      },
    ],
  },
  {
    title: 'Shipping',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 1-3 business days within our service area.',
      },
      {
        q: 'Can I track my delivery?',
        a: "Yes, you'll receive a tracking link via email once your order is dispatched.",
      },
      {
        q: 'Can I request a specific delivery time?',
        a: 'Yes, you can select a preferred delivery slot during checkout.',
      },
      {
        q: 'What happens in case of delayed delivery?',
        a: "We'll notify you immediately and offer compensation or rescheduling options.",
      },
    ],
  },
  {
    title: 'Billing',
    questions: [
      {
        q: 'When will I be charged for my order?',
        a: 'Your card will be charged when your order is confirmed.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit/debit cards and digital wallets.',
      },
      {
        q: 'Do you provide invoices for orders?',
        a: 'Yes, digital invoices are sent to your email after purchase.',
      },
      {
        q: 'What should I do if I am overcharged?',
        a: 'Contact our billing department immediately with your order details.',
      },
      {
        q: 'Can I change my billing information after placing an order?',
        a: 'Contact customer service within 1 hour of placing your order for changes.',
      },
    ],
  },
  {
    title: 'Support',
    questions: [
      {
        q: 'What are your customer support hours?',
        a: "We're available Monday to Saturday, 9 AM to 8:30 PM.",
      },
      {
        q: 'How can I contact customer support?',
        a: 'Via phone, email, or the contact form on our website.',
      },
      {
        q: 'What if I have an issue outside office hours?',
        a: "Leave a message, and we'll respond first thing next business day.",
      },
      {
        q: "Can I cancel my order after it's been placed?",
        a: 'Yes, within 1 hour of placing the order, subject to processing status.',
      },
      {
        q: 'How do I report a damaged product?',
        a: 'Use our contact form or call customer service with your order details.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-[#1B4B33] mb-12">
          FAQ
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {faqSections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
