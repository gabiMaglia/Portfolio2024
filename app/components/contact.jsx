'use client';

import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { useTranslations } from "next-intl";

const Contact = () => {
  const formRef = useRef();
  const [isFormValid, setIsFormValid] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [characters, setCharacters] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const t = useTranslations('Contact');

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsFormValid(emailPattern.test(userEmail) && userName.trim().length > 1);
    setCharacters(userMessage.length);
  }, [userMessage, userEmail, userName]);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const res = await fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          userEmail,
          userMessage,
        }),
      });

      if (!res.ok) throw new Error("Email send failed");
      toast.success("Email sent");
      formRef.current.reset();
      setUserMessage("");
      setUserEmail("");
      setUserName("");
      setCharacters(0);
    } catch (error) {
      console.error("❌ Failed to send email:", error);
      toast.error("Your email could not be sent");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20 overflow-x-hidden">
      <h4 className="text-center mb-2 text-lg font-Ovo">{t('subtitle')}</h4>
      <h2 className="text-center text-5xl font-Ovo">{t('title')}</h2>
      <p className="text-center max-w-2xl mx-auto mt-15 mb-16 font-Ovo">
        {t('description')}
      </p>

      <form
        className="max-w-2xl mx-auto dark:text-black"
        onSubmit={sendEmail}
        ref={formRef}
      >
        {/* Inputs: stack en mobile, fila en >= sm */}
        <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6 mb-10">
          <input
            required
            type="text"
            placeholder={t('namePlaceholder')}
            className="w-full sm:flex-1 min-w-0 box-border p-3 h-12 outline-none border-[0.5px] border-gray-400 rounded-md"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            required
            type="email"
            placeholder={t('emailPlaceholder')}
            className="w-full sm:flex-1 min-w-0 box-border p-3 h-12 outline-none border-[0.5px] border-gray-400 rounded-md"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <textarea
          required
          cols="30"
          rows="6"
          placeholder={t('messagePlaceholder')}
          className="w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />

        <div
          className={`${characters < 1 ? "opacity-0" : "opacity-100"} ml-auto flex justify-end mt-1 text-lg font-bold text-gray-600`}
        >
            {characters}
        </div>

        <button
          className={`w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover font-Ovo ${isFormValid ? "cursor-pointer" : "cursor-not-allowed"}`}
          disabled={!isFormValid}
        >
          {t('send')}
          <IconArrowNarrowRight stroke={1} />
        </button>

        <div className="h-10">
          {isSending && <p className="text-center mt-4">{t('sending')}</p>}
        </div>
      </form>
    </div>
  );
};

export default Contact;
