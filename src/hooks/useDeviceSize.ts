import { useLayoutEffect, useState } from "react";


type deviceSize = "" | "sm" | "md" | "lg" | "xl" | "2xl"

const useDeviceSize = (): deviceSize => {
    const [size, setSize] = useState<deviceSize>("");

    useLayoutEffect(() => {
        const updateDeviceSize = () => {
            if (window.innerWidth < 640) {
                setSize("sm")
                return
            }

            if (window.innerWidth < 768) {
                setSize("md")
                return
            }

            if (window.innerWidth < 1024) {
                setSize("lg")
                return
            }

            if (window.innerWidth < 1280) {
                setSize("xl")
                return
            }

            setSize("2xl")
        }

        window.addEventListener('resize', updateDeviceSize)

        updateDeviceSize()

        return () => {
            window.removeEventListener('resize', updateDeviceSize)
        }
    }, []);

    return size;
}

// eslint-disable-next-line
export default useDeviceSize