import useZoom from "@/hook/useZoom.hook";
import { ImgHTMLAttributes, useEffect, useRef } from "react";

export default function ZoomableImage(
    props: ImgHTMLAttributes<HTMLImageElement>
) {
    const { attach, detach } = useZoom();
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const { current: image } = imageRef;
        attach(image);
        return () => {
            detach(image);
        };
    }, []);

    return <img {...props} ref={imageRef} />;
}