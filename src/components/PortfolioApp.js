import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostmanUI from './PostmanUI';
import IntuitiveSPA from './IntuitiveSPA';

const PortfolioApp = () => {
  const [isPostmanUI, setIsPostmanUI] = useState(() => {
    const saved = localStorage.getItem('isPostmanUI');
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('isPostmanUI', JSON.stringify(isPostmanUI));
  }, [isPostmanUI]);

  const toggleUI = () => {
    setIsPostmanUI(!isPostmanUI);
  };

  const pageVariants = {
    initial: { opacity: 0, x: '-100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '100%' }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-[#2E2E2E] text-white">
      <nav className="bg-[#FF6C37] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-white text-xl font-bold">Mohan Sai Singu</a>
          <div className="flex items-center space-x-2">
            <span className="text-sm">{isPostmanUI ? 'Postman UI' : 'Intuitive SPA'}</span>
            <button 
  onClick={toggleUI}
  className="px-3 py-1 bg-white text-black rounded"
>
  Toggle UI
</button>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto mt-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={isPostmanUI ? 'postman' : 'intuitive'}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full"
          >
            {isPostmanUI ? <PostmanUI /> : <IntuitiveSPA />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PortfolioApp;