// components/AboutCard.tsx
import { useMediaQuery } from 'react-responsive';
import type { AboutInfo } from '../types/about';
import Icon from './Icon'

interface AboutCardProps {
    info: AboutInfo;
}

const AboutCard = ({ info }: AboutCardProps) => {
    const isMediumOrLarger = useMediaQuery({ minWidth: 768 });

    const getThemeColor = (type: 'bg' | 'text') => {
        return `${type}-[${info.theme}]`;
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-sm">
            <div className="p-0">
                <div
                    className={`flex items-center p-4 text-white ${getThemeColor('bg')}`} style={{ backgroundColor: info.theme }}
                >
                    {isMediumOrLarger && (
                        <div className="w-20 h-20 mr-4 flex items-center justify-center rounded-full bg-white/20">
                            {/* Use Icon component for the main avatar icon */}
                            <Icon name={info.icon} size={40} className="text-4xl" />
                        </div>
                    )}
                    <div>
                        <div className="text-3xl font-bold">{info.name}</div>
                        <div className="text-xl">{info.role}</div>
                    </div>

                </div>
            </div>

            <div className="pt-12 px-6">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-6/12 px-4 mb-6">
                        <div className={`text-xl font-semibold mb-4`} style={{ color: info.theme }}>
                            {info.expertise.label}
                        </div>
                        <div className="border rounded-lg divide-y">
                            {info.expertise.items.map((item, idx) => (
                                <div
                                    key={`expertise-${idx}`}
                                    className="flex items-center p-4"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center mr-4">
                                        {/* Use Icon component for expertise items */}
                                        <Icon
                                            name={item.icon}
                                            size={24}
                                            style={{ color: info.theme }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{item.title}</div>
                                        <div className="text-sm text-gray-500">{item.subtitle}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {info.career && (
                        <div className="w-full md:w-6/12 px-4 mb-6">
                            <div className={`text-xl font-semibold mb-4`} style={{ color: info.theme }}>
                                {info.career.label}
                            </div>

                            <div className="pl-4">
                                {info.career.items.map((item, idx) => (
                                    <div key={`career-${idx}`} className="mb-6">
                                        <div className="font-bold text-base">{String(item.year)}</div>
                                        <div className="text-sm text-gray-600">{item.caption}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutCard;
