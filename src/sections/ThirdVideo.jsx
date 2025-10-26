import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const ThirdVideo = () => {
	const videoRef = useRef();

	useGSAP(() => {
		// Set initial state
		gsap.set(".third-vd-wrapper", { marginTop: "-60vh", opacity: 0 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".third-vd-wrapper",
				start: "top top",
				end: "bottom top",
				scrub: 2,
				pin: true,
			},
		});

		// Fade in the wrapper
		tl.to(".third-vd-wrapper", {
			opacity: 1,
			duration: 1,
			ease: "power1.inOut",
		});

		// Animate video play
		videoRef.current.onloadedmetadata = () => {
			tl.to(
				videoRef.current,
				{
					currentTime: videoRef.current.duration,
					duration: 3,
					ease: "power1.inOut",
				},
				"<"
			);
		};
	});

	return (
		<section className="third-vd-wrapper relative">
			<div className="h-dvh w-dvw">
				<video
					ref={videoRef}
					muted
					playsInline
					preload="auto"
					src="/videos/ouput3.mp4"
					className="size-full object-cover md:[object-position:50%_center] [object-position:70%_center] third-vd"
				/>
			</div>
		</section>
	);
};

export default ThirdVideo;
