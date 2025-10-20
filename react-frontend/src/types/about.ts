// types/about.ts
export interface ColorTheme {
    primary: string;
    secondary: string;
    accent: string;
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string[];
}

export interface TogetherData {
    label: string;
    text: string;
}

export interface AboutData {
    colors: ColorTheme;
    teamMembers: TeamMember[];
    together: TogetherData;
    goal: string;
}

export interface ApiResponse<T> {
    status: 'success' | 'error';
    message?: string;
    data?: T;
}

// Keeping your existing interfaces for backward compatibility
export interface ExpertiseItem {
    icon: string;
    title: string;
    subtitle: string;
}

export interface CareerItem {
    year: string | number;
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
