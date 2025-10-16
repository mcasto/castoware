// stores/AdminStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Contact {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
}

interface PortfolioItem {
    id: string;
    site_name: string;
    image: string;
    url: string;
    sort_order: number;
}

// Updated to match your JSON structure
interface AboutPerson {
    name: string;
    icon: string;
    role: string;
    theme: string;
    expertise: {
        label: string;
        items: Array<{
            icon: string;
            title: string;
            subtitle: string;
        }>;
    };
    career?: {
        label: string;
        items: Array<{
            year: string | number;
            caption: string;
        }>;
    };
}

interface AdminState {
    // State
    lastViewedContact: Date | null;  // track this by user in backend
    contacts: Contact[];
    portfolioItems: PortfolioItem[];
    aboutData: AboutPerson[]; // Changed from aboutContent to aboutData
    isLoading: boolean;
    error: string | null;

    // Actions
    setLastViewedContact: (date: Date) => void;
    setContacts: (contacts: Contact[]) => void;
    setPortfolioItems: (items: PortfolioItem[]) => void;
    setAboutData: (data: AboutPerson[]) => void; // Updated setter
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    // Contact Actions
    updateContact: (id: string, updates: Partial<Contact>) => Promise<void>;
    deleteContact: (id: string) => Promise<void>;

    // Portfolio Actions
    createPortfolio: (item: Omit<PortfolioItem, 'id'>) => Promise<void>;
    updatePortfolio: (id: string, updates: Partial<PortfolioItem>) => Promise<void>;
    deletePortfolio: (id: string) => Promise<void>;

    // About Actions - Updated for JSON file operations
    updateAboutPerson: (index: number, updates: Partial<AboutPerson>) => Promise<void>;
    addAboutPerson: (person: AboutPerson) => Promise<void>;
    deleteAboutPerson: (index: number) => Promise<void>;
    reorderAboutPeople: (fromIndex: number, toIndex: number) => Promise<void>;

    // Utility getters
    getContacts: () => [];
    getPortfolioItems: () => [];
    getAboutData: () => object;
    getNewContactsCount: () => number;
    getContactById: (id: string) => Contact | undefined;
    getPortfolioItemById: (id: string) => PortfolioItem | undefined;
    getAboutPerson: (index: number) => AboutPerson | undefined;
}

export const useAdminStore = create<AdminState>()(
    persist(
        (set, get) => ({
            // Initial state
            lastViewedContact: null,
            contacts: [],
            portfolioItems: [],
            aboutData: [], // Initialize empty, will be loaded from JSON
            isLoading: false,
            error: null,

            getContacts: () => {
                return [];
            },

            getPortfolioItems: () => {
                return [];
            },

            getAboutData: () => {
                return {}
            },

            // Basic state setters
            setLastViewedContact: () => set({ lastViewedContact: null }),
            setContacts: (contacts: Contact[]) => set({ contacts }),
            setPortfolioItems: (portfolioItems: PortfolioItem[]) => set({ portfolioItems }),
            setAboutData: (aboutData: AboutPerson[]) => set({ aboutData }),
            setLoading: (isLoading: boolean) => set({ isLoading }),
            setError: (error: string | null) => set({ error }),

            // Contact actions (placeholder implementations)
            updateContact: async (id: string, updates: Partial<Contact>): Promise<void> => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual API call
                    console.log('Updating contact:', id, updates);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { contacts } = get();
                    const updatedContacts = contacts.map(contact =>
                        contact.id === id ? { ...contact, ...updates } : contact
                    );
                    set({ contacts: updatedContacts });
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Failed to update contact' });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            deleteContact: async (id: string): Promise<void> => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual API call
                    console.log('Deleting contact:', id);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { contacts } = get();
                    const filteredContacts = contacts.filter(contact => contact.id !== id);
                    set({ contacts: filteredContacts });
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Failed to delete contact' });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            // Portfolio actions (placeholder implementations)
            createPortfolio: async (item: Omit<PortfolioItem, 'id'>): Promise<void> => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual API call
                    console.log('Creating portfolio item:', item);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const newItem: PortfolioItem = {
                        ...item,
                        id: Date.now().toString(),
                    };

                    const { portfolioItems } = get();
                    set({ portfolioItems: [...portfolioItems, newItem] });
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Failed to create portfolio item' });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            updatePortfolio: async (id: string, updates: Partial<PortfolioItem>): Promise<void> => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual API call
                    console.log('Updating portfolio item:', id, updates);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { portfolioItems } = get();
                    const updatedItems = portfolioItems.map(item =>
                        item.id === id ? { ...item, ...updates } : item
                    );
                    set({ portfolioItems: updatedItems });
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Failed to update portfolio item' });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            deletePortfolio: async (id: string): Promise<void> => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual API call
                    console.log('Deleting portfolio item:', id);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { portfolioItems } = get();
                    const filteredItems = portfolioItems.filter(item => item.id !== id);
                    set({ portfolioItems: filteredItems });
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Failed to delete portfolio item' });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            // About actions - Updated for JSON array operations
            updateAboutPerson: async (index: number, updates: Partial<AboutPerson>): Promise<void> => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual file write operation
                    console.log('Updating about person at index:', index, updates);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { aboutData } = get();
                    if (index < 0 || index >= aboutData.length) {
                        throw new Error('Invalid index');
                    }

                    const updatedData = [...aboutData];
                    updatedData[index] = { ...updatedData[index], ...updates };
                    set({ aboutData: updatedData });
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Failed to update about person' });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            addAboutPerson: async (person: AboutPerson): Promise<void> => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual file write operation
                    console.log('Adding about person:', person);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { aboutData } = get();
                    set({ aboutData: [...aboutData, person] });
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Failed to add about person' });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            deleteAboutPerson: async (index: number): Promise<void> => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual file write operation
                    console.log('Deleting about person at index:', index);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { aboutData } = get();
                    if (index < 0 || index >= aboutData.length) {
                        throw new Error('Invalid index');
                    }

                    const updatedData = aboutData.filter((_, i) => i !== index);
                    set({ aboutData: updatedData });
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Failed to delete about person' });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            reorderAboutPeople: async (fromIndex: number, toIndex: number): Promise<void> => {
                set({ isLoading: true, error: null });
                try {
                    // TODO: Replace with actual file write operation
                    console.log('Reordering about people:', fromIndex, '→', toIndex);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const { aboutData } = get();
                    const updatedData = [...aboutData];
                    const [movedItem] = updatedData.splice(fromIndex, 1);
                    updatedData.splice(toIndex, 0, movedItem);
                    set({ aboutData: updatedData });
                } catch (error) {
                    set({ error: error instanceof Error ? error.message : 'Failed to reorder about people' });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            // Utility getters
            getNewContactsCount: (): number => {
                const { lastViewedContact, contacts } = get();
                if (!lastViewedContact) return contacts.length;

                return contacts.filter(contact =>
                    new Date(contact.createdAt) > lastViewedContact
                ).length;
            },

            getContactById: (id: string): Contact | undefined => {
                const { contacts } = get();
                return contacts.find(contact => contact.id === id);
            },

            getPortfolioItemById: (id: string): PortfolioItem | undefined => {
                const { portfolioItems } = get();
                return portfolioItems.find(item => item.id === id);
            },

            getAboutPerson: (index: number): AboutPerson | undefined => {
                const { aboutData } = get();
                return aboutData[index];
            },
        }),
        {
            name: 'cw-admin-storage',
            partialize: (state) => ({
                lastViewedContact: state.lastViewedContact,
            }),
        }
    )
);

// Export types for use in components
export type { Contact, PortfolioItem, AboutPerson };
