import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faCode, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import taskLogo from '../components/images/task-manager.jpeg';
import photo from '../components/images/photo.jpg';
import NineMenLogo from '../components/images/9-men.png';
import JobMatchLogo from '../components/images/job-match.png';
import PlanMyTripLogo from '../components/images/plan-my-trip.png';

const BentoCard = ({ children, className = '', id = '' }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className={`border-2 border-brutalist-black shadow-brutalist hover:shadow-brutalist-hover transition-all p-6 scroll-mt-24 ${className}`}
  >
    {children}
  </motion.div>
);

const SPA = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [alertMessage, setAlertMessage] = useState(null);

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

  const skills = [
    { category: "Languages", items: ["Java", "C", "SQL", "Python", "JavaScript", "TypeScript"] },
    { category: "Back-End", items: ["Spring Boot", "Node.js", "Express"] },
    { category: "Front-End", items: ["React", "Angular", "Next.js", "Tailwind"] },
    { category: "Cloud & DB", items: ["AWS", "Postgres", "MongoDB", "Oracle"] },
  ];

  const projects = [
    { title: "Plan My Trip", desc: "Travel planning app with itinerary management.", link: "https://mohansai98.github.io/planmytrip/", img: PlanMyTripLogo },
    { title: "Job Match Analyzer", desc: "AI-powered resume-job compatibility tool.", link: "https://job-match-app-a0479a87cf00.herokuapp.com/", img: JobMatchLogo },
    { title: "Task Manager", desc: "AWS-leveraged task tracking application.", link: "https://github.com/task-management-cc/task-management", img: taskLogo },
    { title: "9 Men Morris", desc: "Classic board game implemented in Python.", link: "https://github.com/UMKC-Glitchers/9-men-morris", img: NineMenLogo },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        
        {/* HERO CARD */}
        <BentoCard id="home" className="md:col-span-4 bg-brutalist-orange text-white flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-black font-space tracking-tighter mb-4 leading-none">
            MOHAN SAI<br/>SINGU
          </h1>
          <p className="text-xl md:text-2xl font-bold font-space uppercase mb-8 opacity-90">
            Full Stack Developer & Java Enthusiast
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="bg-brutalist-black text-white px-6 py-3 font-space font-black uppercase text-sm hover:translate-x-1 hover:-translate-y-1 transition-transform border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              View Projects
            </a>
            <a href="#contact" className="bg-white text-brutalist-black px-6 py-3 font-space font-black uppercase text-sm hover:translate-x-1 hover:-translate-y-1 transition-transform border-2 border-brutalist-black shadow-brutalist">
              Get In Touch
            </a>
          </div>
        </BentoCard>

        {/* PHOTO CARD */}
        <BentoCard className="md:col-span-2 p-0 overflow-hidden hidden md:block bg-white">
          <img src={photo} alt="Mohan Sai Singu" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
        </BentoCard>

        {/* ABOUT CARD */}
        <BentoCard id="about" className="md:col-span-3 bg-white">
          <h2 className="text-3xl font-black font-space uppercase mb-6 flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-3" />
            About Me
          </h2>
          <p className="text-lg leading-relaxed font-medium">
            I'm a software engineer who enjoys building web applications. I have experience working on microservices and machine learning models. I like solving challenging problems and learning new technologies to improve the software I develop.
          </p>
        </BentoCard>

        {/* SKILLS CARD */}
        <BentoCard id="skills" className="md:col-span-3 bg-brutalist-black text-white">
          <h2 className="text-3xl font-black font-space uppercase mb-6 flex items-center text-brutalist-orange">
            <FontAwesomeIcon icon={faCode} className="mr-3" />
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((s, i) => (
              <div key={i}>
                <h3 className="font-space font-black uppercase text-xs text-gray-400 mb-1">{s.category}</h3>
                <p className="font-bold text-sm">{s.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* EXPERIENCE CARD */}
        <BentoCard id="experience" className="md:col-span-6 bg-white">
          <h2 className="text-3xl font-black font-space uppercase mb-8 flex items-center">
            <FontAwesomeIcon icon={faBriefcase} className="mr-3 text-brutalist-orange" />
            Experience
          </h2>
          <div className="space-y-8">
            <div className="border-l-4 border-brutalist-black pl-6 relative">
              <div className="absolute w-4 h-4 bg-brutalist-orange border-2 border-brutalist-black rounded-none -left-[10px] top-1"></div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-black font-space uppercase">Software Engineer</h3>
                  <p className="font-bold text-brutalist-orange">Nevada DMV</p>
                </div>
                <span className="font-space font-black text-xs uppercase bg-brutalist-black text-white px-2 py-1">2025 - PRESENT</span>
              </div>
              <p className="text-sm font-medium">Transitioned DMV processes from manual to online. Automated case workflows using Salesforce OmniStudio, LWC, SOQL.</p>
            </div>

            <div className="border-l-4 border-brutalist-black pl-6 relative">
              <div className="absolute w-4 h-4 bg-brutalist-black border-2 border-brutalist-black rounded-none -left-[10px] top-1"></div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-black font-space uppercase">Software Engineer</h3>
                  <p className="font-bold text-brutalist-orange">Shineteck</p>
                </div>
                <span className="font-space font-black text-xs uppercase bg-gray-200 text-brutalist-black px-2 py-1">2022 - 2025</span>
              </div>
              <p className="text-sm font-medium">Developed an ecommerce application. Led backend development using Spring Boot, MongoDB.</p>
            </div>

            <div className="border-l-4 border-brutalist-black pl-6 relative">
              <div className="absolute w-4 h-4 bg-brutalist-black border-2 border-brutalist-black rounded-none -left-[10px] top-1"></div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-black font-space uppercase">Software Engineer</h3>
                  <p className="font-bold text-brutalist-orange">Tata Consultancy Services</p>
                </div>
                <span className="font-space font-black text-xs uppercase bg-gray-200 text-brutalist-black px-2 py-1">2019 - 2022</span>
              </div>
              <p className="text-sm font-medium">Developed critical components of Revenue Management System. Led revamp of Pension Portal.</p>
            </div>
          </div>
        </BentoCard>

        {/* PROJECTS SECTION HEADER */}
        <div id="projects" className="md:col-span-6 py-4 scroll-mt-24">
          <h2 className="text-4xl font-black font-space uppercase tracking-tighter border-b-4 border-brutalist-black inline-block">Featured Projects</h2>
        </div>

        {/* PROJECT CARDS */}
        {projects.map((p, i) => (
          <BentoCard key={i} className="md:col-span-3 group p-0 overflow-hidden flex flex-col bg-white">
            <div className="h-48 overflow-hidden border-b-2 border-brutalist-black">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-2xl font-black font-space uppercase mb-2">{p.title}</h3>
              <p className="text-sm font-medium mb-4 flex-grow">{p.desc}</p>
              <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center font-space font-black uppercase text-xs text-brutalist-orange hover:underline">
                View Project <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
              </a>
            </div>
          </BentoCard>
        ))}

        {/* CONTACT CARD */}
        <BentoCard id="contact" className="md:col-span-6 bg-brutalist-cream">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black font-space uppercase mb-6">Let's Work<br/><span className="text-brutalist-orange">Together</span></h2>
              <p className="font-bold mb-8">Have a project in mind or just want to say hi? Feel free to reach out!</p>
              {alertMessage && (
                <div className={`mb-6 p-4 border-2 border-brutalist-black ${alertMessage.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <p className="font-bold">{alertMessage.text}</p>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="YOUR NAME"
                className="w-full p-4 border-2 border-brutalist-black font-space font-bold uppercase text-xs focus:bg-brutalist-orange focus:text-white outline-none transition-colors"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="YOUR EMAIL"
                className="w-full p-4 border-2 border-brutalist-black font-space font-bold uppercase text-xs focus:bg-brutalist-orange focus:text-white outline-none transition-colors"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="YOUR MESSAGE"
                className="w-full p-4 border-2 border-brutalist-black font-space font-bold uppercase text-xs focus:bg-brutalist-orange focus:text-white outline-none transition-colors"
                required
              ></textarea>
              <button type="submit" className="w-full bg-brutalist-black text-white p-4 font-space font-black uppercase hover:bg-brutalist-orange transition-colors shadow-brutalist">
                Send Message
              </button>
            </form>
          </div>
        </BentoCard>

      </div>
    </div>
  );
};

export default SPA;
