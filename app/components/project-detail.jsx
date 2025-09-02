'use client'

import { useMemo, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { IconBrandGithub, IconExternalLink, IconChevronLeft, IconChevronRight, IconDots } from '@tabler/icons-react';

export default function ProjectDetail({ project }) {
  const images = useMemo(() => {
    if (!project) return [];
    return [project.img1_pro, project.img2_pro, project.img3_pro].filter(Boolean);
  }, [project]);

  const [index, setIndex] = useState(0);
  useEffect(() => setIndex(0), [project]); // reset cuando cambia el proyecto

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  // Flechas del teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  if (!project) return null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{project.title_pro}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{project.technologies_pro}</p>
      </div>

      {/* Carousel */}
      <div className="relative w-full rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10">
        <div className="relative w-full aspect-video">
          {images.length > 0 ? (
            <Image
              src={images[index]}
              alt={`${project.title_pro} - ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-contain bg-white dark:bg-neutral-900"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              No images available
            </div>
          )}
        </div>

        {/* Controles */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-neutral-800 transition"
              aria-label="Previous image"
            >
              <IconChevronLeft />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-neutral-800 transition"
              aria-label="Next image"
            >
              <IconChevronRight />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-neutral-800/90 border border-gray-200 dark:border-white/10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${i === index ? 'bg-gray-900 dark:bg-white' : 'bg-gray-300 dark:bg-neutral-600'}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Descripción */}
      <p className="mt-6 text-gray-700 dark:text-gray-200 leading-relaxed">
        {project.description_pro}
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        {project.deployLink_pro && (
          <a
            href={project.deployLink_pro}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 border border-gray-700 dark:border-white text-gray-800 dark:text-white hover:bg-lightHover dark:hover:bg-darkHover transition"
          >
            <IconExternalLink size={20} />
            Live Demo
          </a>
        )}
        {project.githubLink_pro && (
          <a
            href={project.githubLink_pro}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 border border-gray-700 dark:border-white text-gray-800 dark:text-white hover:bg-lightHover dark:hover:bg-darkHover transition"
          >
            <IconBrandGithub size={20} />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
