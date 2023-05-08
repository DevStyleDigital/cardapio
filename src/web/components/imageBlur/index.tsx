import Image from "next/image";
import { useState } from "react";

const BlurImage = ({ src, width, height, className } : any) =>  {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className={`w-full h-full ${className}`}>
      <div className="h-full w-full overflow-hidde">
        <Image
          alt="banner"
          width={width}
          height={height}
          src={src}
          className={`
                duration-700 w-full h-full ease-in-out group-hover:opacity-75
                ${
                  isLoading
                    ? 'scale-100 blur-sm grayscale'
                    : 'scale-100 blur-0 grayscale-0'
                })`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </div>
  );
}

export default BlurImage