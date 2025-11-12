import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, GripVertical, X, Save } from 'lucide-react';
import api from '../../assets/call-api';
import type { ApiResponse } from '../../types/portfolio';

interface PortfolioItem {
    id: number;
    site_name: string;
    image: string;
    url: string;
    sort_order: number;
    created_at: string | null;
    updated_at: string | null;
}

function Portfolio() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        site_name: '',
        url: ''
    });

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setShowLoading(true);
        }, 300);

        async function fetchPortfolioData() {
            try {
                const response = await api<ApiResponse<PortfolioItem[]>>({
                    path: '/portfolio',
                    method: 'get'
                });

                if (response.status === 'success' && response.data) {
                    setItems(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch portfolio data:', error);
            } finally {
                setLoading(false);
                clearTimeout(loadingTimer);
                setShowLoading(false);
            }
        }

        fetchPortfolioData();

        return () => {
            clearTimeout(loadingTimer);
        };
    }, []);

    const handleEdit = (item: PortfolioItem) => {
        setEditingId(item.id);
        setFormData({
            site_name: item.site_name,
            url: item.url
        });
    };

    const handleSave = async (id: number) => {
        try {
            await api({
                path: `/portfolio/${id}`,
                method: 'put',
                payload: formData,
                useAuth: true
            });

            setItems(items.map(item =>
                item.id === id
                    ? { ...item, ...formData, updated_at: new Date().toISOString() }
                    : item
            ));
            setEditingId(null);
            setFormData({ site_name: '', url: '' });
        } catch (error) {
            console.error('Failed to update item:', error);
            alert('Failed to update item');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            await api({
                path: `/portfolio/${id}`,
                method: 'delete',
                useAuth: true
            });

            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Failed to delete item:', error);
            alert('Failed to delete item');
        }
    };

    const handleAdd = async () => {
        try {
            const response = await api<ApiResponse<PortfolioItem>>({
                path: '/portfolio',
                method: 'post',
                payload: formData,
                useAuth: true
            });

            if (response.status === 'success' && response.data) {
                setItems([...items, response.data]);
                setShowAddForm(false);
                setFormData({ site_name: '', url: '' });
            }
        } catch (error) {
            console.error('Failed to add item:', error);
            alert('Failed to add item');
        }
    };

    const handleDragStart = (id: number) => {
        setDraggedItem(id);
    };

    const handleDragOver = (e: React.DragEvent, id: number) => {
        e.preventDefault();
        if (draggedItem === null || draggedItem === id) return;

        const draggedIdx = items.findIndex(i => i.id === draggedItem);
        const targetIdx = items.findIndex(i => i.id === id);

        const newItems = [...items];
        const [removed] = newItems.splice(draggedIdx, 1);
        newItems.splice(targetIdx, 0, removed);

        setItems(newItems.map((item, idx) => ({ ...item, sort_order: idx })));
    };

    const handleDragEnd = async () => {
        if (draggedItem === null) return;

        try {
            await api({
                path: '/portfolio/reorder',
                method: 'put',
                payload: {
                    items: items.map(item => ({ id: item.id, sort_order: item.sort_order }))
                },
                useAuth: true
            });
        } catch (error) {
            console.error('Failed to update sort order:', error);
            alert('Failed to update sort order');
        }

        setDraggedItem(null);
    };

    if (loading && showLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (!loading && items.length === 0 && !showAddForm) {
        return <div className="flex justify-center items-center h-64">No portfolio items found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Portfolio Manager</h1>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus size={20} />
                        Add New Item
                    </button>
                </div>

                {showAddForm && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add New Portfolio Item</h2>
                            <button onClick={() => setShowAddForm(false)}>
                                <X size={20} className="text-gray-500 hover:text-gray-700" />
                            </button>
                        </div>
                        <div className="grid gap-4">
                            <input
                                type="text"
                                placeholder="Site Name"
                                value={formData.site_name}
                                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                                type="url"
                                placeholder="URL (https://example.com)"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleAdd}
                                disabled={!formData.site_name || !formData.url}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8"></th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Order</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <tr
                                    key={item.id}
                                    draggable
                                    onDragStart={() => handleDragStart(item.id)}
                                    onDragOver={(e) => handleDragOver(e, item.id)}
                                    onDragEnd={handleDragEnd}
                                    className={`hover:bg-gray-50 transition ${draggedItem === item.id ? 'opacity-50' : ''}`}
                                >
                                    <td className="px-6 py-4">
                                        <GripVertical size={20} className="text-gray-400 cursor-move" />
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === item.id ? (
                                            <input
                                                type="text"
                                                value={formData.site_name}
                                                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <span className="font-medium text-gray-900">{item.site_name}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === item.id ? (
                                            <input
                                                type="url"
                                                value={formData.url}
                                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {item.url}
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 truncate max-w-xs block">{item.image}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-gray-600">{item.sort_order}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {editingId === item.id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleSave(item.id)}
                                                        className="text-green-600 hover:text-green-700"
                                                        title="Save"
                                                    >
                                                        <Save size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(null);
                                                            setFormData({ site_name: '', url: '' });
                                                        }}
                                                        className="text-gray-600 hover:text-gray-700"
                                                        title="Cancel"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="text-blue-600 hover:text-blue-700"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:text-red-700"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
