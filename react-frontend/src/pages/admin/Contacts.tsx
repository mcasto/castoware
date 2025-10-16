import React, { useEffect, useState } from "react"
import api from "../../assets/call-api";

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

interface ApiResponse {
    status: 'success' | 'error';
    message?: string;
    data: {
        contacts: Contact[];
        last_viewed: string;
    };
}

function Contacts() {
    const [contacts, setContacts] = useState<Contact[] | null>(null);
    const [lastViewed, setLastViewed] = useState<string | null>(null);
    const [expandedContact, setExpandedContact] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await api<ApiResponse>({
                    path: '/contacts',
                    method: 'get',
                    useAuth: true
                });

                if (response.status === 'success') {
                    setContacts(response.data.contacts || null);
                    setLastViewed(response.data.last_viewed || null);

                    await api({
                        path: '/update-last-viewed',
                        method: 'put',
                        useAuth: true
                    });
                }
            } catch (error) {
                console.error('Failed to fetch contacts:', error);
            }
        })();
    }, []);

    const isNewContact = (contact: Contact) => {
        if (!lastViewed) return false;
        return new Date(contact.created_at) > new Date(lastViewed);
    };

    const toggleExpand = (contactId: number) => {
        setExpandedContact(expandedContact === contactId ? null : contactId);
    };

    const deleteContact = async (contactId: number) => {
        if (!confirm('Are you sure you want to delete this contact message?')) {
            return;
        }

        setDeletingId(contactId);
        try {
            const response = await api<ApiResponse>({
                path: `/contacts/${contactId}`,
                method: 'delete',
                useAuth: true
            });

            if (response.status === 'success') {
                setContacts(prev => prev?.filter(contact => contact.id !== contactId) || null);
            }
        } catch (error) {
            console.error('Failed to delete contact:', error);
            alert('Failed to delete contact message');
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Contacts</h1>

            {lastViewed && (
                <div className="text-sm text-gray-500 mb-6">
                    Last viewed: {formatDate(lastViewed)}
                </div>
            )}

            {contacts && contacts.length > 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {contacts.map(contact => (
                                <React.Fragment key={contact.id}>
                                    <tr
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => toggleExpand(contact.id)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {isNewContact(contact) && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    New
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {contact.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <a
                                                href={`mailto:${contact.email}`}
                                                className="text-blue-600 hover:text-blue-900"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {contact.email}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                            {contact.subject}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(contact.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteContact(contact.id);
                                                }}
                                                disabled={deletingId === contact.id}
                                                className="text-red-600 hover:text-red-900 disabled:text-red-300 disabled:cursor-not-allowed"
                                            >
                                                {deletingId === contact.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedContact === contact.id && (
                                        <tr className="bg-gray-50">
                                            <td colSpan={6} className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    <strong className="block mb-2">Message:</strong>
                                                    <p className="whitespace-pre-wrap">{contact.message}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No contacts found</p>
            )}
        </div>
    )
}

export default Contacts
