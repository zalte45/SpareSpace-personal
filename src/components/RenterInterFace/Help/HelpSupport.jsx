import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Mail, ShieldCheck, MessageCircle } from "lucide-react";

const FAQS = [
  {
    q: "How does renting a storage space work on SpareSpace?",
    a: "Renters can search for verified local storage spaces like garages, spare rooms, basements, and parking spots. Select your start date and duration, review price details, and book securely.",
  },
  {
    q: "Is my security deposit refundable?",
    a: "Yes! 100% of your security deposit is refunded when your rental period ends smoothly without damages or unpaid fees.",
  },
  {
    q: "How do cancellations and refunds work?",
    a: "Cancellation policies are set by hosts (Flexible, Moderate, Strict). You can cancel directly from your Booking Details page.",
  },
  {
    q: "How do I communicate with the host?",
    a: "Once you view a space or make a booking request, you can use SpareSpace Messages to chat directly with the host.",
  },
];

const HelpSupport = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-xs text-gray-500 mt-1">
          Frequently asked questions and support resources for renters
        </p>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 bg-gray-50/50 hover:bg-gray-50 flex items-center justify-between font-semibold text-sm text-gray-900 cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp size={16} className="text-[#2B7FFF]" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </button>

              {openFaq === idx && (
                <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-[#2B7FFF] to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-lg">Still need help?</h3>
          <p className="text-xs text-blue-100 mt-1">
            Our SpareSpace customer support team is available 24/7 to assist you.
          </p>
        </div>

        <a
          href="mailto:support@sparespace.com"
          className="px-5 py-3 bg-white text-[#2B7FFF] hover:bg-blue-50 font-bold text-xs rounded-2xl transition-all shadow-md shrink-0 flex items-center gap-2"
        >
          <Mail size={16} />
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default HelpSupport;
