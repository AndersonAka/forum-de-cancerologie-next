'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TransitionProps {
    children: ReactNode;
}

export default function Transition({ children }: TransitionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
} 