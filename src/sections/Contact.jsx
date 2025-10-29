import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
	const sectionRef = useRef(null);
	const formRef = useRef(null);
	const [sending, setSending] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

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

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSending(true);

		const toastId = toast.loading("Sending your message...");

		emailjs
			.send(
				"service_x56l1dr", // your EmailJS service ID
				"template_l60uhka", // your template ID
				{
					name: formData.name,
					email: formData.email,
					time: new Date().toLocaleString(),
					message: formData.message,
				},
				"h9aNhYiKW5cxDKAFG" // your public key
			)
			.then(() => {
				toast.success("✅ Message sent successfully!", { id: toastId });
				setFormData({ name: "", email: "", message: "" });
			})
			.catch((error) => {
				console.error("EmailJS Error:", error);
				toast.error("❌ Something went wrong. Please try again.", {
					id: toastId,
				});
			})
			.finally(() => setSending(false));
	};

	return (
		<section
			ref={sectionRef}
			className="contact-section min-h-screen flex flex-col justify-center items-center px-6 py-16 text-white"
		>
			{/* Toast Container */}
			<Toaster position="top-center" reverseOrder={false} />

			<div className="max-w-2xl w-full text-center space-y-8">
				<h2 className="text-3xl md:text-5xl font-bold mb-6">Contact Us</h2>
				<p className="text-gray-300 mb-10">
					We’d love to hear from you! Whether you’re interested in working with
					us or just have a question — drop a message below.
				</p>

				<form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
					<div>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Your Name"
							required
							className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition"
						/>
					</div>

					<div>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Your Email"
							required
							className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition"
						/>
					</div>

					<div>
						<textarea
							name="message"
							rows="5"
							value={formData.message}
							onChange={handleChange}
							placeholder="Your Message"
							required
							className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition resize-none"
						></textarea>
					</div>

					<button
						type="submit"
						disabled={sending}
						className={`w-full font-semibold py-3 rounded-lg transition ${
							sending
								? "bg-gray-400 text-gray-800 cursor-not-allowed"
								: "bg-white text-black hover:bg-gray-200"
						}`}
					>
						{sending ? "Sending..." : "Send Message"}
					</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
