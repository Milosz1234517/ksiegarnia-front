import {useLayoutEffect, useState} from "react";
import detectZoom from 'detect-zoom';

export const useWindowResize = () => {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth * (detectZoom.device()/2), window.innerHeight * (detectZoom.device()/2)]);
        }

        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
};