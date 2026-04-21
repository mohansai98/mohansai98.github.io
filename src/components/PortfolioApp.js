import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin as fabLinkedin, faGithub as fabGithub } from '@fortawesome/free-brands-svg-icons';
import PostmanUI from './PostmanUI';
import SPA from './SPA';

const PortfolioApp = () => {
    const [isPostmanUI, setIsPostmanUI] = useState(() => {
        const saved = localStorage.getItem('isPostmanUI');
        return saved !== null ? JSON.parse(saved) : false;
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('isPostmanUI', JSON.stringify(isPostmanUI));
    }, [isPostmanUI]);

    const toggleUI = () => {
        setIsPostmanUI(!isPostmanUI);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Prevent scrolling when menu is open
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
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
        <div className={`flex flex-col min-h-screen font-inter ${isPostmanUI ? 'bg-postman-dark-gray' : 'bg-brutalist-cream'}`}>
            <nav className={`sticky top-0 z-30 ${isPostmanUI ? 'bg-postman-orange shadow-md' : 'bg-brutalist-cream border-b-2 border-brutalist-black'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <a href="#home" className={`text-2xl font-black font-space tracking-tight ${isPostmanUI ? 'text-white' : 'text-brutalist-black'}`}>MOHAN SAI SINGU</a>
                        </div>
                        {!isPostmanUI && (
                            <div className="hidden md:flex justify-center items-center space-x-6 py-2 font-space font-bold uppercase text-sm">
                                <a href="#about" className="text-brutalist-black hover:bg-brutalist-orange hover:text-white px-2 py-1 transition-colors">About</a>
                                <a href="#experience" className="text-brutalist-black hover:bg-brutalist-orange hover:text-white px-2 py-1 transition-colors">Experience</a>
                                <a href="#skills" className="text-brutalist-black hover:bg-brutalist-orange hover:text-white px-2 py-1 transition-colors">Skills</a>
                                <a href="#projects" className="text-brutalist-black hover:bg-brutalist-orange hover:text-white px-2 py-1 transition-colors">Projects</a>
                                <a href="#contact" className="text-brutalist-black hover:bg-brutalist-orange hover:text-white px-2 py-1 transition-colors">Contact</a>
                            </div>
                        )}
                        <div className="flex items-center space-x-4">
                            <div
                                className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isPostmanUI ? 'bg-orange-700' : 'bg-brutalist-black'}`}
                                onClick={toggleUI}
                            > 
                                <div
                                    className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${isPostmanUI ? 'translate-x-7' : ''}`}
                                ></div>
                            </div>
                            <p className={`font-space font-bold text-sm uppercase ${isPostmanUI ? 'text-white' : 'text-brutalist-black'}`}>{isPostmanUI ? 'UI' : 'Postman'}</p>
                            {!isPostmanUI && (
                                <button
                                    className="md:hidden text-2xl text-brutalist-black"
                                    onClick={toggleMenu}
                                >
                                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {!isPostmanUI && (
                <div className={`md:hidden fixed inset-0 z-20 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} bg-brutalist-cream flex flex-col justify-center items-center space-y-8 font-space font-black text-3xl uppercase`}>
                    <button className="absolute top-6 right-6 text-3xl" onClick={toggleMenu}><FontAwesomeIcon icon={faTimes} /></button>
                    <a href="#about" onClick={toggleMenu}>About</a>
                    <a href="#experience" onClick={toggleMenu}>Experience</a>
                    <a href="#skills" onClick={toggleMenu}>Skills</a>
                    <a href="#projects" onClick={toggleMenu}>Projects</a>
                    <a href="#contact" onClick={toggleMenu}>Contact</a>
                </div>
            )}

            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isPostmanUI ? 'postman' : 'spa'}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        className="w-full h-full"
                    >
                        {isPostmanUI ? <PostmanUI /> : <SPA />}
                    </motion.div>
                </AnimatePresence>
            </main>
            <footer className={isPostmanUI ? "bg-[#1C1C1C] text-white py-8" : "bg-brutalist-cream border-t-2 border-brutalist-black py-12"}>
                <div className="container mx-auto px-4 text-center">
                    {!isPostmanUI && <h3 className="text-2xl font-black font-space uppercase mb-8">Let's Connect</h3>}
                    <div className="flex justify-center space-x-8">
                        <a href="https://www.linkedin.com/in/mohan-sai-singu/" target="_blank" rel="noreferrer" className={`transition duration-300 ${isPostmanUI ? 'text-gray-400 hover:text-white' : 'text-brutalist-black hover:text-brutalist-orange hover:-translate-y-1'}`}>
                            <FontAwesomeIcon icon={fabLinkedin} size="2x" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="https://github.com/mohansai98" target="_blank" rel="noreferrer" className={`transition duration-300 ${isPostmanUI ? 'text-gray-400 hover:text-white' : 'text-brutalist-black hover:text-brutalist-orange hover:-translate-y-1'}`}>
                            <FontAwesomeIcon icon={fabGithub} size="2x" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </div>
                    <p className={`mt-8 font-space font-bold uppercase text-xs tracking-widest ${isPostmanUI ? 'text-gray-400' : 'text-brutalist-black'}`}>
                        &copy; {new Date().getFullYear()} MOHAN SAI SINGU
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PortfolioApp;