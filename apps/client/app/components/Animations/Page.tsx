"use client";
import { motion } from "framer-motion";
import * as React from "react";

interface IPageProps {
  children: React.ReactNode;
}

export const Page: React.FC<IPageProps> = ({ children }) => (
  <motion.div
    //flade in from right to left
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className=''
  >
    {children}
  </motion.div>
);

export default Page;
