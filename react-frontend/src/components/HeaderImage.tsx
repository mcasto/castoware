const HeaderImage = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full border-2 border-green-500">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">Block 2</h2>
        <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">
          DESKTOP ONLY
        </span>
      </div>
      <p className="text-gray-600 mb-4">This block is only visible on medium screens and larger (768px+).</p>
      <div className="bg-green-50 p-3 rounded border border-green-200">
        <p className="text-sm text-green-800 font-medium">
          Layout Behavior:
        </p>
        <ul className="text-sm text-green-700 mt-1 list-disc list-inside">
          <li>Mobile: Hidden</li>
          <li>Desktop: Half width (50%) - side by side with Block 1</li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderImage;
