import clsx from "clsx";
import { useEffect, useState } from "react";
import { url } from "../app/api/config";

interface Props {
  src: string | undefined;
  alt: string | undefined;
}

const Image = ({ src, alt }: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setLoading(false);
    }
  }, [src]);

  if (!src)
    return (
      <div className="aspect-video bg-slate-200"/>
    );


  return (
    <>
      <img
        src={`${url}/uploads/${src}`}
        alt={alt}
        onLoad={() => setLoading(false)}
        className={clsx("object-cover aspect-video", {
          "hidden": loading,
        })}
      />

      {loading && <div className="aspect-video animate-pulse bg-slate-200" />}
    </>
  );
};

export default Image;