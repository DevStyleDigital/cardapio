const Loading = () => {
  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center z-[9999]">
      <span className="w-[100px] h-[100px] border-2 border-t-red-600 border-black rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
