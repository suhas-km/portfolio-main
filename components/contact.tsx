"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaComment, FaGithub, FaLinkedin, FaMapMarkerAlt, FaTags, FaHandshake } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
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
  
  const subjectOptions = [
    "General Inquiry",
    "Job Opportunity",
    "Project Collaboration",
    "Research Discussion",
    "Speaking Engagement",
    "Other"
  ];

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

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)]"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
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
          <div className="min-h-[450px]"> {/* Reduced height to eliminate extra space */}
          <AnimatePresence mode="wait">
            {activeTab === "form" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-black dark:text-white mb-4 text-center text-sm">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>

      <form
        className="flex flex-col text-gray-800 dark:text-black"
        onSubmit={(e) => {
          e.preventDefault();
          if (validateForm()) {
            const formData = new FormData();
            formData.append("senderName", formState.name);
            formData.append("senderEmail", formState.email);
            formData.append("subject", formState.subject);
            formData.append("message", formState.message);
            
            toast.promise(
              sendEmail(formData).then(({ data, error }) => {
                if (error) throw new Error(error);
                setFormState({ name: "", email: "", subject: "", message: "" });
                return data;
              }),
              {
                loading: 'Sending message...',
                success: 'Message sent successfully!',
                error: (err) => `${err.message || 'Failed to send message'}`
              }
            );
          } else {
            toast.error("Please fill out all fields correctly");
          }
        }}
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
            className={`relative h-12 pl-9 pr-3 py-3 w-full rounded-lg bg-white/90 border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} focus-within:border-secondary-500 focus-within:ring-1 focus-within:ring-secondary-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:focus-within:border-white transition-all dark:outline-none flex items-center cursor-pointer text-sm`}
            onClick={() => setShowSubjectOptions(!showSubjectOptions)}
          >
            <input 
              className="w-full h-full bg-transparent outline-none cursor-pointer text-sm dark:placeholder-gray-400 px-0"
              name="subject"
              type="text"
              required
              value={formState.subject}
              onChange={handleChange}
              placeholder="Select a subject"
              readOnly
            />
            <HiOutlineChevronDown className={`transition-transform ${showSubjectOptions ? 'rotate-180' : ''} text-secondary-600 dark:text-secondary-400 text-base`} />
          </div>
          {showSubjectOptions && (
            <motion.div 
              className="absolute z-10 mt-1 w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <ul className="py-1 max-h-40 overflow-auto">
                {subjectOptions.map((option) => (
                  <li 
                    key={option}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-black dark:text-white text-sm"
                    onClick={() => {
                      setFormState({...formState, subject: option});
                      setShowSubjectOptions(false);
                      setFormErrors({...formErrors, subject: false});
                    }}
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
          />
          {formErrors.message && <p className="text-red-500 text-xs text-left mt-1">Please enter your message</p>}
        </div>
        
        <div className="flex justify-end mt-4">
          <SubmitBtn />
        </div>
      </form>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <a 
                    href="https://www.linkedin.com/in/suhaskm" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white dark:bg-gray-700/30 rounded-lg shadow-md transition-transform hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-[#0077b5]/10 rounded-full flex items-center justify-center mr-3">
                      <FaLinkedin className="text-[#0077b5] text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white text-sm">LinkedIn</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">Professional Profile</p>
                    </div>
                  </a>
                  
                  <a 
                    href="https://github.com/suhas-km" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white dark:bg-gray-700/30 rounded-lg shadow-md transition-transform hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      <FaGithub className="text-gray-800 dark:text-white text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white text-sm">GitHub</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">Code & Projects</p>
                    </div>
                  </a>
                  

                  
                  <a 
                    href="mailto:suhaskm23@gmail.com" 
                    className="flex items-center p-4 bg-white dark:bg-gray-700/30 rounded-lg shadow-md transition-transform hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mr-3">
                      <FaEnvelope className="text-secondary-600 dark:text-secondary-400 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white text-sm">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">Direct Contact</p>
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

      {/* Contact cards with quick info moved below the form */}
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
