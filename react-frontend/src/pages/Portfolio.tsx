// pages/Portfolio.tsx
import { useState, useEffect } from 'react';
import api from '../assets/call-api';

// Define what ONE portfolio item looks like
interface Portfolio {
    id: number;
    site_name: string;
    image: string;
    url: string;
    sort_order: number;
    created_at: string | null;
    updated_at: string | null;
}

// Define what your API response structure looks like
interface ApiResponse<T> {
    status: 'success' | 'error';
    message?: string;
    data?: T[];
}

function Portfolio() {
    const [portfolioItems, setPortfolioItems] = useState<Portfolio[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    const openLink = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    useEffect(() => {
        // Show loading message only after 300ms delay
        const loadingTimer = setTimeout(() => {
            setShowLoading(true);
        }, 300);

        async function fetchPortfolioData() {
            try {
                const response = await api<ApiResponse<Portfolio>>({
                    path: '/portfolio',
                    method: 'get'
                });

                if (response.status === 'success') {
                    setPortfolioItems(response.data || null);
                }
            } catch (error) {
                console.error('Failed to fetch portfolio:', error);
            } finally {
                setLoading(false);
                clearTimeout(loadingTimer); // Clear the timer
                setShowLoading(false); // Ensure loading message is hidden
            }
        }

        fetchPortfolioData();

        // Cleanup function
        return () => {
            clearTimeout(loadingTimer);
        };
    }, []);

    // Show loading only after delay AND while still loading
    if (loading && showLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;

    // Show error only if not loading AND no items
    if (!loading && !portfolioItems) return <div className="flex justify-center items-center h-64">Failed to load portfolio</div>;

    // Show portfolio items when we have them
    return (
        <div>
            <div className="flex flex-wrap -mx-2">
                {portfolioItems?.map(site => (
                    <div
                        key={`portfolio-${site.id}`}
                        className="w-full md:w-1/2 px-2 mb-4"
                    >
                        <div className="p-2">
                            <div className="bg-gray-800 rounded-lg shadow-lg">
                                <div className="px-4 py-3 border-b border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white text-lg font-semibold">
                                            {site.site_name}
                                        </h3>
                                        <button
                                            onClick={() => openLink(site.url)}
                                            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                                            aria-label="Visit site"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <img
                                        src={site.image}
                                        alt={site.site_name}
                                        className="w-full h-48 object-contain bg-gray-900 rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Portfolio;
