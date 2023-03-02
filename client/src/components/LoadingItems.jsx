export const LoadingCard = () => {
  return (
    <div className="w-full rounded overflow-hidden shadow-md flex p-3 bg-secondary">
      <div className="min-w-[80px] max-w-[80px] min-h-[112px] max-h-[112px] bg-gray-300 animate-pulse"></div>
      <div className="flex flex-col ml-2">
        <div className="flex flex-col">
          <div className="mt-1 bg-gray-300 h-6 w-44  animate-pulse"></div>
          <span className="mt-1 h-4 w-20 bg-gray-300 animate-pulse"></span>
        </div>
        <div className="bg-gray-300 animate-pulse mt-1 leading-5 h-[60px] w-[260px]"></div>
      </div>
    </div>
  );
};

// export const LoadingPosts = () => {
//   const loadPages = [1, 2, 3, 4, 5, 6];
//   return (
//     <div className="grid grid-cols-3 gap-4 content-start">
//       {loadPages.map((num) => {
//         return <LoadingCard />;
//       })}
//     </div>
//   );
// };

export const loadingCards = (NUN_PAGES) => {
  const loadingPages = NUN_PAGES;
  return (
    <div className="grid grid-cols-3 gap-4 content-start">
      {loadingPages.map((num) => {
        return <LoadingCard />;
      })}
    </div>
  );
};
