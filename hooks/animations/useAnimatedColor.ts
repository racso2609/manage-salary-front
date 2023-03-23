import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface propsType {
    deps?: any;
    colorConfig: {
        inputRange: number[];
        outputRange: string[];
    };
    handleAnimation: (animation: any) => void;
}

const useAnimatedColor = ({
    deps,
    colorConfig,
    handleAnimation,
}: propsType) => {
    const animation = useRef(new Animated.Value(0)).current;
    const colorAnimation = animation.interpolate(colorConfig);

    useEffect(() => {
        handleAnimation(animation);
    }, [animation, deps]);

    return { animation, colorAnimation };
};

export default useAnimatedColor;
