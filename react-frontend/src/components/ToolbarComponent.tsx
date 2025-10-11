// components/ToolbarComponent.tsx
import { useLocation, Link } from 'react-router-dom';
import buttons from '../assets/buttons.json';
import { mdiCog } from '@mdi/js';
import Icon from '@mdi/react';

const pathToPageKey: Record<string, keyof typeof buttons> = {
    '/': 'home',
    '/portfolio': 'portfolio',
    '/about-us': 'about'
};

function ToolbarComponent() {
    const location = useLocation();
    const currentPage = pathToPageKey[location.pathname] || 'home';
    const buttonList = buttons[currentPage];

    return (
        <div className="flex items-center justify-between p-4 bg-white">
            <div className="flex items-center space-x-3">
                {/* spacer */}
            </div>

            <div className="flex items-center space-x-3">
                {buttonList.map((button, index) => (
                    <Link
                        key={index}
                        to={button.path}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#3db6b4] hover:bg-[#35a29f] rounded-md transition-colors"
                    >
                        {button.label}
                    </Link>
                ))}

                {/* Cog box icon button - matches teal scheme and routes to /admin */}
                <Link
                    to="/admin"
                    className="p-2 text-white bg-[#3db6b4] hover:bg-[#35a29f] rounded-full transition-colors"
                >
                    <Icon path={mdiCog} size={1} />
                </Link>
            </div>
        </div>
    );
}

export default ToolbarComponent;
