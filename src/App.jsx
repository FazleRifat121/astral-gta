import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FaArrowUp } from "react-icons/fa";

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
import Services from "./sections/Services";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
	const [projectsData, setProjectsData] = useState([]);
	const [isMobile, setIsMobile] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);

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

	// ✅ Show scroll-to-top button after scrolling down
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowScrollTop(true);
			} else {
				setShowScrollTop(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// ✅ Scroll to top smoothly
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<main className="relative">
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

			<section id="services">
				<Services />
				{/* <PostCard /> */}
				{/* <Final /> */}
			</section>

			<section id="contact">
				<Contact />
				<Footer />
			</section>

			{/* ✅ Scroll to Top Button */}
			{showScrollTop && (
				<button
					onClick={scrollToTop}
					className="fixed bottom-8 right-8 p-3 rounded-full bg-[#008177] text-white text-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_#008177]"
					style={{ zIndex: 200 }}
					aria-label="Scroll to top"
				>
					<FaArrowUp />
				</button>
			)}
		</main>
	);
};

export default App;
