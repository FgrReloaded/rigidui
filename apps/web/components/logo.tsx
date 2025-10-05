

const RigidLogo = () => {
  return (
    <div className="flex gap-1 overflow-hidden h-8">
      <div className="flex flex-col gap-1 pt-1">
        <div className="w-3 h-3 bg-gray-800 dark:bg-gray-300 rounded-xs" />
        <div className="w-3 h-6 bg-gray-800 dark:bg-gray-300 rounded-xs" />
      </div>
      <div className="flex flex-col gap-1 pb-1">
        <div className="w-3 h-6 bg-gray-800 dark:bg-gray-300 rounded-xs" />
        <div className="w-3 h-3 bg-gray-800 dark:bg-gray-300 rounded-xs" />
      </div>
    </div>
  );
};

export default RigidLogo;
