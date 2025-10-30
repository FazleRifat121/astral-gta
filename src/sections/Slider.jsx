import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const images = [
	"/images/logos/logo1.png",
	"/images/logos/logo2.jpg",
	"/images/logos/logo3.jpg",
	"/images/logos/logo4.jpg",
	"/images/logos/logo5.jpg",
	"/images/logos/logo6.jpg",
	"/images/logos/logo7.jpg",
	"/images/logos/logo8.jpg",
	"/images/logos/logo9.jpg",
	"/images/logos/logo10.jpg",
	"/images/logos/logo11.jpg",
	"/images/logos/logo12.jpg",
	"/images/logos/logo13.jpeg",
	"/images/logos/logo14.png",
	"/images/logos/logo15.jpeg",
	"/images/logos/logo16.png",
	"/images/logos/logo17.jpg",
	"/images/logos/logo18.jpg",
];

const Slider = () => {
	const swiperRef = useRef();

	return (
		<div className="w-full py-10 overflow-hidden">
			<Swiper
				modules={[Autoplay]}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				watchSlidesProgress={true}
				onProgress={(swiper) => {
					swiper.slides.forEach((slide) => {
						const slideProgress = slide.progress;
						const scale = 1 + 0.25 * (1 - Math.min(Math.abs(slideProgress), 1));
						const opacity =
							0.5 + 0.5 * (1 - Math.min(Math.abs(slideProgress), 1));
						slide.querySelector("img").style.transform = `scale(${scale})`;
						slide.querySelector("img").style.opacity = opacity;
					});
				}}
				slidesPerView={5}
				centeredSlides={true}
				loop={true}
				loopedSlides={images.length}
				spaceBetween={20}
				speed={2000}
				autoplay={{
					delay: 0,
					disableOnInteraction: false,
				}}
				breakpoints={{
					320: { slidesPerView: 2, spaceBetween: 10 },
					480: { slidesPerView: 3, spaceBetween: 15 },
					640: { slidesPerView: 4, spaceBetween: 15 },
					768: { slidesPerView: 4, spaceBetween: 20 },
					1024: { slidesPerView: 5, spaceBetween: 20 },
					1280: { slidesPerView: 6, spaceBetween: 25 },
				}}
				className="w-full"
			>
				{images.map((img, i) => (
					<SwiperSlide
						key={i}
						className="flex justify-center items-center w-36 md:w-44 lg:w-48"
					>
						<img
							src={img}
							alt={`slide-${i}`}
							className="w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 object-cover rounded-xl transition-transform duration-500"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Slider;
