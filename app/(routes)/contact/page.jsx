"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { useUserStore } from "@/store/store";
import Link from "next/link";
import Image from "next/image";

const ContactPage = () => {
  const formRef = useRef();
  const [isFormValid, setIsFormValid] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [characters, setCharacters] = useState(0);
  const [socialMedia, setSocialMedia] = useState([]);
  const telephone = useUserStore((state) => state.persona?.telephone_persona);
  const userMedias = useUserStore((state) => state.social || []);
  const email = userMedias.find((e) => e.name === "Gmail") || {};

  useEffect(() => {
    setSocialMedia(userMedias);
  }, [userMedias]);

  useEffect(() => {
    const wordCount = userMessage.trim().split(/\s+/).length;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsFormValid(wordCount > 5 && emailPattern.test(userEmail));
    setCharacters(userMessage.length);
  }, [userMessage, userEmail]);

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_TEMPLATE_ID || "",
        formRef.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY || ""
      );

      console.log("Email successfully sent:", result.text);
      setUserMessage("");
      setUserEmail("");
      setCharacters(0);
      toast.success("Email sent");
      formRef.current.reset();
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Your email could not be sent");
    }
  };

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  return (
    <motion.section
      className="contact section container h-full pt-10 md:pt-0 mx-auto flex flex-col items-center md:justify-center"
      id="contact"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <span className="section-subtitle block text-center pb-3 font-bold text-gray-500">
        For projects and job proposals
      </span>
      <h2 className="pb-2 md:pb-10 section-title text-center text-2xl font-semibold text-red-900 mb-6">
        Contact Me
      </h2>

      <div className="contact__container flex flex-col md:flex-row gap-10">
        <div className="contact__content grid gap-6 md:grid-cols-2 ">
          <div className="contact__box flex flex-col justify-center rounded-lg p-6 text-center my-auto shadow-md hover:shadow-lg font-normal transition-shadow duration-300 bg-black/10">
            <h3 className="text-md md:text-lg font-semibold text-red-900 my-2">
              Location
            </h3>
            <span className="text-sm md:text-md text-gray-700">
              CP2000 Rosario - Argentina
            </span>
          </div>

          <div className="contact__box flex flex-col justify-center rounded-lg p-6 text-center py-auto shadow-md hover:shadow-lg font-normal transition-shadow duration-300 bg-black/10">
            <h3 className="text-md md:text-lg font-semibold text-red-900 my-2">
              Phone
            </h3>
            <span className="text-sm md:text-md text-gray-700">
              {telephone}
            </span>
          </div>

          <div className="contact__box col-span-2 flex flex-col justify-center rounded-lg p-6 my-auto text-center shadow-md hover:shadow-lg font-normal transition-shadow duration-300 bg-black/10">
            <h3 className="text-md md:text-lg font-semibold text-red-900 my-2">
              Gmail
            </h3>
            <Link href={email?.url || "/"}>
              <span className="text-sm md:text-md text-gray-700">
                {email?.url?.split(":")[1]?.toUpperCase() || ""}
              </span>
            </Link>
          </div>
        </div>

        <form
          className="contact__form grid gap-6 md:max-w-xl md:mx-auto"
          onSubmit={sendEmail}
          ref={formRef}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              type="text"
              placeholder="Name"
              className="contact__input w-full p-3 border border-gray-400 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 bg-white/40 "
            />
            <input
              required
              name="user_email"
              type="email"
              placeholder="Email"
              className="contact__input w-full p-3 border border-gray-400 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 bg-white/40 "
              value={userEmail}
              onChange={handleInputChange(setUserEmail)}
            />
          </div>

          <textarea
            required
            name="user_message"
            cols="30"
            rows="7"
            placeholder="Message"
            className="contact__input w-full p-3 border border-gray-400 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 bg-white/40 "
            value={userMessage}
            onChange={handleInputChange(setUserMessage)}
          />
          <span
            className={`${
              characters < 1 ? "opacity-0" : "opacity-100"
            } ms-auto mt-1 text-lg font-bold text-gray-600`}
          >
            {characters}
          </span>

          <button
            className={`${
              isFormValid
                ? "bg-gray-400 text-gray-800 hover:bg-gray-700 hover:text-white"
                : "bg-gray-400 text-gray-600"
            } rounded font-semibold p-4`}
            disabled={!isFormValid}
          >
            Send
          </button>
        </form>
        <div className="flex pb-10 justify-between gap-4 w-full md:hidden">
          {socialMedia.map((social, index) => (
            <div key={index}>
              <Link
                className="flex"
                target="_blank"
                rel="noopener noreferrer"
                href={social?.url || "/"}
              >
                <Image
                  layout="fixed"
                  src={social?.img || "/"}
                  alt={social?.name || "loading"}
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ContactPage;
