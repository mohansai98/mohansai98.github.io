import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faCode, faProjectDiagram, faEnvelope, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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
        <div className={`flex flex-col min-h-screen ${isPostmanUI ? 'bg-postman-dark-gray' : 'bg-white'}`}>
            <nav className={`shadow-md sticky top-0 z-10 ${isPostmanUI ? 'bg-postman-orange' : 'bg-white'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <a href="#home" className={`text-xl font-bold ${isPostmanUI ? 'text-white' : 'text-gray-800'}`}>Mohan Sai Singu</a>
                        </div>
                        {!isPostmanUI && (
                            <div className="hidden md:flex justify-center items-center space-x-4 py-2">
                                <a href="#about" className="text-gray-600 hover:text-gray-800"><FontAwesomeIcon icon={faUser} className="mr-2" />About</a>
                                <a href="#experience" className="text-gray-600 hover:text-gray-800"><FontAwesomeIcon icon={faBriefcase} className="mr-2" />Experience</a>
                                <a href="#skills" className="text-gray-600 hover:text-gray-800"><FontAwesomeIcon icon={faCode} className="mr-2" />Skills</a>
                                <a href="#projects" className="text-gray-600 hover:text-gray-800"><FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />Projects</a>
                                <a href="#contact" className="text-gray-600 hover:text-gray-800"><FontAwesomeIcon icon={faEnvelope} className="mr-2" />Contact</a>
                            </div>
                        )}
                        <div className="flex items-center space-x-4">
                            <div
                                className="w-14 h-7 flex items-center bg-orange-700 rounded-full p-1 cursor-pointer"
                                onClick={toggleUI}
                            >
                                <div
                                    className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${isPostmanUI ? 'translate-x-7' : ''
                                        }`}
                                ></div>
                            </div>
                            <button
                                className="md:hidden text-2xl"
                                onClick={toggleMenu}
                            >
                                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className={isPostmanUI ? 'text-white' : 'text-gray-800'} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {!isPostmanUI && (
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} ${isPostmanUI ? 'bg-postman-dark-gray text-white' : 'bg-white text-gray-800'}`}>
                    <div className="container mx-auto px-4 py-2 space-y-2">
                        <a href="#about" className="block" onClick={toggleMenu}><FontAwesomeIcon icon={faUser} className="mr-2" />About</a>
                        <a href="#experience" className="block" onClick={toggleMenu}><FontAwesomeIcon icon={faBriefcase} className="mr-2" />Experience</a>
                        <a href="#skills" className="block" onClick={toggleMenu}><FontAwesomeIcon icon={faCode} className="mr-2" />Skills</a>
                        <a href="#projects" className="block" onClick={toggleMenu}><FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />Projects</a>
                        <a href="#contact" className="block" onClick={toggleMenu}><FontAwesomeIcon icon={faEnvelope} className="mr-2" />Contact</a>
                    </div>
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
        </div>
    );
};

export default PortfolioApp;