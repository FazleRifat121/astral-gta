import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import logo from "/images/astral-logo.png";
import img1 from "../assets/nav/img1.jpg";
import img2 from "../assets/nav/img2.jpeg";
import img3 from "../assets/nav/img3.jpeg";
import img4 from "../assets/nav/img4.jpeg";
import img5 from "../assets/nav/img5.jpeg";

const navItems = ["Home", "About", "Projects", "Services", "Contact"];
const hoverImages = [img1, img2, img3, img4, img5];

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState(logo);
	const [fadeImage, setFadeImage] = useState(logo);
	const [logoVisible, setLogoVisible] = useState(false);
	const [scrolled, setScrolled] = useState(false); // ✅ for glow toggle

	const toggleMenu = () => setIsOpen((prev) => !prev);

	// ✅ Detect scroll for glow
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) setScrolled(true);
			else setScrolled(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isOpen) {
			setLogoVisible(false);
			const timer = setTimeout(() => setLogoVisible(true), 200);
			return () => clearTimeout(timer);
		} else {
			setLogoVisible(false);
		}
	}, [isOpen]);

	const handleMouseEnter = (img) => {
		setFadeImage(img);
		setTimeout(() => setCurrentImage(img), 50);
	};

	const handleMouseLeave = () => {
		setFadeImage(logo);
		setTimeout(() => setCurrentImage(logo), 50);
	};

	// ✅ Scroll smoothly to section
	const handleNavClick = (item) => {
		const sectionId = item.toLowerCase();
		const section = document.getElementById(sectionId);
		if (section) {
			window.scrollTo({
				top: section.offsetTop - 80,
				behavior: "smooth",
			});
		}
		setIsOpen(false);
	};

	return (
		<nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 z-[100] transition-all duration-300">
			{/* Logo with glow effect when scrolled */}
			<a href="/" className="transition-all duration-500">
				<img
					src={logo}
					className={`scale-90 w-32 md:w-52 transition-all duration-500 ${
						scrolled ? "drop-shadow-[0_0_12px_#008177] brightness-110" : ""
					}`}
					alt="Logo"
				/>
			</a>

			{/* Hamburger Menu */}
			<button onClick={toggleMenu}>
				<img src="/images/menu.svg" className="w-10 " alt="Menu" />
			</button>

			{/* Fullscreen Slider */}
			<div
				className={`fixed inset-0 w-full h-full flex z-[99] transition-all duration-500
					${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
			>
				{/* Left Image Panel */}
				<div
					className={`hidden md:flex md:w-1/2 h-full bg-black items-center justify-center
					transform transition-transform duration-500 ease-in-out
					${isOpen ? "translate-x-0" : "-translate-x-full"}`}
				>
					<img
						src={fadeImage}
						alt="Hover Visual"
						className={`transition-opacity transition-transform duration-700 ease-in-out ${
							currentImage === fadeImage
								? "opacity-100 scale-100"
								: "opacity-0 scale-95"
						}`}
						style={{
							width: currentImage === logo ? "24rem" : "100%",
							height: currentImage === logo ? "13rem" : "100%",
							opacity:
								currentImage === logo ? (logoVisible ? 1 : 0) : undefined,
							transition:
								currentImage === logo
									? "opacity 0.7s ease-in-out, transform 0.7s ease-in-out"
									: undefined,
						}}
					/>
				</div>

				{/* Right Menu Panel */}
				<div
					className={`w-full md:w-1/2 h-full bg-white flex flex-col justify-center items-center relative
					transform transition-transform duration-500 ease-in-out
					${isOpen ? "translate-x-0" : "translate-x-full"}`}
				>
					<button
						onClick={toggleMenu}
						className="absolute top-6 right-6 text-black text-4xl cursor-pointer"
					>
						<FaTimes />
					</button>

					<ul className="flex flex-col gap-8 md:gap-12 text-3xl md:text-4xl text-black text-center capitalize p-8 md:p-12">
						{navItems.map((item, index) => (
							<li
								key={item}
								className="cursor-pointer font-semibold hover:text-pink"
								onMouseEnter={() => handleMouseEnter(hoverImages[index])}
								onMouseLeave={handleMouseLeave}
								onClick={() => handleNavClick(item)}
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
