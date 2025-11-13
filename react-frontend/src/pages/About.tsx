// pages/about.tsx
import { useState, useEffect } from 'react';
import api from '../assets/call-api';
import type { AboutData, ApiResponse } from '../types/about';

import mikeWorking from '../assets/images/mike-working.jpg'
import megWorking from '../assets/images/meg-working.jpg'
import togetherImage from '../assets/images/together.jpg'

const images = [
    {
        name: 'Mike Casto',
        image: mikeWorking
    },
    {
        name: 'Margaret Westlake',
        image: megWorking
    },
]


function About() {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        // Show loading message only after 300ms delay
        const loadingTimer = setTimeout(() => {
            setShowLoading(true);
        }, 300);

        async function fetchAboutData() {
            try {
                const response = await api<ApiResponse<AboutData>>({
                    path: '/about-us',
                    method: 'get'
                });


                if (response.status === 'success' && response.data) {
                    setAboutData(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch about data:', error);
            } finally {
                setLoading(false);
                clearTimeout(loadingTimer);
                setShowLoading(false);
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

    // Show error only if not loading AND no data
    if (!loading && !aboutData) return <div className="flex justify-center items-center h-64">Failed to load about page</div>;

    // Add a safety check here - if aboutData is still null, show loading
    if (!aboutData) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    // Use the data from backend - response.data contains colors and teamMembers
    const { colors, teamMembers, together, goal } = aboutData;

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
                        About CastoWare
                    </h1>
                    <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: colors.secondary }}></div>
                </div>

                {/* Team Members */}
                <div className="space-y-16">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="flex flex-col lg:flex-row gap-8" >
                            {/* Left side - Name and Role */}
                            <div className="lg:w-1/3" >
                                <h2
                                    className="text-2xl font-bold mb-2"
                                    style={{ color: colors.primary }}
                                >
                                    {member.name}
                                </h2>
                                <p
                                    className="text-lg font-semibold mb-4"
                                    style={{ color: colors.secondary }}
                                >
                                    {member.role}
                                </p>
                                <div className="w-16 h-1" style={{ backgroundColor: colors.accent }}></div>

                                <div>
                                    {images.find(img => img.name === member.name) && (
                                        <img
                                            src={images.find(img => img.name === member.name)?.image}
                                            alt={member.name}
                                            className="  mt-2" style={{ height: '300px', objectFit: 'contain' }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Right side - Bio */}
                            <div className="lg:w-2/3 space-y-4 text-gray-700">
                                {member.bio.map((paragraph, idx) => (
                                    <p
                                        key={idx}
                                        className="leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: paragraph }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Together Section */}
                <div className="mt-20 pt-12 border-t border-gray-200">
                    <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto">
                        {/* Left side - Image */}
                        <div className="lg:w-1/3">
                            <img
                                src={togetherImage}
                                alt="Together"
                                className="mt-2"
                                style={{ height: '200px', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Right side - Content */}
                        <div className="lg:w-2/3">
                            <h3
                                className="text-2xl font-bold mb-6"
                                style={{ color: colors.primary }}
                            >
                                {together.label}
                            </h3>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: together.text }}>
                            </p>

                            <div className="bg-gray-50 rounded-lg p-8 border-l-4" style={{ borderLeftColor: colors.accent }}>
                                <p
                                    className="text-xl font-semibold italic"
                                    style={{ color: colors.primary }}
                                    dangerouslySetInnerHTML={{ __html: goal }}
                                >
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default About;
