// components/ToolbarComponent.tsx
import { Link } from 'react-router-dom';
import buttons from '../assets/buttons.json';
import { mdiCog } from '@mdi/js';
import Icon from '@mdi/react';


function ToolbarComponent() {
    return (
        <div className="flex items-center justify-between p-4 bg-white">


            <div className="flex items-center space-x-3">
                {buttons.map((button, index) => (
                    <Link
                        key={index}
                        to={button.path}
                        className="px-3 py-1 text-sm font-medium text-white bg-[#3db6b4] hover:bg-[#35a29f] rounded-md transition-colors"
                    >
                        {button.label}
                    </Link>
                ))}

            </div>

            <div className="flex items-center space-x-3">
                {/* spacer */}
            </div>

            {/* Cog box icon button - matches teal scheme and routes to /admin */}
            <Link
                to="/admin"
                className="p-2 text-[#3db6b4] hover:bg-[#35a29f] rounded-full transition-colors"
            >
                <Icon path={mdiCog} size={1} />
            </Link>

        </div>
    );
}

export default ToolbarComponent;
