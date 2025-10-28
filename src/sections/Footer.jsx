const Footer = () => {
	return (
		<footer className="overflow-hidden ">
			{/* Bottom Credits */}
			<div className=" mt-6 py-6 text-center text-xs text-gray-500">
				<p>
					© {new Date().getFullYear()}{" "}
					<span className="text-white">Astral Interior & Furniture </span>. All
					rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
