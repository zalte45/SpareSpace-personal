import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Working from './Working';
import Review from './Review';
import Footer from './Footer';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        // Sync ScrollTrigger with Lenis scroll updates
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis requestAnimationFrame hook to GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable lag smoothing in GSAP to prevent visual stuttering
        gsap.ticker.lagSmoothing(0);

        return () => {
            // Clean up and destroy Lenis instance on unmount
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <Navbar />
            <Hero />
            <Working />
            <Review />
            <Footer />
        </>
    );
};

export default Dashboard;
