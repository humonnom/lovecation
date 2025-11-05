import * as React from "react"
import {StyleSheet, View} from "react-native"
import Svg, {Path, Text as SvgText} from "react-native-svg"

interface HeartLogoProps {
    size?: number
    color?: string
}

export const HeartLogo = ({ size = 80, color = "#EE9CA7" }: HeartLogoProps) => {
    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size} viewBox="0 0 200 200">
                {/* Heart outline path */}
                <Path
                    d="M100,180 C100,180 20,120 20,80 C20,50 40,30 60,30 C75,30 90,40 100,55 C110,40 125,30 140,30 C160,30 180,50 180,80 C180,120 100,180 100,180 Z"
                    fill={color}
                    opacity={0.1}
                />

                {/* LONG text - top left curve */}
                <SvgText
                    x="45"
                    y="75"
                    fontSize="32"
                    fontWeight="900"
                    fill={color}
                    textAnchor="middle"
                    transform="rotate(-15 45 75)"
                >
                    LONG
                </SvgText>

                {/* VACA text - bottom */}
                <SvgText x="100" y="140" fontSize="32" fontWeight="900" fill={color} textAnchor="middle">
                    VACA
                </SvgText>

                {/* TION text - right side */}
                <SvgText
                    x="155"
                    y="75"
                    fontSize="32"
                    fontWeight="900"
                    fill={color}
                    textAnchor="middle"
                    transform="rotate(15 155 75)"
                >
                    TION
                </SvgText>
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
})
