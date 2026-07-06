import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { Plans } from "@/components/Plans";
import { Testimonials } from "@/components/Testimonials";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4";

const FADE_SECONDS = 0.5;
const REPLAY_DELAY_MS = 100;

/** Drives the background video's opacity: 0.5s fade-in at start, 0.5s
 *  fade-out at end, then reset → 100ms pause → replay from 0. */
function useVideoFadeLoop(videoRef: React.RefObject<HTMLVideoElement>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = 0;
    let replayTimer: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      const { currentTime, duration, paused } = video;
      if (!paused && Number.isFinite(duration) && duration > 0) {
        const fadeIn = Math.min(currentTime / FADE_SECONDS, 1);
        const fadeOut = Math.min(Math.max((duration - currentTime) / FADE_SECONDS, 0), 1);
        video.style.opacity = String(Math.min(fadeIn, fadeOut));
      }
      rafId = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      replayTimer = setTimeout(() => {
        video.currentTime = 0;
        void video.play();
      }, REPLAY_DELAY_MS);
    };

    video.addEventListener("ended", handleEnded);
    void video.play().catch(() => {
      /* Autoplay can be blocked before interaction; muted playback normally allows it. */
    });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (replayTimer) clearTimeout(replayTimer);
      video.removeEventListener("ended", handleEnded);
    };
  }, [videoRef]);
}

function Hero() {
  return (
    <div className="relative">
      <div className="relative z-10">
        <section
          aria-labelledby="hero-heading"
          className="flex min-h-dvh flex-col overflow-visible"
        >
          <Navbar />

          <div className="relative flex flex-1 items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[527px] w-[984px] -translate-x-1/2 -translate-y-1/2 bg-gray-950 opacity-90 blur-[82px]"
            />

            <div className="relative flex flex-col items-center text-center">
              <h1
                id="hero-heading"
                className="font-headline text-[clamp(72px,15vw,220px)] font-normal leading-[1.02] tracking-[-0.024em]"
              >
                <span className="text-foreground">Web </span>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)",
                  }}
                >
                  Magic
                </span>
              </h1>

              <p className="mt-[9px] max-w-md text-lg leading-8 text-hero-sub opacity-80">
                Talisman Technologies builds websites for
                <br />
                individuals, startups & small businesses
              </p>

              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "heroSecondary", size: "unset" }),
                  "mt-[25px] px-[29px] py-[24px]"
                )}
              >
                Schedule a Consult
              </a>
            </div>
          </div>

          <LogoMarquee />
        </section>
      </div>
    </div>
  );
}

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoFadeLoop(videoRef);

  return (
    <div className="relative bg-background">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="fixed inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10">
        <Hero />
        <Services />
        <Work />
        <Process />
        <Plans />
        <Testimonials />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
