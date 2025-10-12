// components/Icon.tsx - Search Version
import type { IconType } from 'react-icons';
import * as MdIcons from 'react-icons/md';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import * as FcIcons from 'react-icons/fc';

interface IconProps {
    name: string;
    size?: number;
    className?: string;
}

const allIcons = {
    ...MdIcons,
    ...FiIcons,
    ...FaIcons,
    ...FcIcons,
};

const Icon = ({ name, size = 24, className = '' }: IconProps) => {
    // Try exact match first
    let IconComponent = allIcons[name as keyof typeof allIcons] as IconType;

    if (IconComponent) {
        return <IconComponent size={size} className={className} />;
    }

    // Search for icons containing the keyword
    const searchTerm = name.toLowerCase().replace('fc', '').replace('md', '').replace('fa', '').replace('fi', '');
    const matchingIcons = Object.keys(allIcons).filter(iconName =>
        iconName.toLowerCase().includes(searchTerm)
    );

    if (matchingIcons.length > 0) {
        // Use the first matching icon
        const matchedIcon = matchingIcons[0];
        IconComponent = allIcons[matchedIcon as keyof typeof allIcons] as IconType;
        return <IconComponent size={size} className={className} />;
    }

    console.warn(`No icons found for: ${name}`);
    return <span className={className}>❓</span>;
};

export default Icon;
