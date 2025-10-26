import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import logo from "/images/astral-logo.png";
import img1 from "../assets/nav/img1.jpg";
import img2 from "../assets/nav/img2.jpeg";
import img3 from "../assets/nav/img3.jpeg";
import img4 from "../assets/nav/img4.jpeg";
import img5 from "../assets/nav/img5.jpeg";

const navItems = ["Home", "About", "Projects", "Philosophy", "Contact"];
const hoverImages = [img1, img2, img3, img4, img5];

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState(logo);
	const [fadeImage, setFadeImage] = useState(logo);
	const [logoVisible, setLogoVisible] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	// Delay logo fade-in when menu opens
	useEffect(() => {
		if (isOpen) {
			setLogoVisible(false);
			const timer = setTimeout(() => setLogoVisible(true), 200); // 200ms delay
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

	return (
		<nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 z-50 ">
			{/* Logo */}
			<img src={logo} className="scale-90 w-32 md:w-52" alt="Logo" />

			{/* Hamburger Menu */}
			<button onClick={toggleMenu}>
				<img src="/images/menu.svg" className="w-10" alt="Menu" />
			</button>

			{/* Fullscreen Slider */}
			<div className="fixed inset-0 w-full h-full flex z-50 pointer-events-none">
				{/* Left Image Panel */}
				<div
					className={`hidden md:flex md:w-1/2 h-full bg-black items-center justify-center pointer-events-auto
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
					className={`w-full md:w-1/2 h-full bg-white flex flex-col justify-center items-center relative pointer-events-auto
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
								className="cursor-pointer font-semibold hover:text-blue-500"
								onMouseEnter={() => handleMouseEnter(hoverImages[index])}
								onMouseLeave={handleMouseLeave}
								onClick={toggleMenu}
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
