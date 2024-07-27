'use client'
import { useEffect, useState } from 'react'


import { classNames } from '@/utils/classNames'
import { ArrowUp } from 'lucide-react'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300 || window.scrollY  > 300 || document.documentElement.scrollTop  > 300 || document.body.scrollTop < 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-2 right-2 z-[9999]" onClick={scrollToTop}>
      <button
        type="button"
        onClick={scrollToTop}
        className={classNames(
          isVisible ? 'opacity-100' : 'opacity-0 hidden',
          'bg-black  hover:bg-pink-700 inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 z-50',
        )}
      >
        <ArrowUp className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  )
}