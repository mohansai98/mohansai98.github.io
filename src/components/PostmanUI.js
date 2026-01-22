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
            let cls = 'text-pink-400';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'text-orange-400';
                } else {
                    cls = 'text-green-400';
                }
            } else if (/true|false/.test(match)) {
                cls = 'text-blue-400';
            } else if (/null/.test(match)) {
                cls = 'text-red-500';
            }
            return `<span class="${cls}">${match}</span>`;
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#2E2E2E] text-white p-4">
            <div className="md:col-span-4 bg-[#1C1C1C] rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Welcome to my website!</h2>
                <p className="mb-2">Try out my APIs to experience some part of the backend development.</p>
                <p>To get started, click on the send request button and check what happens in the response.</p>
            </div>
            <div className="md:col-span-1 bg-[#1C1C1C] rounded-lg shadow-md p-4">
                <h2 className="text-xl font-bold mb-4">APIs</h2>
                <ul className="space-y-2">
                    {myApiCollections.map((collection, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer p-2 rounded transition-colors ${selectedCollection === collection
                                    ? 'bg-orange-500 text-white'
                                    : 'hover:bg-[#3C3C3C]'
                                }`}
                            onClick={() => {
                                setSelectedCollection(collection);
                                displayEndpoints(collection.endpoints);
                            }}
                        >
                            {collection.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="md:col-span-3 space-y-4">
            <div className="bg-[#1C1C1C] rounded-lg shadow-md p-4">
    <h2 className="text-xl font-bold mb-4 text-white">API Request</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <select
                value={method}
                onChange={(e) => {
                    setMethod(e.target.value);
                    setShowRequestBody(e.target.value === 'POST');
                }}
                className="w-full sm:w-auto bg-[#3C3C3C] border border-orange-500 rounded p-2 text-white"
            >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
            </select>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="api/endpoint"
                className="w-full sm:flex-grow bg-[#3C3C3C] border border-orange-500 rounded p-2 text-white"
            />
            <button 
                type="submit" 
                className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors flex items-center justify-center"
            >
                Send Request
            </button>
        </div>
    </form>
</div>
                {showRequestBody && (
                    <div className="bg-[#1C1C1C] rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-bold mb-4">Request Body</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-1">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={requestBody.name}
                                    onChange={(e) => setRequestBody({ ...requestBody, name: e.target.value })}
                                    className="w-full bg-[#3C3C3C] border border-orange-500 rounded p-2 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={requestBody.email}
                                    onChange={(e) => setRequestBody({ ...requestBody, email: e.target.value })}
                                    className="w-full bg-[#3C3C3C] border border-orange-500 rounded p-2 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-1">Message:</label>
                                <textarea
                                    id="message"
                                    value={requestBody.message}
                                    onChange={(e) => setRequestBody({ ...requestBody, message: e.target.value })}
                                    className="w-full bg-[#3C3C3C] border border-orange-500 rounded p-2 text-white"
                                    rows="4"
                                />
                            </div>
                        </div>
                    </div>
                )}
                {response && (
                    <div className="bg-[#1C1C1C] rounded-lg shadow-md p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Response</h2>
                            <div className={`px-2 py-1 rounded ${response.status >= 200 && response.status < 300 ? 'bg-green-500' : 'bg-red-500'}`}>
                                {response.status} {response.statusText}
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <button
                                className={`mr-2 px-4 py-2 rounded ${responseTab === 'raw' ? 'bg-orange-500' : 'bg-[#3C3C3C]'}`}
                                onClick={() => setResponseTab('raw')}
                            >
                                Raw
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${responseTab === 'pretty' ? 'bg-orange-500' : 'bg-[#3C3C3C]'}`}
                                onClick={() => setResponseTab('pretty')}
                            >
                                Pretty
                            </button>
                        </div>
                        <pre className="bg-[#3C3C3C] p-4 rounded overflow-x-auto">
                            {responseTab === 'raw'
                                ? JSON.stringify(response.data, null, 2)
                                : <div dangerouslySetInnerHTML={{ __html: formatPrettyJson(response.data) }} />
                            }
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostmanUI;