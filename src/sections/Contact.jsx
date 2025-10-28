import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Contact = () => {
	const sectionRef = useRef(null);

	useGSAP(() => {
		const ctx = gsap.context(() => {
			gsap.set(".contact-section", { opacity: 0, y: 100 });

			gsap.to(".contact-section", {
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					end: "top 40%",
					scrub: true,
				},
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: "power3.out",
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="contact-section min-h-screen flex flex-col justify-center items-center px-6 py-16  text-white "
		>
			<div className="max-w-2xl w-full text-center space-y-8">
				<h2 className="text-3xl md:text-5xl font-bold mb-6">Contact Us</h2>
				<p className="text-gray-300 mb-10">
					We’d love to hear from you! Whether you’re interested in working with
					us or just have a question — drop a message below.
				</p>

				<form className="space-y-5">
					<div>
						<input
							type="text"
							placeholder="Your Name"
							className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition"
						/>
					</div>

					<div>
						<input
							type="email"
							placeholder="Your Email"
							className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition"
						/>
					</div>

					<div>
						<textarea
							rows="5"
							placeholder="Your Message"
							className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition resize-none"
						></textarea>
					</div>

					<button
						type="submit"
						className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
					>
						Send Message
					</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
