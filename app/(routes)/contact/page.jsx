"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import Image from "next/image";

const ContactPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [characters, setCharacters] = useState("");

  const form = useRef();
  const letterAmount = useRef();

  const validateForm = () => {
    setCharacters(letterAmount.current.value.length);
    const wordCount = userMessage.trim().split(/\s+/).length;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsFormValid(wordCount > 5 && emailPattern.test(userEmail));
  };

  useEffect(() => {
    validateForm();
  }, [userMessage, userEmail]);

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          toast.success("Email sent");
          form.current.reset();
          setUserMessage("");
          setUserEmail("");
        },
        () => {
          setError(true);
          toast.error("Your email could not be sent");
        }
      );
  };

  return (
    <motion.div
      className="h-full "
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col pt-24 md:pt-14 lg:pt-0 gap-24 lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* TEXT CONTAINER */}
        <div className=" h-full w-full lg:w-2/4 flex items-center justify-center text-6xl max-w-md min-w-max mx-auto ">
          <Image 
            src="/mail.png" 
            alt="Gabriel Maglia"
            // fill
            width={320}
            height={320}
            className="object-contain"
          ></Image>
        </div>

        {/* FORM CONTAINER */}
        <form
          className="h-1/2 w-full lg:h-full lg:w-2/4 rounded-xl text-xl flex flex-col gap-8 justify-center p-8"
          onSubmit={sendEmail}
          ref={form}
        >
          <div className="flex flex-col">
            <span className="font-semibold mb-7 text-2xl">Hi Gabriel,</span>
            <textarea
              ref={letterAmount}
              required
              rows={6}
              className="relative w-full h-32 bg-gray-200 border-blue-200 border text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="user_message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <span
              className={`${
                characters < 1 ? "opacity-0" : "opacity-100"
              } self-end mt-1 text-lg font-bold text-gray-600`}
            >
              {characters}
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <span className="font-semibold text-2xl">My mail address is:</span>
            <input
              required
              name="user_email"
              type="email"
              className="w-full bg-gray-200 border-blue-200 border text-gray-900  p-3 rounded-lg focus:outline-none focus:shadow-outline"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <span className="self-center lg:self-start font-semibold  text-2xl">
            Regards
          </span>
          <button
            className={`${
              isFormValid
                ? "bg-gray-400 text-gray-800 hover:bg-gray-700 hover:text-white"
                : "bg-gray-400 text-gray-600 "
            }  rounded font-semibold text-gray-600 p-4`}
            disabled={!isFormValid}
          >
            Send
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
