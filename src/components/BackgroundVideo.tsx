import React, { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

export const BackgroundVideo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // Extracted video frames cache for 0ms lag scrubbing
  const framesRef = useRef<ImageBitmap[]>([]);
  const isExtractingRef = useRef<boolean>(false);
  const framesReadyRef = useRef<boolean>(false);

  // Normalized cursor coordinate [0.0 - 1.0]
  const targetNormRef = useRef<number>(0.2);
  const currentNormRef = useRef<number>(0.2);
  const rafIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const userInteractedRef = useRef<boolean>(false);
  const lastMouseMoveTimeRef = useRef<number>(Date.now());
  const displayedFrameIdxRef = useRef<number>(-1);

  // Track scroll position to fade out canvas when scrolled past hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const opacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.85)));
      setScrollOpacity(opacity);
      isVisibleRef.current = opacity > 0.02;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Frame extractor & Canvas scrubbing engine
  useEffect(() => {
    const hiddenVideo = hiddenVideoRef.current;
    const canvas = canvasRef.current;
    if (!hiddenVideo || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Draw frame (either pre-extracted ImageBitmap or direct video element fallback)
    const drawFrame = (progress: number) => {
      if (!canvas || !ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const frames = framesRef.current;
      let sourceImage: CanvasImageSource | null = null;

      if (framesReadyRef.current && frames.length > 0) {
        const frameIdx = Math.max(0, Math.min(frames.length - 1, Math.round(progress * (frames.length - 1))));
        if (displayedFrameIdxRef.current === frameIdx) return;
        displayedFrameIdxRef.current = frameIdx;
        sourceImage = frames[frameIdx];
      } else if (hiddenVideo && hiddenVideo.readyState >= 2 && hiddenVideo.videoWidth > 0) {
        sourceImage = hiddenVideo;
      }

      if (!sourceImage) return;

      // Cover scaling calculation with 70% focal point (matching original objectPosition: '70% center')
      const sw = (sourceImage as any).width || hiddenVideo.videoWidth || 1920;
      const sh = (sourceImage as any).height || hiddenVideo.videoHeight || 1080;
      if (!sw || !sh) return;

      const scale = Math.max(cw / sw, ch / sh);
      const renderW = sw * scale;
      const renderH = sh * scale;

      // Align focal point at 70% X and 50% Y
      const renderX = (cw - renderW) * 0.7;
      const renderY = (ch - renderH) * 0.5;

      try {
        ctx.drawImage(sourceImage, renderX, renderY, renderW, renderH);
      } catch {
        // ignore potential transient frame read
      }
    };

    // Resize canvas to window dimensions with DPR handling
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Re-draw current frame immediately
      drawFrame(currentNormRef.current);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Extract frames into memory for instantaneous 0ms scrub
    const extractFrames = async (video: HTMLVideoElement) => {
      if (isExtractingRef.current || framesReadyRef.current) return;
      isExtractingRef.current = true;

      try {
        const duration = video.duration;
        if (!duration || isNaN(duration) || duration <= 0) return;

        // Extract ~60 evenly spaced keyframes across the 2-second video (~30fps)
        const frameCount = 60;
        const bitmaps: ImageBitmap[] = [];
        
        // Use an offscreen canvas to capture bitmaps
        const offCanvas = document.createElement('canvas');
        // Render at crisp 1280x720 internal resolution to keep memory ultralow (~30MB)
        offCanvas.width = 1280;
        offCanvas.height = 720;
        const offCtx = offCanvas.getContext('2d', { alpha: false });
        if (!offCtx) return;

        for (let i = 0; i < frameCount; i++) {
          const targetTime = (i / (frameCount - 1)) * (duration - 0.05) + 0.01;
          
          await new Promise<void>((resolve) => {
            const onSeeked = () => {
              video.removeEventListener('seeked', onSeeked);
              resolve();
            };
            video.addEventListener('seeked', onSeeked, { once: true });
            video.currentTime = targetTime;
          });

          offCtx.drawImage(video, 0, 0, offCanvas.width, offCanvas.height);
          const bmp = await createImageBitmap(offCanvas);
          bitmaps.push(bmp);
        }

        framesRef.current = bitmaps;
        framesReadyRef.current = true;
        setVideoLoaded(true);
        // Instant draw after extraction
        drawFrame(currentNormRef.current);
      } catch (err) {
        console.warn("Frame extraction fallback to direct video scrubbing:", err);
      } finally {
        isExtractingRef.current = false;
      }
    };

    // Initialize hidden video
    hiddenVideo.playbackRate = 1.0;
    hiddenVideo.muted = true;
    hiddenVideo.defaultMuted = true;
    hiddenVideo.pause();

    const onLoadedMetadata = () => {
      hiddenVideo.pause();
      setVideoLoaded(true);
      extractFrames(hiddenVideo);
    };

    hiddenVideo.addEventListener('loadedmetadata', onLoadedMetadata);

    // Ultra-Fast 60/120Hz Animation Loop
    const renderLoop = () => {
      if (isVisibleRef.current) {
        const now = Date.now();
        const timeSinceMove = now - lastMouseMoveTimeRef.current;

        // Subtle ambient oscillation when idle
        if (timeSinceMove > 3000 && !userInteractedRef.current) {
          targetNormRef.current = (targetNormRef.current + 0.0004) % 1.0;
        }

        // Direct follow or instant lerp (0.45 factor for zero noticeable lag)
        const diff = targetNormRef.current - currentNormRef.current;
        if (Math.abs(diff) > 0.0001) {
          currentNormRef.current += diff * 0.45;
          drawFrame(currentNormRef.current);

          // If frame cache isn't done yet, scrub direct video element as fallback
          if (!framesReadyRef.current && hiddenVideo.duration && !hiddenVideo.seeking) {
            const targetTime = currentNormRef.current * hiddenVideo.duration;
            try {
              hiddenVideo.currentTime = targetTime;
            } catch {
              // ignore
            }
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    // Direct cursor listeners
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMoveTimeRef.current = Date.now();
      userInteractedRef.current = true;
      const normalizedX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetNormRef.current = normalizedX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastMouseMoveTimeRef.current = Date.now();
        userInteractedRef.current = true;
        const normalizedX = Math.max(0, Math.min(1, e.touches[0].clientX / window.innerWidth));
        targetNormRef.current = normalizedX;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      hiddenVideo.removeEventListener('loadedmetadata', onLoadedMetadata);

      // Clean up bitmaps
      framesRef.current.forEach((bmp) => {
        if (bmp && typeof bmp.close === 'function') {
          bmp.close();
        }
      });
      framesRef.current = [];
      framesReadyRef.current = false;
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#0a0c10] transform-gpu transition-opacity duration-300"
      style={{ opacity: scrollOpacity }}
    >
      {/* Background ambient mesh glow */}
      <div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,#1e2530_0%,#090b0e_100%)] opacity-80"
      />

      {/* Hidden Source Video for decoding */}
      <video
        ref={hiddenVideoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        autoPlay={false}
        preload="auto"
        crossOrigin="anonymous"
        aria-hidden="true"
        className="hidden pointer-events-none opacity-0 fixed top-0 left-0 w-1 h-1"
      />

      {/* Instantaneous Hardware-Accelerated 2D Canvas Scrubbing */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`fixed inset-0 z-0 object-cover w-full h-full transition-opacity duration-500 ease-out will-change-transform ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          width: '100vw',
          height: '100vh',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Subtle cinematic vignette layer */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-t from-[#0a0c10] via-transparent to-black/15" 
      />
    </div>
  );
};
