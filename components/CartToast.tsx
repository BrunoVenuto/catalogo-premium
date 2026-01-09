"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function show() {
      setVisible(true);
      setTimeout(() => setVisible(false), 2000);
    }

    window.addEventListener("cart:add", show);
    return () => window.removeEventListener("cart:add", show);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="
            fixed z-[999]
            bottom-24 right-4
            bg-green-600 text-black
            px-4 py-3
            rounded-lg
            font-semibold
            shadow-xl
          "
        >
          Produto adicionado ao orçamento
        </motion.div>
      )}
    </AnimatePresence>
  );
}
