"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ReactLenis } from 'lenis/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Heropage() {
  const lenisRef = useRef()
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const aboutTextRef = useRef(null);
  const aboutImgRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
     function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(update)
    }

  }, []);

  useEffect(() => {
    gsap.fromTo(
      aboutTextRef.current,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutTextRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      aboutImgRef.current,
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutImgRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    const heroSection = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;

    // Create smooth parallax effect
    gsap.to(heroSection, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });

    // Animate hero content
    gsap.to([title, subtitle, button], {
      yPercent: 100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "25% top",
        end: "75% top",
        scrub: 1.5,
      }
    });

  }, []);

  const shoes = [
    {
      id: 1,
      name: "Air Max 270",
      price: "$150",
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/92c5672d-440c-4b21-8e09-56cd1237add8/A%27ONE+EP.png"
    },
    {
      id: 2,
      name: "Air Jordan 1",
      price: "$170",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-jordan-1-retro-high-og-mens-shoes-69TtXL.png"
    },
    {
      id: 3,
      name: "Air Force 1",
      price: "$90",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7cf1a9d7-b4c4-4e21-96cf-79d7473a6e4c/WMNS+AIR+FORCE+1+%2707+NN.png"
    },
    {
      id: 4,
      name: "React Infinity",
      price: "$160",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-2-mens-running-shoe-Jkd5dN.png"
    },
    {
      id: 5,
      name: "Dunk Low",
      price: "$100",
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dbd2620b-a99f-4279-97db-0344edf84e31/NIKE+DUNK+LOW+RETRO.png"
    },
    {
      id: 6,
      name: "Blazer Mid",
      price: "$100",
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7dcc6fd4-b41c-493e-85bd-58b8944b6b1d/W+BLAZER+MID+%2777.png"
    }
  ];

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} >
    <main className="bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black" />
        <div className="relative z-10 text-center">
          <h1
            ref={titleRef}
            className="text-8xl md:text-9xl font-black mb-6 tracking-tighter"
          >
            NIKE
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl font-light mb-8"
          >
            Just Do It
          </p>
          <button
            ref={buttonRef}
            className="bg-white text-black px-8 py-4 text-lg font-bold rounded-full 
                     hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="h-[80dvh] max-lg:h-[120dvh] py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center justify-center w-full">
            <div
              ref={aboutTextRef}
              className="space-y-6 mx-auto w-full"
              // style={{
              //   // Mobile: subtle slide in, Desktop: subtle slide in
              //   transform: isMobile
              //     ? `translateX(${Math.max(0, 50 - (scrollY - 400) * 0.2)}px)`
              //     : `translateX(${Math.max(0, 20 - (scrollY - 500) * 0.1)}px)`,
              //   opacity: Math.min(1, Math.max(0, (scrollY - 400) / 200)),
              //   transition: "transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s cubic-bezier(.4,0,.2,1)",
              // }}
            >
              <h2 className="text-5xl md:text-6xl font-black">
                Innovation
                <br />
                <span className="text-gray-400">Meets</span>
                <br />
                Performance
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed w-70 ">
                For over 50 years, Nike has pushed the boundaries of athletic innovation.
                From the waffle sole to Air cushioning to Flyknit technology, we've never
                stopped reimagining what's possible.
              </p>
              <p className="text-sm text-gray-300 leading-relaxed w-100">
                Every shoe tells a story of dedication, craftsmanship, and the relentless
                pursuit of helping athletes achieve their best.
              </p>
            </div>
            <div
              ref={aboutImgRef}
              className="relative"
              // style={{
              //   transform: `translateX(${Math.min(100, scrollY * 0.1 - 100)}px)`,
              //   opacity: Math.min(1, Math.max(0, (scrollY - 400) / 300)),
              //   transition: "transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s cubic-bezier(.4,0,.2,1)",
              // }}
            >
              <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center">
                <div className="text-6xl font-black text-gray-600">
                  <Image
                    src="/img/main.gif" // Replace with your GIF URL or local path
                    alt="Nike Animated Logo"
                    width={500} // Adjust width as needed
                    height={300} // Adjust height as needed
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shoes Showcase */}
      <section className="w-screen h-[200dvh] max-lg:h-[600dvh] py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto p-5">
          <h2
            className="text-5xl md:text-6xl font-black text-center mb-16"
            style={{
              transform: `translateY(${Math.max(-50, -scrollY * 0.05 + 100)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - 800) / 300)),
            }}
          >
            Iconic Collection
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shoes.map((shoe, index) => (
              <div
                key={shoe.id}
                className="group relative bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-500 transform hover:scale-105 "
                style={{
                  transform: `translateY(${Math.max(-30, -scrollY * 0.02 + 50 + index * 10)}px)`,
                  opacity: Math.min(1, Math.max(0, (scrollY - 1000 - index * 100) / 300)),
                }}
              >
                <div className="aspect-square bg-gradient-to-br from-white to-gray-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                    <Image
                      src={shoe.image}
                      alt={shoe.name}
                      width={300}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{shoe.name}</h3>
                <p className="text-xl font-semibold text-gray-300 mb-4">{shoe.price}</p>
                <button className="w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-all duration-300 transform group-hover:scale-105">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className=" w-screen h-[60dvh] py-20 px-6 md:px-12 lg:px-24 text-center">
        <div
          className="max-w-4xl mx-auto"
          style={{
            transform: `translateY(${Math.max(-50, -scrollY * 0.03 + 100)}px)`,
            opacity: Math.min(1, Math.max(0, (scrollY - 2000) / 300)),
          }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            Ready to
            <br />
            <span className="text-gray-400">Make Your Move?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join millions of athletes worldwide who trust Nike to help them achieve their dreams.
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
            <button className="block w-full md:w-auto bg-white text-black px-8 py-4 text-lg font-bold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
              Shop Collection
            </button>
            <button className="block w-full md:w-auto border-2 border-white text-white px-8 py-4 text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Find a Store
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-screen h-[25dvh] bg-gray-900 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-4xl font-black mb-6">NIKE</div>
          <p className="text-gray-400 mb-8">Just Do It</p>

        </div>
      </footer>
    </main>
    </ReactLenis>
  );
}
