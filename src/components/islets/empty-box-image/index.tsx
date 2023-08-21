import Image from "next/image";
interface EmptyBoxProps {
  src: string;
  text: string;
  alt: string;
}

export const EmptyBox = ({ src, text, alt }: EmptyBoxProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-8">
      <Image
        width={300}
        height={300}
        className="grayscale"
        src={src}
        alt={alt}
      />
      <p className="text-gray-400">{text}</p>
    </div>
  );
};
