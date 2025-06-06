"use client";

import React, { useState, useRef } from "react";
import SectionHeading from "./section-heading";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { 
  FaUser, 
  FaEnvelope, 
  FaComment, 
  FaGithub, 
  FaLinkedin, 
  FaMapMarkerAlt, 
  FaTags, 
  FaHandshake, 
  FaCheckCircle, 
  FaPaperPlane 
} from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import confetti from "canvas-confetti";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const formRef = useRef<HTMLFormElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Form state management
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  
  const [activeTab, setActiveTab] = useState<"form" | "social">("form");
  const [showSubjectOptions, setShowSubjectOptions] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  
  const subjectOptions = [
    "General Inquiry",
    "Job Opportunity",
    "Project Collaboration",
    "Research Discussion",
    "Speaking Engagement",
    "Other"
  ];
  
  // Custom toast styles
  const toastStyles = {
    success: {
      style: {
        background: 'var(--secondary-color)',
        color: 'white',
        padding: '16px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      iconTheme: {
        primary: 'white',
        secondary: 'var(--secondary-color)',
      },
      duration: 5000,
    },
    error: {
      style: {
        background: '#ef4444',
        color: 'white',
        padding: '16px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#ef4444',
      },
      duration: 5000,
    },
    loading: {
      style: {
        background: '#1e293b',
        color: 'white',
        padding: '16px',
        borderRadius: '10px',
      },
    },
  };
  
  // Function to trigger confetti celebration
  const triggerConfetti = () => {
    if (confettiRef.current) {
      const rect = confettiRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      // First confetti burst with primary colors
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: ['#0ea5e9', '#3b82f6', '#06b6d4', '#0284c7'],
        zIndex: 1000,
        disableForReducedMotion: true,
        shapes: ['circle', 'square'],
        ticks: 200
      });
      
      // Second confetti burst with complementary colors (delayed slightly)
      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: x / window.innerWidth, y: y / window.innerHeight },
          colors: ['#38bdf8', '#0369a1', '#7dd3fc', '#0284c7'],
          zIndex: 1000,
          gravity: 1.2,
          scalar: 0.8,
          disableForReducedMotion: true
        });
      }, 150);
    }
  };
  
  // Reset form to initial state 
  const resetForm = () => {
    setFormState({ name: "", email: "", subject: "", message: "" });
    setFormErrors({ name: false, email: false, subject: false, message: false });
    setFormSubmitted(false);
    setIsFormSubmitting(false);
  };

  // Form validation
  const validateForm = () => {
    const errors = {
      name: formState.name.trim() === "",
      email: !/^\S+@\S+\.\S+$/.test(formState.email),
      subject: formState.subject.trim() === "",
      message: formState.message.trim() === ""
    };
    setFormErrors(errors);
    return !Object.values(errors).some(isError => isError);
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Clear any existing toasts to prevent duplicates
      toast.dismiss();
      
      setIsFormSubmitting(true);
      controls.start({
        opacity: [1, 0.7, 1],
        transition: { duration: 0.8, repeat: Infinity }
      });
      
      const formData = new FormData();
      formData.append("senderName", formState.name);
      formData.append("senderEmail", formState.email);
      formData.append("subject", formState.subject);
      formData.append("message", formState.message);
      
      // First dismiss any existing toasts to prevent duplicates
      toast.dismiss();
      
      // Show loading toast
      const loadingToastId = toast.loading('Sending your message...', toastStyles.loading);
      
      sendEmail(formData).then((response) => {
        // Always dismiss the loading toast
        toast.dismiss(loadingToastId);
        
        if (response.error) {
          // Show error toast only
          toast.error(
            <div className="flex items-center gap-2">
              <IoClose className="text-lg text-red-500" />
              <div>
                <p className="font-medium">Failed to send message</p>
                <p className="text-xs opacity-90">{response.error}</p>
              </div>
            </div>,
            toastStyles.error
          );
          
          setIsFormSubmitting(false);
          controls.stop();
        } else {
          // Success handling - NO toast, just UI change
          setIsFormSubmitting(false);
          controls.stop();
          setFormSubmitted(true);
          setTimeout(() => triggerConfetti(), 300);
        }
      }).catch(error => {
        // Dismiss loading toast
        toast.dismiss(loadingToastId);
        
        // Show error toast
        toast.error(
          <div className="flex items-center gap-2">
            <IoClose className="text-lg text-red-500" />
            <div>
              <p className="font-medium">Failed to send message</p>
              <p className="text-xs opacity-90">{error.message || 'An unexpected error occurred'}</p>
            </div>
          </div>,
          toastStyles.error
        );
        
        setIsFormSubmitting(false);
        controls.stop();
      });
    } else {
      toast.error(
        <div className="flex items-center gap-2">
          <IoClose className="text-lg" />
          <p>Please fill out all fields correctly</p>
        </div>,
        toastStyles.error
      );
    }
  };
  
  // Select a subject from dropdown
  const selectSubject = (subject: string) => {
    setFormState(prev => ({ ...prev, subject }));
    setShowSubjectOptions(false);
    if (formErrors.subject) {
      setFormErrors(prev => ({ ...prev, subject: false }));
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Contact form heading */}
      
      <SectionHeading>Contact me</SectionHeading>
      
      {/* Contact tabs */}
      <div className="bg-white shadow-lg dark:bg-black rounded-xl overflow-hidden mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => setActiveTab("form")} 
            className={`flex-1 py-3 px-4 font-medium transition-all flex items-center justify-center gap-2 ${activeTab === "form" ? "bg-gray-100 dark:bg-white/10 text-black dark:text-white border-b-2 border-black dark:border-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"}`}
          >
            <FaEnvelope className={`text-sm ${activeTab === "form" ? "opacity-100" : "opacity-70"}`} />
            <span>Contact Form</span>
          </button>
          <button 
            onClick={() => setActiveTab("social")} 
            className={`flex-1 py-3 px-4 font-medium transition-all flex items-center justify-center gap-2 ${activeTab === "social" ? "bg-gray-100 dark:bg-white/10 text-black dark:text-white border-b-2 border-black dark:border-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"}`}
          >
            <FaHandshake className={`text-sm ${activeTab === "social" ? "opacity-100" : "opacity-70"}`} />
            <span>Quick Links</span>
          </button>
        </div>
        
        <div className="p-4 text-black dark:text-white">
          <div className="min-h-[450px]"> 
            <AnimatePresence mode="wait">
              {activeTab === "form" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  ref={confettiRef}
                >
                  {formSubmitted ? (
                    <motion.div 
                      className="text-center py-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      <motion.div 
                        className="w-20 h-20 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        <FaPaperPlane className="text-secondary-600 dark:text-secondary-400 text-3xl" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Message Sent Successfully!</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                      <motion.button
                        className="px-6 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={resetForm}
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <>
                      <p className="text-black dark:text-white mb-4 text-center text-sm">
                        Fill out the form below and I'll get back to you as soon as possible.
                      </p>

                      <form
                        ref={formRef}
                        className="flex flex-col text-gray-800 dark:text-black"
                        onSubmit={handleFormSubmit}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div className="relative">
                            <div className="absolute left-3 top-3.5 text-secondary-600 dark:text-secondary-400 text-sm">
                              <FaUser />
                            </div>
                            <input
                              className={`h-12 pl-9 pr-3 w-full rounded-lg bg-white/90 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:border-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400 dark:focus:border-white transition-all dark:outline-none text-sm`}
                              name="name"
                              type="text"
                              required
                              value={formState.name}
                              onChange={handleChange}
                              placeholder="Your name"
                            />
                            {formErrors.name && <p className="text-red-500 text-xs text-left mt-1">Please enter your name</p>}
                          </div>
                          
                          <div className="relative">
                            <div className="absolute left-3 top-3.5 text-secondary-600 dark:text-secondary-400 text-sm">
                              <FaEnvelope />
                            </div>
                            <input
                              className={`h-12 pl-9 pr-3 w-full rounded-lg bg-white/90 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:border-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400 dark:focus:border-white transition-all dark:outline-none text-sm`}
                              name="email"
                              type="email"
                              required
                              value={formState.email}
                              onChange={handleChange}
                              placeholder="Your email"
                            />
                            {formErrors.email && <p className="text-red-500 text-xs text-left mt-1">Please enter a valid email</p>}
                          </div>
                        </div>
                        
                        <div className="relative mb-3">
                          <div className="absolute left-3 top-3.5 text-secondary-600 dark:text-secondary-400 text-sm z-10">
                            <FaTags />
                          </div>
                          <div 
                            className={`h-12 flex items-center justify-between pl-9 pr-3 w-full rounded-lg bg-white/90 border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} focus-within:border-secondary-500 focus-within:ring-1 focus-within:ring-secondary-200 cursor-pointer dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400 dark:focus-within:border-white transition-all`}
                            onClick={() => setShowSubjectOptions(!showSubjectOptions)}
                          >
                            <input
                              className="h-full w-full bg-transparent focus:outline-none text-sm cursor-pointer"
                              name="subject"
                              value={formState.subject}
                              onChange={handleChange}
                              placeholder="Select a subject"
                              readOnly
                            />
                            <HiOutlineChevronDown className={`transition-transform ${showSubjectOptions ? 'rotate-180' : ''} text-secondary-600 dark:text-secondary-400 text-base`} />
                          </div>
                          
                          {showSubjectOptions && (
                            <motion.div 
                              className="absolute z-20 mt-1 w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ul className="py-2 text-sm text-gray-800 dark:text-white">
                                {subjectOptions.map((option, index) => (
                                  <li 
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
                                    onClick={() => selectSubject(option)}
                                  >
                                    {option}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                          {formErrors.subject && <p className="text-red-500 text-xs text-left mt-1">Please select a subject</p>}
                        </div>
                        
                        <div className="relative mb-3">
                          <div className="absolute left-3 top-4 text-secondary-600 dark:text-secondary-400 text-sm">
                            <FaComment />
                          </div>
                          <textarea
                            className={`h-36 pl-9 pr-4 pt-3 pb-3 w-full rounded-lg bg-white/90 border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} focus:border-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400 dark:focus:border-white transition-all dark:outline-none text-sm leading-relaxed`}
                            name="message"
                            required
                            value={formState.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            maxLength={5000}
                          ></textarea>
                          {formErrors.message && <p className="text-red-500 text-xs text-left mt-1">Please enter your message</p>}
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <motion.div animate={isFormSubmitting ? controls : {}}>
                            <SubmitBtn className="ml-auto" isSubmitting={isFormSubmitting} />
                          </motion.div>
                        </div>
                      </form>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <p className="text-black dark:text-white mb-4 text-center text-sm">
                    Connect with me on social media or check out my other platforms.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <a 
                      href="https://www.linkedin.com/in/suhaskm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#0077b5]/10 rounded-full flex items-center justify-center mr-3">
                        <FaLinkedin className="text-[#0077b5] text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white text-sm">LinkedIn</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">Connect with me professionally</p>
                      </div>
                      <div className="ml-auto text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 15L15 5M15 5H8M15 5V12" />
                        </svg>
                      </div>
                    </a>
                    
                    <a 
                      href="https://github.com/suhas-km" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gray-900/10 rounded-full flex items-center justify-center mr-3">
                        <FaGithub className="text-gray-900 dark:text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white text-sm">GitHub</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">See my projects and contributions</p>
                      </div>
                      <div className="ml-auto text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 15L15 5M15 5H8M15 5V12" />
                        </svg>
                      </div>
                    </a>
                  </div>
                  
                  <div className="mt-6 p-3 bg-gray-100 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-center">
                    <p className="text-black dark:text-white text-sm">
                      Feel free to reach out for any professional inquiries, collaborations, or just to say hello!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Contact cards with quick info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8 mb-6">
        <motion.div 
          className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-md flex flex-col items-center text-center"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mb-3">
            <FaEnvelope className="text-secondary-600 dark:text-secondary-400 text-lg" />
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1 text-sm">Email</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">Ready to respond to your inquiries</p>
          <a className="text-secondary-600 dark:text-secondary-400 hover:underline text-xs" href="mailto:suhaskm23@gmail.com">suhaskm23@gmail.com</a>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-md flex flex-col items-center text-center"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mb-3">
            <FaMapMarkerAlt className="text-secondary-600 dark:text-secondary-400 text-lg" />
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1 text-sm">Location</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs mb-1">Washington D.C</p>
          <p className="text-gray-600 dark:text-gray-300 text-xs">Open to relocate for on-site opportunities</p>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-md flex flex-col items-center text-center"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mb-3">
            <FaHandshake className="text-secondary-600 dark:text-secondary-400 text-lg" />
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1 text-sm">Connect</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">Professional networking</p>
          <div className="flex space-x-3">
            <a href="https://www.linkedin.com/in/suhaskm" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com/suhas-km" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
