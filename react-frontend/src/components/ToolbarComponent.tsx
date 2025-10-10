import buttons from '../assets/buttons.json'

type PageKey = keyof typeof buttons;

interface ToolbarProps {
  page: PageKey; // This ensures only valid page keys can be passed
}


function ToolbarComponent ({page}:ToolbarProps) {
const buttonList=buttons[page];

  return (
    <>
    <div className="flex items-center justify-between p-4 bg-white">
    <div>
        {/* spacer */}
    </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-3">
          {buttonList.map((button, index) => (
            <a
              key={index}
              href={button.path}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ToolbarComponent;
