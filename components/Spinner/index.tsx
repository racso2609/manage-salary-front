import { FC, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import useAnimatedColor from '../../hooks/animations/useAnimatedColor';
import useColor from '../../hooks/useColors';

interface SpinnerProps {
    color: string;
}

const SpinnerContainer = styled.View`
    width: 20px;
    height: 20px;
`;

const SpinnerCircle = styled.View<Partial<SpinnerProps>>`
    width: 100%;
    height: 100%;

    border-radius: 20px;
`;

const Spinner: FC = () => {
    const { colors } = useColor();
    const { colorAnimation: backgroundColorAnimated } = useAnimatedColor({
        colorConfig: {
            inputRange: [0, 100],
            outputRange: [colors.hover, colors.ph],
        },
        handleAnimation: (animation: any) => {
            const duration = 2000;
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animation, {
                        toValue: 100,
                        duration,
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration,
                    }),
                ])
            ).start();
        },
    });

    return (
        <SpinnerContainer>
            <Animated.View
                style={{
                    backgroundColor: backgroundColorAnimated,
                    borderRadius: 20,
                    width: '100%',
                    height: '100%',
                }}
            ></Animated.View>
        </SpinnerContainer>
    );
};

export default Spinner;
