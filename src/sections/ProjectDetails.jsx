import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const ProjectDetails = ({ projectId, onBack }) => {
	const [project, setProject] = useState(null);
	const [activeImage, setActiveImage] = useState(null);

	useEffect(() => {
		fetch("/projects.json")
			.then((res) => res.json())
			.then((data) => {
				const found = data.find((p) => p.id === projectId);
				setProject(found);
			})
			.catch((err) => console.error("Error loading project data:", err));
	}, [projectId]);

	if (!project)
		return (
			<div className="text-center text-gray-500 py-10">
				Loading project details...
			</div>
		);

	return (
		<section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-10 space-y-6 sm:space-y-8">
			{/* Back Button to Gallery */}
			{onBack && (
				<button
					onClick={onBack}
					className="flex items-center gap-2 text-white mb-4 sm:mb-6 hover:text-gray-300"
				>
					<FaArrowLeft /> Back to Gallery
				</button>
			)}

			{/* Title & Description */}
			<header className="text-center">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
					{project.title}
				</h1>
				<p className="text-white text-base sm:text-lg max-w-full sm:max-w-2xl mx-auto leading-relaxed">
					{project.description}
				</p>
			</header>

			{/* Image Gallery */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				{project.images?.map((img, index) => (
					<div
						key={index}
						className="rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
						onClick={() => setActiveImage(img)}
					>
						<img
							src={img}
							alt={`${project.title} image ${index + 1}`}
							className="w-full h-48 sm:h-56 md:h-64 object-cover"
						/>
					</div>
				))}
			</div>

			{/* Fullscreen Overlay for clicked image */}
			{activeImage && (
				<div
					className="fixed inset-0 bg-black/80 flex justify-center items-center z-[9999] cursor-pointer px-2 sm:px-4"
					onClick={() => setActiveImage(null)}
				>
					<img
						src={activeImage}
						alt="Full screen project"
						className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-cover"
					/>
				</div>
			)}
		</section>
	);
};

export default ProjectDetails;
