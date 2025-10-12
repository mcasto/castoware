// types/about.ts
export interface ExpertiseItem {
    icon: string;
    title: string;
    subtitle: string;
}

export interface CareerItem {
    year: string | number;  // Allow both string and number
    caption: string;
}

export interface AboutInfo {
    name: string;
    icon: string;
    role: string;
    theme: string;
    expertise: {
        label: string;
        items: ExpertiseItem[];
    };
    career?: {
        label: string;
        items: CareerItem[];
    };
}

export interface ApiResponse<T> {
    status: 'success' | 'error';
    message?: string;
    data?: T[];
}
