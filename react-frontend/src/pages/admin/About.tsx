// pages/admin/About.tsx
import { useState, useEffect } from 'react';
import api from '../../assets/call-api';
import type { AboutData, ApiResponse } from '../../types/about';

interface TeamMember {
    name: string;
    role: string;
    bio: string[];
}

function About() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Form state
    const [colors, setColors] = useState({ primary: '', secondary: '', accent: '' });
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [together, setTogether] = useState({ label: '', text: '' });
    const [goal, setGoal] = useState('');

    useEffect(() => {
        async function fetchAboutData() {
            try {
                const response = await api<ApiResponse<AboutData>>({
                    path: '/about-us',
                    method: 'get'
                });

                if (response.status === 'success' && response.data) {
                    // Initialize form state
                    setColors(response.data.colors);
                    setTeamMembers(response.data.teamMembers);
                    setTogether(response.data.together);
                    setGoal(response.data.goal);
                }
            } catch (error) {
                console.error('Failed to fetch about data:', error);
                setMessage({ type: 'error', text: 'Failed to load about data' });
            } finally {
                setLoading(false);
            }
        }

        fetchAboutData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            const response = await api<{ status: string; message?: string }>({
                path: '/about-us',
                method: 'put',
                payload: {
                    colors,
                    teamMembers,
                    together,
                    goal
                },
                useAuth: true
            });

            if (response.status === 'success') {
                setMessage({ type: 'success', text: 'About page updated successfully!' });
            } else {
                setMessage({ type: 'error', text: response.message || 'Failed to update' });
            }
        } catch (error) {
            console.error('Failed to update about data:', error);
            setMessage({ type: 'error', text: 'Failed to update about page' });
        } finally {
            setSaving(false);
        }
    };

    const updateTeamMember = (index: number, field: keyof TeamMember, value: string | string[]) => {
        const updated = [...teamMembers];
        updated[index] = { ...updated[index], [field]: value };
        setTeamMembers(updated);
    };

    const updateBioParagraph = (memberIndex: number, paraIndex: number, value: string) => {
        const updated = [...teamMembers];
        updated[memberIndex].bio[paraIndex] = value;
        setTeamMembers(updated);
    };

    const addBioParagraph = (memberIndex: number) => {
        const updated = [...teamMembers];
        updated[memberIndex].bio.push('');
        setTeamMembers(updated);
    };

    const removeBioParagraph = (memberIndex: number, paraIndex: number) => {
        const updated = [...teamMembers];
        updated[memberIndex].bio.splice(paraIndex, 1);
        setTeamMembers(updated);
    };

    if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage About Us</h1>

                {message && (
                    <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow">
                    {/* Colors Section */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4">Brand Colors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                                <input
                                    type="text"
                                    value={colors.primary}
                                    onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="#000000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                                <input
                                    type="text"
                                    value={colors.secondary}
                                    onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="#666666"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                                <input
                                    type="text"
                                    value={colors.accent}
                                    onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="#ff0000"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Team Members Section */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
                        {teamMembers.map((member, memberIndex) => (
                            <div key={memberIndex} className="mb-6 p-4 bg-gray-50 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={(e) => updateTeamMember(memberIndex, 'name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                        <input
                                            type="text"
                                            value={member.role}
                                            onChange={(e) => updateTeamMember(memberIndex, 'role', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio Paragraphs</label>
                                    {member.bio.map((paragraph, paraIndex) => (
                                        <div key={paraIndex} className="mb-3 flex gap-2">
                                            <textarea
                                                value={paragraph}
                                                onChange={(e) => updateBioParagraph(memberIndex, paraIndex, e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows={3}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeBioParagraph(memberIndex, paraIndex)}
                                                className="px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addBioParagraph(memberIndex)}
                                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                                    >
                                        Add Paragraph
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Together Section */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4">Together Section</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                                <input
                                    type="text"
                                    value={together.label}
                                    onChange={(e) => setTogether({ ...together, label: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
                                <textarea
                                    value={together.text}
                                    onChange={(e) => setTogether({ ...together, text: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Goal Section */}
                    <div className="pb-6">
                        <h2 className="text-xl font-semibold mb-4">Goal Statement</h2>
                        <textarea
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default About;
