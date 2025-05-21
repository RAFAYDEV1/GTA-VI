import React, { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'

function App() {

  let [showContent, setShowContent] = useState(false);
  useGSAP(()=>{
      const tl = gsap.timeline();

      tl.to(".vi-mask-group",{
        rotate: 10,
        duration: 2, 
        ease: "power4.easeInOut",
        transformOrigin: "50% 50%"
      })
      .to(".vi-mask-group",{
        scale: 10,
        duration: 2,
        delay: -1,
        ease: "expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function(){
          if(this.progress() >= 0.9){
            document.querySelector(".svg").remove();
            setShowContent(true);
            this.kill();
          }
        }
      })
  })

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  return (
    <>
       <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="/bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && <div className="main w-full">
        <div className='landing w-full h-screen bg-black overflow-hidden'>
          <div className='navbar w-full py-5 px-5 absolute top-0 left-0 z-10'>
            <div className="logo flex items-center gap-5">
              <div className="lines flex flex-col gap-1">
                <div className="line w-10 h-1 bg-white"></div>
                <div className="line w-8 h-1 bg-white"></div>
                <div className="line w-6 h-1 bg-white"></div>
              </div>
              <h2 className='text-2xl -mt-[8px] text-white leading-none'>Rockstar</h2>
            </div>
          </div>
          <div className='imagesdiv w-full h-screen relative'>
            <img className='sky w-full h-full object-cover absolute scale-1' src="/sky.png" alt="" />
            <img className='bg w-full h-full object-cover absolute scale-1' src="/bg.png" alt="" />
            <div className='text flex flex-col gap-4 text-9xl absolute top-10 left-1/2 -translate-x-1/2 text-white'>
            <h1 className='-ml-20'>Grand</h1>
            <h1 className='ml-20'>Theft</h1>
            <h1 className='-ml-20'>Auto</h1>
          </div>
            <img className='absolute -bottom-[35%] left-1/2 -translate-x-1/2 h-full' src="/girlbg.png" alt="" />
          </div>
          <div className="bottombar w-full py-10 px-10 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent">
            <img className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35px]' src="/ps5.png" alt="" />
          </div>
        </div>
        </div>}
    </>
  )
}

export default App