import { useState, useEffect } from 'react';

// Define a breakpoint for mobile screens
const MOBILE_BREAKPOINT = 768; // Adjust the breakpoint as needed

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check the screen width and update isMobile state
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };

        // Initial check on mount
        handleResize();

        // Add a resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
}

export default useIsMobile;
