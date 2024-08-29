import Image from 'next/image';

const SkeletonCard = () => {
  return (
    <div className="relative flex flex-col cursor-pointer rounded-lg">
      <Image
        src={'/skeletonImage.svg'}
        alt="Loading"
        width='3024'
        height='1644'
        className="w-full h-full object-cover rounded-lg animate-pulse"
      />
      
      <div className="pt-2">
        <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
        <div className="h-6 bg-gray-700 rounded w-3/4 mt-2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
