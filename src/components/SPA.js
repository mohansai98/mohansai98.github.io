import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faCode, faProjectDiagram, faEnvelope, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import taskLogo from '../components/images/task-manager.jpeg';
import photo from '../components/images/photo.jpg';
import tcsLogo from '../components/images/tcs-logo.png';
import NineMenLogo from '../components/images/9-men.png';
import TwitterLogo from '../components/images/twitter-logo.png';

const SPA = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [alertMessage, setAlertMessage] = useState(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataUrl = new URLSearchParams(formData).toString();

    try {
      const response = await fetch('https://formspree.io/f/xgegyene', {
        method: 'POST',
        body: formDataUrl,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.ok) {
        setAlertMessage({ type: 'success', text: 'Thank you for contacting me! I will get back to you as soon as possible.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setAlertMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setAlertMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">

      <motion.section {...fadeIn} id="home" className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Mohan Sai Singu</h1>
          <p className="text-xl mb-8">Full Stack Developer | Java Enthusiast | Cloud Practitioner</p>
          <a href="#about" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
            Explore My Work <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </a>
        </div>
      </motion.section>

      <motion.section {...fadeIn} id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            About Me
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={photo}
                alt="Mohan Sai Singu"
                className="rounded-full mx-auto w-64 h-64 object-cover"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg mb-4">
                I'm a software engineer with a passion for creating robust web applications. With a strong foundation in full-stack development, I thrive on turning complex problems into elegant solutions.
              </p>
              <p className="text-lg mb-6">
                My journey in tech has led me through various exciting projects, from revenue management systems to sentiment analysis models. I'm always eager to learn and apply new technologies to create impactful software.
              </p>
              <a
                href="#contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 inline-block"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section {...fadeIn} id="experience" className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Experience
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 pb-8 border-l-2 border-blue-500">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-0"></div>
              <h3 className="text-xl font-semibold mb-2">Full Stack Developer</h3> 
              <h4 className="text-lg text-gray-600 mb-2">Tata Consultancy Services 
                <a href='https://tcs.com' target='_blank' rel="noreferrer"><img src={tcsLogo} alt="TCS Logo" className="h-6 w-auto" /></a>
              </h4>
              <p className="text-gray-500 mb-4">May 2019 - July 2022</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Developed critical components of the Revenue Management System</li>
                <li>Created a user-friendly Budget Preparation tool with data analysis features</li>
                <li>Led the revamp of the Pension Portal, enhancing functionality and user experience</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeIn} id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <FontAwesomeIcon icon={faCode} className="mr-2" />
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Languages</h3>
              <p>Java, C, SQL, Python, JavaScript, TypeScript</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Back-End</h3>
              <p>Spring Boot, Spring (MVC, Security, JPA), Node.js</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Front-End</h3>
              <p>HTML5, CSS3, Bootstrap, jQuery, React, Angular</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Databases</h3>
              <p>Postgres, Oracle, MySQL, MongoDB</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Cloud</h3>
              <p>Amazon Web Services (AWS)</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeIn} id="projects" className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src={taskLogo} alt="Task Management App" className="w-full h-72 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Task Management Application</h3>
                <p className="text-gray-600 mb-4">A full-stack application leveraging AWS services for efficient task tracking and management.</p>
                <a href="https://github.com/task-management-cc/task-management" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src={NineMenLogo} alt="9 Men Morris Game" className="w-full h-72 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">9 Men Morris Game</h3>
                <p className="text-gray-600 mb-4">A classic board game implemented using Python and Pygame, showcasing algorithmic thinking and game design principles.</p>
                <a href="https://github.com/UMKC-Glitchers/9-men-morris" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img src={TwitterLogo} alt="Twitter Sentiment Analysis" className="w-full h-72 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Twitter Sentiment Analysis</h3>
                <p className="text-gray-600 mb-4">A big data project analyzing Twitter data to determine sentiment, utilizing advanced data processing techniques and machine learning algorithms.</p>
                <a href="/" className="text-blue-600 hover:text-blue-800">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeIn} id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Get in Touch
          </h2>
          <div className="max-w-lg mx-auto">
            {alertMessage && (
              <div className={`mb-6 p-4 rounded-md ${alertMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <div className="flex justify-between items-center">
                  <p>{alertMessage.text}</p>
                  <button onClick={() => setAlertMessage(null)} className="text-current hover:text-gray-700">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>

      
    </div>
  );
};

export default SPA;