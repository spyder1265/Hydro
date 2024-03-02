"use client";
import { motion } from "framer-motion";
import * as React from "react";

interface IPageProps {
  children: React.ReactNode;
}

export const Page: React.FC<IPageProps> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className=''
  >
    {children}
  </motion.div>
);

export default Page;
