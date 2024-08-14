import { useEffect, useState } from "react";

function useResponsive() {
  const [devices, setDevices] = useState<{isPhone: boolean }>({
    isPhone: window.innerWidth < 991,
  });

  useEffect(() => {
    const handleResize = () => {
      setDevices({
        isPhone: window.innerWidth < 991,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isPhone : devices.isPhone };
}

export default useResponsive;