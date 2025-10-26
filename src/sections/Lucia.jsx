import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Make sure to import ScrollTrigger if you haven't globally registered it

// Register ScrollTrigger plugin (do this once in your app, e.g., in App.js or main entry file,
// or directly here if this is the only place it's used with useGSAP's context)
gsap.registerPlugin(ScrollTrigger);

const Lucia = () => {
	const overlayRef = useRef(null);
	const imageRef = useRef(null);
	const sectionRef = useRef(null); // Ref for the main section to scope GSAP animations
	const [activeImage, setActiveImage] = useState(null);

	useGSAP(() => {
		// Use a GSAP context for better scoping and cleanup within the component
		const ctx = gsap.context(() => {
			gsap.set(".lucia-life", { marginTop: "-80vh" });

			gsap
				.timeline({
					scrollTrigger: {
						trigger: ".lucia-life", // Using the class for the trigger
						start: "top 80%",
						end: "10% center",
						scrub: 2,
					},
				})
				.to(".second-vd", { opacity: 0, duration: 1, ease: "power1.inOut" }); // Ensure .second-vd exists if you want this animation

			gsap.to(
				".lucia-life .img-box",
				{
					scrollTrigger: {
						trigger: ".lucia-life", // Using the class for the trigger
						start: "top center",
						end: "80% center",
						scrub: 2,
					},
					y: -200,
					duration: 1,
					ease: "power1.inOut",
				},
				"<" // Starts at the same time as the previous animation in the root timeline
			);
		}, sectionRef); // Scope all animations to the sectionRef

		return () => ctx.revert(); // Cleanup GSAP animations on component unmount
	}, []); // Empty dependency array means this runs once on mount

	// animate open/close image
	useEffect(() => {
		if (activeImage) {
			gsap.to(overlayRef.current, {
				autoAlpha: 1,
				duration: 0.4,
				ease: "power2.out",
			});
			gsap.fromTo(
				imageRef.current,
				{ scale: 0.8, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
			);
		} else {
			gsap.to(overlayRef.current, {
				autoAlpha: 0,
				duration: 0.4,
				ease: "power2.inOut",
			});
		}
	}, [activeImage]);

	return (
		<section className="lucia-life" ref={sectionRef}>
			{" "}
			{/* Assign ref to the section */}
			<div className="flex flex-col gap-5 items-end img-box lg:w-1/2 ps-10 mt-96">
				<div
					className="lucia-1"
					onClick={() => setActiveImage("/images/img5.jpg")}
				>
					<img
						src="/images/img5.jpg"
						alt="Celestial interior design project 1"
						className="cursor-pointer"
					/>
				</div>
				<div
					className="lucia-3"
					onClick={() => setActiveImage("/images/img6.jpg")}
				>
					<img
						src="/images/img6.jpg"
						alt="Celestial interior design project 2"
						className="cursor-pointer"
					/>
				</div>
			</div>
			<div className="lg:w-1/2 lucia-life-content">
				<div className="max-w-xl lg:ps-32 ps-10">
					<h1>Projects</h1>
					<h2> Celestial Creations: Illuminating Your World.</h2>
					<p>
						Step into a gallery where design transcends the ordinary and
						embraces the infinite. Our project portfolio showcases how we've
						transformed diverse spaces into harmonious sanctuaries, each echoing
						the serene beauty of the cosmos. From minimalist retreats that
						channel starlight to vibrant, expansive environments inspired by
						distant galaxies, every design is a unique journey. Discover the
						artistry behind our Astral Interiors, where visionary concepts meet
						meticulous execution, bringing unparalleled elegance and a touch of
						the ethereal into every home and business.
					</p>
				</div>

				<div
					className="lucia-2"
					onClick={() => setActiveImage("/images/img4.jpg")}
				>
					<img
						src="/images/img4.jpg"
						alt="Celestial interior design project 3"
						className="cursor-pointer"
					/>
				</div>
			</div>
			{/* Fullscreen Overlay */}
			{activeImage && (
				<div
					ref={overlayRef}
					onClick={() => setActiveImage(null)}
					className="fixed inset-0 bg-black/80 flex justify-center items-center z-[9999] opacity-0 cursor-pointer"
				>
					<img
						ref={imageRef}
						src={activeImage}
						alt="Full screen view of project image"
						className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl object-cover"
					/>
				</div>
			)}
		</section>
	);
};

export default Lucia;
