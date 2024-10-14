type SkeletonLoaderProps = {
  groups?: number;
  groupItems?: number;
};

export const SkeletonLoader = (
  { groups = 2, groupItems = 4 }: SkeletonLoaderProps,
) => {
  return (
    <>
      {Array.from({ length: groups }).map((_, groupIndex) => (
        <div key={groupIndex} className="animate-pulse">
          {Array.from({ length: groupItems }).map((_, itemIndex) => (
            <div key={itemIndex} className="h-4 bg-gray-200 rounded w-1/2 mb-2">
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
