import ToolbarComponent from './components/ToolbarComponent';
import HeaderComponent from './components/HeaderComponent';
import HeaderImage from './components/HeaderImage';

const App = () => {
  return (
    <div className="min-h-screen">
        <ToolbarComponent page='home' />
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
                <HeaderComponent />
            </div>

            <div className="hidden md:block md:w-1/2">
                <HeaderImage />
            </div>
            </div>
        </div>
    </div>
  );
};

export default App;
