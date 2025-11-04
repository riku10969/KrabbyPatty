"use client";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-[90%] max-w-md rounded-3xl bg-[#FFF8E7] border-8 border-[#003E99] shadow-[8px_8px_0_#001E66] p-6 text-[#003E99]"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-2xl font-black text-[#003E99] hover:rotate-12 transition-transform"
            >
              ✕
            </button>
            <h3
              className="text-2xl font-extrabold text-white text-center mb-4"
              style={{ WebkitTextStroke: "1.5px #003E99" }}
            >
              CONTACT
            </h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="お名前"
                className="w-full rounded-lg border-4 border-[#003E99] p-2 text-[#003E99] font-semibold placeholder-[#003E99]/60"
              />
              <input
                type="email"
                placeholder="メールアドレス"
                className="w-full rounded-lg border-4 border-[#003E99] p-2 text-[#003E99] font-semibold placeholder-[#003E99]/60"
              />
              <textarea
                placeholder="お問い合わせ内容"
                rows={4}
                className="w-full rounded-lg border-4 border-[#003E99] p-2 text-[#003E99] font-semibold placeholder-[#003E99]/60"
              />
               <p className="text-right">
                ※クレームは受け付けておりません。
            </p>

              <button
                type="submit"
                className="w-full py-2 rounded-full bg-[#FFD600] border-4 border-[#FF0000] shadow-[4px_4px_0_#FF0000] font-extrabold text-[#003E99] hover:translate-y-[2px] active:translate-y-[4px] transition-all"
              >
                送信する
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
