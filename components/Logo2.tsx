import * as React from "react";
import {StyleSheet, View} from "react-native"
import {MaterialIcons} from "@expo/vector-icons";

interface MapHeartIconProps {
    size?: number
    pinColor?: string
    heartColor?: string
}

export const MapHeartIcon = ({ size = 48, pinColor = "#EE9CA7", heartColor = "#FFFFFF" }: MapHeartIconProps) => {
    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {/* 지도 핀 아이콘 */}
            <MaterialIcons name="place" size={size} color={pinColor} style={styles.pinIcon} />

            {/* 거꾸로 된 하트 아이콘 */}
            <View
                style={[
                    styles.heartContainer,
                    {
                        top: size * 0.2,
                    },
                ]}
            >
                <MaterialIcons name="favorite" size={size * 0.4} color={heartColor} style={styles.heartIcon} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    pinIcon: {
        position: "absolute",
    },
    heartContainer: {
        position: "absolute",
        // transform: [{ rotate: "180deg" }],
    },
    heartIcon: {
        // 하트 아이콘 추가 스타일
    },
})
