import React, { useState, useEffect, useCallback } from 'react';

const PostmanUI = () => {
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('');
    const [response, setResponse] = useState(null);
    const [requestBody, setRequestBody] = useState({ name: '', email: '', message: '' });
    const [showRequestBody, setShowRequestBody] = useState(false);
    const [responseTab, setResponseTab] = useState('raw');

    const myApiCollections = [
        {
            name: "About Me",
            endpoints: [
                { name: "About Me", method: "GET", url: "api/about" }
            ]
        },
        {
            name: "Experience",
            endpoints: [
                { name: "Experience", method: "GET", url: "api/experience" },
                { name: "Experience Details", method: "GET", url: "/api/experience/:experienceId" }
            ]
        },
        {
            name: "Skills",
            endpoints: [
                { name: "Skills", method: "GET", url: "api/skills" }
            ]
        },
        {
            name: "Projects",
            endpoints: [
                { name: "Project List", method: "GET", url: "api/projects" },
                { name: "Project Details", method: "GET", url: "api/projects/:projectId" }
            ]
        },
        {
            name: "Contact Me",
            endpoints: [
                { name: "Contact Me", method: "POST", url: "api/contact" }
            ]
        }
    ];

    const staticApiResponses = {
        "GET api/home": {
            name: "Mohan Sai Singu",
            skills: ["Full Stack Developer", "Java Enthusiast", "Cloud Practitioner"]
        },
        "GET api/about": {
            about: "I'm a software engineer who enjoys building web applications. I have experience working on microservices and machine learning models. I like solving challenging problems and learning new technologies to improve the software I develop.",
            contact: {
                linkedIn: "https://linkedin.com/in/mohan-sai-singu",
                gitHub: "https://github.com/mohansai98",
            }
        },
        "GET api/experience": {
            experience: [
                {
                    id: 1,
                    title: "Software Engineer",
                    company: "Nevada DMV",
                    startDate: "May 2025",
                    endDate: "Present",
                    description: "Transitioned DMV processes from manual to online\n Implemented dynamic document generation for complaint cases\n Automated case workflows using Salesforce OmniStudio, LWC, SOQL"

                },
                {
                    id: 2,
                    title: "Software Engineer",
                    company: "Shineteck",
                    startDate: "Sep 2022",
                    endDate: "May 2025",
                    description: "Developed an ecommerce application\n Led backend development using Spring Boot, MongoDB\n Built responsive frontend with Next.js, TypeScript"

                },
                {
                    id: 3,
                    title: "Software Engineer",
                    company: "Tata Consultancy Services (TCS)",
                    startDate: "May 2019",
                    endDate: "Jul 2022",
                    link: "https://tcs.com/",
                    description: "Developed critical components of the Revenue Management System.\n Created a user-friendly Budget Preparation tool with data analysis features.\n Led the revamp of the Pension Portal, enhancing functionality and user experience"
                },
            ],
        },
        "GET api/projects": {
            projects: [
                { name: "Plan My Trip", description: "A travel planning app to manage your itineraries and explore destinations.", link: "https://mohansai98.github.io/planmytrip/"},
                { name: "Job Match Analyzer", description: "A full-stack AI-powered application to analyze resume-job description compatibility", link: "https://job-match-app-a0479a87cf00.herokuapp.com/" },
                { name: "Task Management Application", description: "A full-stack application leveraging AWS services for efficient task tracking and management.", link: "https://github.com/task-management-cc/task-management" },
                { name: "9 Men Morris Game", description: "A classic board game implemented using Python and Pygame, showcasing algorithmic thinking and game design principles.", link: "https://github.com/UMKC-Glitchers/9-men-morris" },
                { name: "Twitter Sentiment Analysis", description: "A big data project analyzing Twitter data to determine sentiment, utilizing advanced data processing techniques and machine learning algorithms.", link: "#"}
            ]
        },
        "GET api/skills": {
            skills: [
                { category: "Programming Languages", items: ["Java", "C", "SQL", "Python", "JavaScript", "TypeScript"] },
                { category: "Back-End", items: ["Spring Boot", "Spring (MVC, Security, JPA)", "Node.js"] },
                { category: "Databases", items: ["Postgres", "Oracle", "MySQL", "NoSQL (MongoDB)"] },
                { category: "Front-End", items: ["HTML5", "CSS3", "Bootstrap", "jQuery", "React", "Angular"] },
                { category: "Cloud Computing", items: ["Amazon Web Services (Cognito, Amplify, RDS, EC2, S3, DynamoDB)"] },
                { category: "Testing & DevOps", items: ["JUnit", "Git", "GitHub", "GitLab", "Linux", "Jenkins", "SonarQube", "Docker", "Maven"] },
                { category: "Tools", items: ["Eclipse", "STS", "VS Code", "IntelliJ"] },
                { category: "Methodologies", items: ["Agile", "Scrum", "Test-Driven Development (TDD)"] },
            ]
        },
        "POST api/contact": {
            message: "Thank you for contacting me! I will get back to you as soon as possible."
        }
    };

    const displayHome = useCallback(() => {
        const home = {
            name: "Mohan Sai Singu",
            endpoints: [
                { name: "Mohan Sai Singu", method: "GET", url: "api/home" }
            ]
        };
        displayEndpoints(home.endpoints);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        displayHome();
    }, [displayHome]);

    const clearResponse = useCallback(() => {
        setResponse(null);
        setResponseTab('raw');
    }, []);

    const displayEndpoints = useCallback((endpoints) => {
        const firstEndpoint = endpoints[0];
        setMethod(firstEndpoint.method);
        setUrl(firstEndpoint.url);
        setShowRequestBody(firstEndpoint.method === 'POST');
        clearResponse();
    }, [clearResponse]);

    useEffect(() => {
        displayHome();
    }, [displayHome]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const responseKey = `${method} ${url}`;
        if (responseKey === "POST api/contact") {
            if (validateRequestBody()) {
                handleContactSubmission();
            }
        } else if (staticApiResponses[responseKey]) {
            setResponse({
                status: 200,
                statusText: 'OK',
                data: staticApiResponses[responseKey]
            });
        } else {
            setResponse({
                status: 404,
                statusText: 'Not Found',
                data: { error: "Invalid method or endpoint" }
            });
        }
    };

    const handleContactSubmission = () => {
        const formData = new URLSearchParams(requestBody).toString();
        fetch('https://formspree.io/f/xgegyene', {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.ok) {
                setResponse({
                    status: 200,
                    statusText: 'OK',
                    data: staticApiResponses["POST api/contact"]
                });
            } else {
                setResponse({
                    status: 400,
                    statusText: 'Bad Request',
                    data: { error: "Failed to send message. Please try again." }
                });
            }
        }).catch(error => {
            setResponse({
                status: 500,
                statusText: 'Internal Server Error',
                data: { error: error.message }
            });
        });
    };

    const validateRequestBody = () => {
        if (!requestBody.name || !requestBody.email || !requestBody.message) {
            setResponse({
                status: 400,
                statusText: 'Bad Request',
                data: { error: "All fields are required" }
            });
            return false;
        }
        return true;
    };

    const formatPrettyJson = (json) => {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, null, 2);
        }
        // eslint-disable-next-line
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
            let cls = 'text-emerald-400'; // Strings
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'text-sky-400'; // Keys
                }
            } else if (/true|false/.test(match)) {
                cls = 'text-fuchsia-400'; // Booleans
            } else if (/null/.test(match)) {
                cls = 'text-rose-500'; // Null
            } else if (/-?\d+/.test(match)) {
                cls = 'text-amber-400'; // Numbers
            }
            return `<span class="${cls}">${match}</span>`;
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-brutalist-black text-white p-6 font-inter min-h-screen">
            {/* Header / Intro */}
            <div className="md:col-span-4 bg-[#1e1e1e] border border-[#333] p-6 rounded-none shadow-brutalist relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-postman-orange"></div>
                <h2 className="text-2xl font-black font-space uppercase mb-2 tracking-tight">Interactive Terminal <span className="text-postman-orange text-sm ml-2 opacity-50 font-mono">v2.0.4</span></h2>
                <p className="text-gray-400 font-medium max-w-2xl">
                    Execute live API requests to explore my background. This terminal simulates a REST client connected to my profile's backend services.
                </p>
            </div>

            {/* Sidebar / Collections */}
            <div className="md:col-span-1 bg-[#1e1e1e] border border-[#333] p-4 flex flex-col">
                <h3 className="text-xs font-black font-space uppercase text-gray-500 mb-4 tracking-widest">Collections</h3>
                <ul className="space-y-1">
                    {myApiCollections.map((collection, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer px-3 py-2 text-sm font-bold transition-all flex items-center group ${selectedCollection === collection
                                    ? 'bg-postman-orange text-white'
                                    : 'hover:bg-[#2d2d2d] text-gray-400'
                                }`}
                            onClick={() => {
                                setSelectedCollection(collection);
                                displayEndpoints(collection.endpoints);
                            }}
                        >
                            <span className={`w-2 h-2 rounded-full mr-3 ${selectedCollection === collection ? 'bg-white' : 'bg-[#444] group-hover:bg-postman-orange'}`}></span>
                            {collection.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Request Area */}
            <div className="md:col-span-3 space-y-6">
                <div className="bg-[#1e1e1e] border border-[#333] p-6 shadow-lg">
                    <div className="flex items-center space-x-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 opacity-50"></div>
                        <span className="text-[10px] font-black font-space uppercase text-gray-600 ml-4 tracking-tighter">Request Builder</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-2">
                            <select
                                value={method}
                                onChange={(e) => {
                                    setMethod(e.target.value);
                                    setShowRequestBody(e.target.value === 'POST');
                                }}
                                className="w-full sm:w-32 bg-[#2d2d2d] border border-[#444] px-4 py-3 text-sm font-black font-space text-postman-orange focus:border-postman-orange outline-none cursor-pointer"
                            >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                            </select>
                            <div className="flex-grow flex items-center bg-[#2d2d2d] border border-[#444] focus-within:border-postman-orange transition-colors">
                                <span className="pl-4 text-gray-500 font-mono text-[10px] md:text-xs whitespace-nowrap flex-shrink-0 select-none">https://api.mohansai.dev/</span>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="endpoint"
                                    className="flex-grow bg-transparent border-none pl-1 pr-4 py-3 text-sm font-bold text-white outline-none font-mono min-w-0"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full sm:w-auto bg-postman-orange text-white px-8 py-3 font-space font-black uppercase text-sm hover:bg-[#ff8559] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                            >
                                Send
                            </button>
                        </div>

                        {showRequestBody && (
                            <div className="border-t border-[#333] pt-6 animate-in fade-in duration-300">
                                <h3 className="text-xs font-black font-space uppercase text-gray-500 mb-4 tracking-widest">Payload (JSON)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={requestBody.name}
                                        onChange={(e) => setRequestBody({ ...requestBody, name: e.target.value })}
                                        className="bg-[#2d2d2d] border border-[#444] p-3 text-sm focus:border-postman-orange outline-none"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={requestBody.email}
                                        onChange={(e) => setRequestBody({ ...requestBody, email: e.target.value })}
                                        className="bg-[#2d2d2d] border border-[#444] p-3 text-sm focus:border-postman-orange outline-none"
                                    />
                                    <textarea
                                        placeholder="Message..."
                                        value={requestBody.message}
                                        onChange={(e) => setRequestBody({ ...requestBody, message: e.target.value })}
                                        className="md:col-span-2 bg-[#2d2d2d] border border-[#444] p-3 text-sm focus:border-postman-orange outline-none h-24"
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Response Area */}
                <div className="bg-[#1e1e1e] border border-[#333] shadow-lg overflow-hidden min-h-[300px] flex flex-col">
                    <div className="bg-[#252525] px-6 py-3 flex justify-between items-center border-b border-[#333]">
                        <div className="flex space-x-4">
                            <button
                                className={`text-[10px] font-black font-space uppercase tracking-widest pb-1 transition-all ${responseTab === 'raw' ? 'text-postman-orange border-b-2 border-postman-orange' : 'text-gray-500 hover:text-gray-300'}`}
                                onClick={() => setResponseTab('raw')}
                            >
                                Body
                            </button>
                            <button
                                className={`text-[10px] font-black font-space uppercase tracking-widest pb-1 transition-all ${responseTab === 'pretty' ? 'text-postman-orange border-b-2 border-postman-orange' : 'text-gray-500 hover:text-gray-300'}`}
                                onClick={() => setResponseTab('pretty')}
                            >
                                Visualize
                            </button>
                        </div>
                        {response && (
                            <div className="flex items-center space-x-4">
                                <span className="text-[10px] font-mono text-gray-500">Status:</span>
                                <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded ${response.status >= 200 && response.status < 300 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {response.status} {response.statusText}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="p-6 flex-grow font-mono text-sm overflow-auto bg-[#1a1a1a]">
                        {!response ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
                                <div className="w-12 h-12 border-2 border-dashed border-[#333] rounded-full animate-spin-slow"></div>
                                <p className="text-xs uppercase font-space font-black tracking-widest">Awaiting Request...</p>
                            </div>
                        ) : (
                            <div className="animate-in slide-in-from-bottom-2 duration-300">
                                {responseTab === 'raw' ? (
                                    <pre className="whitespace-pre-wrap break-all text-gray-300">
                                        {JSON.stringify(response.data, null, 4)}
                                    </pre>
                                ) : (
                                    <pre className="pretty-json whitespace-pre-wrap break-all text-gray-300" dangerouslySetInnerHTML={{ __html: formatPrettyJson(response.data) }} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostmanUI;