import { useState } from 'react';

const useToggle = () => {
    const [isActive, setIsActive] = useState(false);

    return { isActive, setIsActive, toggle: () => setIsActive((val) => !val) };
};

export default useToggle;
