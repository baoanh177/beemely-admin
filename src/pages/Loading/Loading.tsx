const Loading = () => {
  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-white">
      <div className="text-gray-700 display-s-regular flex items-center justify-center gap-2 space-x-1">
        <div className="h-8 w-8 animate-spin rounded-circle border-2 border-gray-200 border-t-primary-500"></div>
        <div className="tracking-widest">Loading ...</div>
      </div>
    </div>
  );
};

export default Loading;
