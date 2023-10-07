import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-zinc-900 text-white">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <section
          style={{
            backgroundImage: "url('/home-page-bg.png')",
          }}
          className="flex items-center justify-center flex-col-reverse sm:flex-row gap-12 flex-1 px-4 sm:px-12 md:px-20 py-14  "
        >
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-6xl text-[#2c97df] mb-7">Health ki tension?</h1>
            <p className="text-lg text-gray-300 mb-8 w-[85%]">
              Consult a big city doctor instantly on call, 24x7.
              Doctor-on-Demand enables you to speak with experienced and
              licensed specialist doctors instantly at any time of the day.
            </p>
            <Link href={"/search"}>
              <a>
                <button className="border-none outline-none bg-[#2c97df] px-8 py-2 rounded-full text-xl">
                  Consult Now
                </button>
              </a>
            </Link>
          </div>
          <div className="flex-1 h-96 w-[75%] sm:h-auto">
            <img src="/hero-img.svg" alt="hero-img" className="h-full w-auto" />
          </div>
        </section>
      </div>
      <section className="px-4 sm:px-12 py-14 max-w-[1980px] m-auto">
        <h2 className="text-4xl text-center pb-16 px-3">Why Choose Us</h2>
        <div className="flex items-center text-center flex-col md:flex-row justify-around gap-8">
          <div>
            <img
              className="rounded-full overflow-hidden m-auto"
              src="/feature-img-1.jpg"
              alt="feature-1"
            />
            <h4 className="mt-4 mb-2 text-xl text-[#2c97df]">
              Doctors who care
            </h4>
            <p className="w-[80%] m-auto text-gray-300">
              Our doctors listen to you patiently and only prescribe what's
              necessary
            </p>
          </div>
          <div>
            <img
              src="/feature-img-2.jpg"
              className="rounded-full overflow-hidden m-auto"
              alt="feature-2"
            />
            <h4 className="mt-4 mb-2 text-xl text-[#2c97df]">
              Curated Doctors
            </h4>
            <p className="w-[80%] m-auto text-gray-300">
              We hand-pick doctors for you, onboarded after a multi-step
              screening process
            </p>
          </div>
          <div>
            <img
              src="/feature-img-3.jpg"
              className="rounded-full overflow-hidden m-auto"
              alt="feature-3"
            />
            <h4 className="mt-4 mb-2 text-xl text-[#2c97df]">
              Transparent & Secure
            </h4>
            <p className="w-[80%] m-auto text-gray-300">
              Nothing is hidden. Access your medical records in your Health
              Locker, 24x7
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
