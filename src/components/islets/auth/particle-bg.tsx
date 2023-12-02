"use client";
import clsx from "@/lib/clsx";
import type Konva from "konva";
import {
  RefObject,
  createRef,
  memo,
  useEffect,
  useState,
} from "react";
import { Circle, Layer, Stage } from "react-konva";

const MAX_RADIUS = 7;
const MAX_SPEED = 0.1;
const MAX_COUNT = 80;

interface ParticleBgProps {
  particleColors?: string[];
  maxRadius?: number;
  maxSpeed?: number;
  stageWidth?: number;
  stageHeight?: number;
  maxCount?: number;
  className?: string;
}

function ParticleBg({
  particleColors = ["#1d1e22", "#7d8087", "#5f6988"],
  maxRadius = MAX_RADIUS,
  maxSpeed = MAX_SPEED,
  maxCount = MAX_COUNT,
  stageHeight,
  stageWidth,
  className,
}: ParticleBgProps) {
  const [particleList, setParticleList] = useState<RefObject<Konva.Circle>[]>(
    [],
  );
  const stageH = stageHeight ?? window.innerHeight;
  const stageW = stageWidth ?? window.innerWidth;
  function setupParticle(particle: RefObject<Konva.Circle>) {
    particle.current?.fill(
      particleColors[Math.floor(Math.random() * (particleColors.length - 1))],
    );
    particle.current?.radius(Math.random() * maxRadius);
    particle.current?.x(Math.random() * stageW);
    particle.current?.y(Math.random() * stageH);
  }

  function resetParticle(particle: RefObject<Konva.Circle>) {
    if (particle.current) {
      setupParticle(particle);
      particle.current.y(-maxRadius);
    }
  }

  useEffect(() => {
    particleList.forEach((particle) => setupParticle(particle));
    setParticleList([...particleList]);
  }, [stageH, stageW]);

  useEffect(() => {
    let animationFrameId: number;
    function moveParticle() {
      animationFrameId = requestAnimationFrame(moveParticle);
      setParticleList((prev) => {
        prev.forEach((particle) => {
          if (particle.current!?.y() > stageH) {
            resetParticle(particle);
          }
          const speed = Math.random() * maxSpeed;
          particle.current?.y(particle.current?.y() + speed);
        });
        return [...prev];
      });
    }
    moveParticle();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stageH, stageW]);

  useEffect(() => {
    function resizeHandler() {
      setParticleList((prev) => {
        prev.forEach((particle) => {
          setupParticle(particle);
        });
        return [...prev];
      });
    }
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [stageH, stageW]);

  return (
    <Stage
      width={stageW}
      height={stageH}
      className={clsx("absolute left-0 top-0 z-[-1]", className)}
    >
      <Layer>
        {Array.from({ length: maxCount }).map((_, i) => (
          <Circle
            key={i}
            ref={
              (particleList[i] = particleList[i] || createRef<Konva.Circle>())
            }
          />
        ))}
      </Layer>
    </Stage>
  );
}
export default memo(ParticleBg);
