import React from 'react';
import { motion } from 'framer-motion';

const IntuitiveSPA = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="space-y-8">
      <motion.section {...fadeIn} className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#FF6C37]">About Me</h2>
        <p className="mb-2">I am a software developer with a passion for creating web applications.</p>
        <p className="mb-2">Email: mohansaisingu23@gmail.com</p>
        <p>LinkedIn: linkedin.com/in/mohan-sai-singu</p>
      </motion.section>

      <motion.section {...fadeIn} transition={{ delay: 0.2 }} className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#FF6C37]">Experience</h2>
        <h3 className="text-xl font-semibold mb-2">Full Stack Developer at Tata Consultancy Services (TCS)</h3>
        <p className="mb-2 text-gray-400">May 2019 - July 2022</p>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          <li>Worked on Revenue Management System</li>
          <li>Developed Budget Preparation tool</li>
          <li>Revamped Pension Portal</li>
        </ul>
      </motion.section>

      <motion.section {...fadeIn} transition={{ delay: 0.4 }} className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#FF6C37]">Skills</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Programming Languages: Java, C, SQL, Python, JavaScript, TypeScript</li>
          <li>Back-End: Spring Boot, Spring (MVC, Security, JPA), Node.js</li>
          <li>Front-End: HTML5, CSS3, Bootstrap, jQuery, React, Angular</li>
          <li>Databases: Postgres, Oracle, MySQL, NoSQL (MongoDB)</li>
          <li>Cloud Computing: Amazon Web Services</li>
        </ul>
      </motion.section>

      <motion.section {...fadeIn} transition={{ delay: 0.6 }} className="bg-[#2E2E2E] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#FF6C37]">Projects</h2>
        <ul className="space-y-4">
          <li>
            <h3 className="text-lg font-semibold">Task Management Application</h3>
            <p className="text-gray-300">Full stack application built using AWS services</p>
          </li>
          <li>
            <h3 className="text-lg font-semibold">9 Men Morris Game</h3>
            <p className="text-gray-300">Built using Python and Pygame</p>
          </li>
          <li>
            <h3 className="text-lg font-semibold">Sentiment Analysis on Twitter data</h3>
            <p className="text-gray-300">Using Big data technologies</p>
          </li>
        </ul>
      </motion.section>
    </div>
  );
};

export default IntuitiveSPA;