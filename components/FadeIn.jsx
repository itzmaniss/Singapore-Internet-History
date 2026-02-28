"use client";

import { useRef, useEffect, useState } from "react";

export default function FadeIn({ children, className = "" }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
            } ${className}`}
        >
            {children}
        </div>
    );
}
