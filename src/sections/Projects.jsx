import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowLeft } from "react-icons/fa";
import ProjectDetails from "./ProjectDetails";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
	const overlayRef = useRef(null);
	const contentRef = useRef(null);
	const sectionRef = useRef(null);

	const [activeProject, setActiveProject] = useState(null);
	const [showGallery, setShowGallery] = useState(false);
	const [projectsData, setProjectsData] = useState([]);

	// Fetch projects.json from public folder
	useEffect(() => {
		fetch("/projects.json")
			.then((res) => res.json())
			.then((data) => setProjectsData(data))
			.catch((err) => console.error("Error loading projects:", err));
	}, []);

	// GSAP scroll animations
	useGSAP(() => {
		const ctx = gsap.context(() => {
			gsap.set(".lucia-life", { marginTop: "-80vh" });

			gsap.to(".lucia-life .img-box", {
				scrollTrigger: {
					trigger: ".lucia-life",
					start: "top center",
					end: "80% center",
					scrub: 2,
				},
				y: -200,
				duration: 1,
				ease: "power1.inOut",
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	// Overlay animation
	useEffect(() => {
		if (activeProject || showGallery) {
			gsap.to(overlayRef.current, {
				autoAlpha: 1,
				duration: 0.4,
				ease: "power2.out",
			});
			gsap.fromTo(
				contentRef.current,
				{ scale: 0.9, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
			);
		} else {
			gsap.to(overlayRef.current, {
				autoAlpha: 0,
				duration: 0.4,
				ease: "power2.inOut",
			});
		}
	}, [activeProject, showGallery]);

	return (
		<section className="lucia-life" ref={sectionRef}>
			{/* Left Column Images */}
			<div className="flex flex-col gap-5 items-end img-box lg:w-1/2 ps-10 mt-96">
				{projectsData[0] && (
					<div
						className="lucia-1 ml-10"
						onClick={() => setActiveProject(projectsData[0].id)}
					>
						<img
							src={projectsData[0].images[0]}
							alt={projectsData[0].title}
							className="cursor-pointer"
						/>
					</div>
				)}
				{projectsData[1] && (
					<div
						className="lucia-3"
						onClick={() => setActiveProject(projectsData[1].id)}
					>
						<img
							src={projectsData[1].images[0]}
							alt={projectsData[1].title}
							className="cursor-pointer"
						/>
					</div>
				)}
			</div>

			{/* Right Column Content & Image */}
			<div className="lg:w-1/2 lucia-life-content">
				<div className="max-w-2xl lg:ps-32 ps-10">
					<h1>Projects</h1>
					<h2>Celestial Creations: Illuminating Your World.</h2>
					<p>
						Step into a gallery where design transcends the ordinary and
						embraces the infinite. Our project portfolio showcases how we've
						transformed diverse spaces into harmonious sanctuaries, each echoing
						the serene beauty of the cosmos. From minimalist retreats to vibrant
						galactic-inspired environments, discover the artistry behind our
						Astral Interiors.
					</p>

					{/* Gallery Button */}
					<button
						onClick={() => setShowGallery(true)}
						className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
					>
						View Gallery
					</button>
				</div>

				{/* Optional right-side project image */}
				{projectsData[2] && (
					<div
						className="lucia-2 mt-10"
						onClick={() => setActiveProject(projectsData[2].id)}
					>
						<img
							src={projectsData[2].images[0]}
							alt={projectsData[2].title}
							className="cursor-pointer"
						/>
					</div>
				)}
			</div>

			{/* Overlay for Gallery or Project Details */}
			{(activeProject || showGallery) && (
				<div
					ref={overlayRef}
					className="fixed inset-0 bg-black/80 flex justify-center items-center z-[9999] opacity-0 overflow-auto"
					onClick={() => {
						setActiveProject(null);
						setShowGallery(false);
					}}
				>
					<div
						ref={contentRef}
						onClick={(e) => e.stopPropagation()}
						className="bg-black rounded-2xl shadow-2xl max-w-6xl w-full p-6 relative"
					>
						{activeProject ? (
							<>
								{/* Back to gallery */}
								<button
									onClick={() => {
										setShowGallery(true);
										setActiveProject(null);
									}}
									className="absolute top-4 left-4 text-white text-2xl p-2 rounded-full hover:bg-white/10 transition"
								>
									<FaArrowLeft />
								</button>
								<ProjectDetails projectId={activeProject} />
							</>
						) : (
							showGallery && (
								<div>
									<h1 className="text-center">Our Projects</h1>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
										{projectsData.map((project) => (
											<div
												key={project.id}
												className="relative cursor-pointer group"
												onClick={() => {
													setActiveProject(project.id);
													setShowGallery(false);
												}}
											>
												<img
													src={project.images[0]}
													alt={project.title}
													className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:opacity-80 transition duration-300"
												/>
												<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
													<h3 className="text-white text-lg font-semibold">
														{project.title}
													</h3>
												</div>
											</div>
										))}
									</div>
								</div>
							)
						)}
					</div>
				</div>
			)}
		</section>
	);
};

export default Projects;
