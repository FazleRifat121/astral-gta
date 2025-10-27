import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { FaArrowLeft } from "react-icons/fa";
import ProjectDetails from "./ProjectDetails";

const ProjectsMobile = ({ projectsData }) => {
	const overlayRef = useRef(null);
	const contentRef = useRef(null);

	const [activeProject, setActiveProject] = useState(null);
	const [showGallery, setShowGallery] = useState(false);

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
			// Disable background scroll
			document.body.style.overflow = "hidden";
		} else {
			gsap.to(overlayRef.current, {
				autoAlpha: 0,
				duration: 0.4,
				ease: "power2.inOut",
			});
			// Re-enable background scroll
			document.body.style.overflow = "auto";
		}
	}, [activeProject, showGallery]);

	if (!projectsData || projectsData.length === 0) return null;

	return (
		<section className="lucia-life-mobile px-5 py-10 min-h-screen lucia-life-content ">
			<h1 >Projects</h1>
			<h2 className="text-xl text-center mb-5">
				Celestial Creations: Illuminating Your World
			</h2>
			<p className="text-center mb-6">
				Step into a gallery where design transcends the ordinary and embraces
				the infinite. Our project portfolio showcases how we've transformed
				diverse spaces into harmonious sanctuaries, each echoing the serene
				beauty of the cosmos.
			</p>

			{/* View Gallery Button */}
			<div className="flex justify-center mb-6">
				<button
					onClick={() => setShowGallery(true)}
					className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
				>
					View Projects
				</button>
			</div>

			{/* Overlay for Gallery or Project Details */}
			{(activeProject || showGallery) && (
				<div
					ref={overlayRef}
					className="fixed inset-0 bg-black/80 flex justify-center items-start z-[9999] opacity-0 overflow-y-auto py-10"
					onClick={() => {
						setActiveProject(null);
						setShowGallery(false);
					}}
				>
					<div
						ref={contentRef}
						onClick={(e) => e.stopPropagation()}
						className="bg-black rounded-2xl shadow-2xl max-w-xl w-full p-6 relative mx-4"
					>
						{/* Back button only when viewing individual project */}
						{activeProject && (
							<button
								onClick={() => {
									setActiveProject(null);
									setShowGallery(true); // go back to gallery
								}}
								className="absolute top-4 left-4 text-white text-2xl p-2 rounded-full hover:bg-white/10 transition"
							>
								<FaArrowLeft />
							</button>
						)}

						{/* Show individual project */}
						{activeProject && <ProjectDetails projectId={activeProject} />}

						{/* Show full gallery */}
						{showGallery && !activeProject && (
							<div className="space-y-6">
								<h2 className="text-center text-2xl font-semibold text-white mb-4">
									All Projects
								</h2>
								<div className="grid grid-cols-1 gap-4">
									{projectsData.map((project) => (
										<div
											key={project.id}
											className="relative cursor-pointer"
											onClick={() => {
												setActiveProject(project.id);
												setShowGallery(false);
											}}
										>
											<img
												src={project.images[0]}
												alt={project.title}
												className="w-full rounded-xl shadow-lg object-cover"
											/>
											<div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
												<h3 className="text-white text-lg font-semibold">
													{project.title}
												</h3>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</section>
	);
};

export default ProjectsMobile;
