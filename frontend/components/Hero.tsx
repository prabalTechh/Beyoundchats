import { CommonSpan } from "./CommonSpan";
import { FaStar } from "react-icons/fa";

export function Hero() {
  return (
    <div className="min-h-screen w-full">
      <div className="max-w-screen-xl mx-auto min-h-screen flex flex-col md:flex-row py-10 md:py-0">
        {/* Left Column */}
        <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex items-center">
          <div className="flex flex-col px-4 md:px-2 gap-4 py-8 md:py-0">
            <span>
              <h1 className="text-4xl md:text-6xl tracking-tight leading-slug font-normal text-white font-inter pb-2">
                Make AI your brand manager
              </h1>
            </span>
            <span>
              <p className="leading-snug text-base text-white md:pr-10 pb-2">
                Don't let your brand lose customers. Qualify your leads to 3X your sales with our intelligent AI chatbot. It's like hiring a sales manager who knows your business in and out and works 24*7.
              </p>
            </span>
            
            {/* Features Grid */}
            <div className="flex flex-col sm:flex-row gap-8 md:gap-16 pb-5">
              <span className="flex flex-col gap-3">
                <CommonSpan icon="/tick.png" text="Advanced Reporting" />
                <CommonSpan icon="/brain.png" text="Intelligent Analytics" />
              </span>
              <span className="flex flex-col gap-3">
                <CommonSpan icon="/slider.png" text="Business actions" />
                <CommonSpan icon="/lang.png" text="Language support : 70+" />
              </span>
            </div>
            
            {/* CTA and Ratings */}
            <div className="flex flex-col pt-5 gap-6">
              <button className="border py-2 max-w-xs bg-PrimaryButton">
                Get Started
              </button>
              <h2 className="text-PrimaryButton flex gap-0.5 items-center">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="text-slate-400">4.7(Trusted)</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen order-first md:order-last">
          <div className="h-full flex items-center justify-center">
            <img
              src="https://beyondchats.com/wp-content/uploads/2024/05/ezgif.com-svg-to-png-converter.png"
              alt="logo_img"
              className="relative bottom-7 w-full max-w-lg px-4 md:px-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;