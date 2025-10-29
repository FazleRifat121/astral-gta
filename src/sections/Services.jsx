import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
	const serviceRefs = useRef([]);
	serviceRefs.current = [];

	const addToRefs = (el) => {
		if (el && !serviceRefs.current.includes(el)) {
			serviceRefs.current.push(el);
		}
	};

	useGSAP(() => {
		// General page animation for header
		gsap.set(".services-section h1", { y: -50, opacity: 0 });
		gsap.set(".services-section h2", { y: -30, opacity: 0 });
		// Targeting the intro paragraph with a specific class for clarity
		gsap.set(".services-section .intro-paragraph", { y: -20, opacity: 0 });

		gsap
			.timeline({
				scrollTrigger: {
					trigger: ".services-section",
					start: "top 80%",
					end: "top 50%",
					scrub: 1,
				},
			})
			.to(".services-section h1", { y: 0, opacity: 1, duration: 0.8 })
			.to(".services-section h2", { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
			.to(
				".services-section .intro-paragraph",
				{ y: 0, opacity: 1, duration: 0.8 },
				"-=0.4"
			);

		// Animation for each service card
		serviceRefs.current.forEach((el) => {
			gsap.fromTo(
				el,
				{ autoAlpha: 0, y: 100 },
				{
					autoAlpha: 1,
					y: 0,
					duration: 1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: el,
						start: "top 85%",
						end: "top 50%",
						toggleActions: "play none none reverse",
						// markers: true, // Uncomment for debugging scroll trigger
					},
				}
			);
		});
	});

	const servicesData = [
		{
			id: 1,
			title: "Interior",
			description:
				"We create comprehensive layout designs that optimize the functionality and flow of outdoor spaces. Our goal is to ensure every area serves its intended purpose efficiently while enhancing aesthetics and usability.",
			// Corrected image path
			image: "/images/services/services_01.jpg",
		},
		{
			id: 2,
			title: "Exterior",
			description:
				"Our interior design services bring character, harmony, and sophistication to your space. We thoughtfully curate décor, colors, and accessories to create a balanced atmosphere that reflects your unique style and personality.",
			// Corrected image path
			image: "/images/services/services_02.jpg",
		},
		{
			id: 3,
			title: "Office",
			description:
				"Lighting plays a crucial role in shaping the ambiance of a workspace. Our lighting design solutions are tailored to enhance productivity and comfort by incorporating the perfect balance of illumination based on your work environment and aesthetic preferences.",
			// Corrected image path
			image: "/images/services/services_03.jpg",
		},
		{
			id: 4,
			title: "Hospitality",
			description:
				"We offer bespoke furniture design services, allowing you to integrate unique, custom-crafted pieces into your space. Whether you need a statement centerpiece or functional furnishings tailored to specific dimensions, we create solutions that blend aesthetics with practicality.",
			// Corrected image path
			image: "/images/services/services_04.jpg",
		},
		{
			id: 5,
			title: "Landscape",
			description:
				"Transforming existing spaces with comprehensive renovation plans, from concept to completion, bringing new life to old structures.",
			// Corrected image path
			image: "/images/services/services_05.jpg",
		},
	];

	return (
		<section className="services-section py-20 px-4 md:px-8 lg:px-16  ">
			{/* Added bg-gray-50 back for section background */}
			<div className="max-w-6xl mx-auto">
				{/* Removed `lucia-life` if it's not needed for specific CSS */}
				<h1 className="text-5xl md:text-6xl font-bold text-center mb-4 text-yellow font-long uppercase">
					{/* Removed -ml-13 */}
					Our Services
				</h1>
				<h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-pink">
					{/* Removed md:ml-12 */}
					Expertise for Every Vision
				</h2>
				<p className="intro-paragraph text-lg text-center max-w-3xl mx-auto mb-16 text-white">
					{/* Removed md:ml-56, added `intro-paragraph` class for GSAP, and text color */}
					At Astral Interior, we offer a comprehensive range of design services
					tailored to meet the diverse needs of our clients. Explore how we can
					bring your vision to life.
				</p>

				<div className="space-y-24">
					{servicesData.map((service, index) => (
						<div
							key={service.id}
							ref={addToRefs}
							className={`flex flex-col ${
								index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
							} items-center gap-10 md:gap-16  shadow-lg rounded-2xl p-6 md:p-10 border `}
							// Re-added bg-white and refined border color
						>
							<div className="md:w-1/2 overflow-hidden rounded-xl shadow-md">
								<img
									src={service.image}
									alt={service.title}
									className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
								/>
							</div>
							<div className="md:w-1/2 text-center md:text-left">
								<h3 className="text-4xl font-bold mb-4 text-pink">
									{/* Changed to a standard Tailwind pink shade */}
									{service.title}
								</h3>
								<p className="text-xl text-white leading-relaxed">
									{/* Added text-gray-700 for the description paragraph */}
									{service.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
