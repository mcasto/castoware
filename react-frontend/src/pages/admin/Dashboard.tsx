import { useEffect, useState } from "react"
import api from '../../assets/call-api'

interface ContactCount {
    new: number;
    total: number;
}

function Admin() {
    const [newContacts, setNewContacts] = useState<number | null>(null)
    const [totalContacts, setTotalContacts] = useState<number | null>(null)
    const [portfolioCount, setPortfolioCount] = useState<number | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const contactCount: ContactCount = await api({ path: '/contacts/count', method: 'get', useAuth: true });
            const portfolioCount: number = await api({ path: '/portfolio/count', method: 'get', useAuth: true });

            setNewContacts(contactCount.new)
            setTotalContacts(contactCount.total)
            setPortfolioCount(portfolioCount)
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* New Contacts Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">{newContacts}</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">New Contacts</div>
                    </div>
                </div>

                {/* Total Contacts Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">{totalContacts}</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Contacts</div>
                    </div>
                </div>

                {/* Portfolio Count Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">{portfolioCount}</div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Portfolio Items</div>
                    </div>
                </div>
            </div>        </>
    )
}

export default Admin
