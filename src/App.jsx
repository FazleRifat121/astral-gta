import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import NavBar from "./sections/NavBar";
import Hero from "./sections/Hero";
import FirstVideo from "./sections/FirstVideo";
import SecondVideo from "./sections/SecondVideo";
import PostCard from "./sections/PostCard";
import Final from "./sections/Final";
import Projects from "./sections/Projects";
import ProjectsMobile from "./sections/ProjectsMobile";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
	const [projectsData, setProjectsData] = useState([]);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Detect mobile device
		const handleResize = () => setIsMobile(window.innerWidth < 1024);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		// Load projects.json
		fetch("/projects.json")
			.then((res) => res.json())
			.then((data) => setProjectsData(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<main>
			{/* Navbar */}
			<NavBar />

			{/* Sections with matching IDs for scroll navigation */}
			<section id="home">
				<Hero />
			</section>

			<FirstVideo />
			<section id="about">
				<About />
			</section>

			<SecondVideo />
			<section id="projects">
				{isMobile ? (
					<ProjectsMobile projectsData={projectsData} />
				) : (
					<Projects />
				)}
			</section>

			<section id="philosophy">
				{/* <PostCard /> */}
				{/* <Final /> */}
			</section>

			<section id="contact black-gradient-bg ">
				<Contact />
				<Footer />
			</section>
		</main>
	);
};

export default App;
