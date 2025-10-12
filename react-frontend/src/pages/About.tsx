// pages/about.tsx
import { useState, useEffect } from 'react';
import api from '../assets/call-api';
import AboutCard from '../components/AboutCard';
import type { AboutInfo, ApiResponse } from '../types/about';

function About() {
    const [aboutItems, setAboutItems] = useState<AboutInfo[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        // Show loading message only after 300ms delay
        const loadingTimer = setTimeout(() => {
            setShowLoading(true);
        }, 300);

        async function fetchAboutData() {
            try {
                // Fixed: Use AboutInfo instead of About
                const response = await api<ApiResponse<AboutInfo>>({
                    path: '/about-us',
                    method: 'get'
                });

                if (response.status === 'success') {
                    setAboutItems(response.data || null);
                }
            } catch (error) {
                console.error('Failed to fetch about:', error);
            } finally {
                setLoading(false);
                clearTimeout(loadingTimer); // Clear the timer
                setShowLoading(false); // Ensure loading message is hidden
            }
        }

        fetchAboutData();

        // Cleanup function
        return () => {
            clearTimeout(loadingTimer);
        };
    }, []);

    // Show loading only after delay AND while still loading
    if (loading && showLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;

    // Show error only if not loading AND no items
    if (!loading && !aboutItems) return <div className="flex justify-center items-center h-64">Failed to load about</div>;

    // Show about items when we have them
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-6">
                {aboutItems?.map((about, index) => (
                    <AboutCard
                        key={`about-${index}-${about.name}`}
                        info={about}
                    />
                ))}
            </div>
        </div>
    );
}

export default About;
