import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const About = () => {
	const [activeImage, setActiveImage] = useState(null);
	const overlayRef = useRef(null);
	const imageRef = useRef(null);

	useGSAP(() => {
		gsap.set(".jason", { marginTop: "-80vh" });

		gsap
			.timeline({
				scrollTrigger: {
					trigger: ".jason",
					start: "top 90%",
					end: "10% center",
					scrub: 2,
				},
			})
			.to(".first-vd", { opacity: 0, duration: 1, ease: "power1.inOut" });

		gsap.to(".jason .img-box", {
			scrollTrigger: {
				trigger: ".jason",
				start: "top center",
				end: "80% center",
				scrub: 2,
			},
			y: -300,
			duration: 1,
			ease: "power1.inOut",
		});
	});

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
		<section className="jason flex flex-col md:flex-row items-start justify-between gap-10">
			{/* Left side: Text content */}
			<div className="max-w-2xl jason-content">
				<h1>About</h1>
				<h2>Crafting Spaces That Speak Without Words.</h2>
				<p>
					Astral Interior is a creative studio redefining modern living through
					thoughtful design. We believe every space holds an untold story — one
					that unfolds through light, texture, and form. Our mission is to bring
					those stories to life with a balance of beauty, function, and soul.
				</p>
			</div>

			{/* Right side: 2x2 collage grid */}
			<div className="img-box grid grid-cols-2 gap-4 md:w-1/2 mt-56 md:mt-32">
				<div className="jason-1 overflow-hidden ">
					<img
						src="/images/img1.jpg"
						onClick={() => setActiveImage("/images/img1.jpg")}
					/>
				</div>
				<div className="jason-1 overflow-hidden ">
					<img
						src="/images/img2.jpg"
						onClick={() => setActiveImage("/images/img2.jpg")}
					/>
				</div>
				<div className="jason-1 overflow-hidden ">
					<img
						src="/images/img3.jpg"
						onClick={() => setActiveImage("/images/img3.jpg")}
					/>
				</div>
				<div className="jason-1 overflow-hidden ">
					<img
						src="/images/img4.jpg"
						onClick={() => setActiveImage("/images/img4.jpg")}
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
						className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl object-cover"
					/>
				</div>
			)}
		</section>
	);
};

export default About;
