// WebViewScreen.tsx
import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, SafeAreaView, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';
import type { WebViewNavigation } from 'react-native-webview';
import * as Localization from 'expo-localization';
import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';
import { LOCALES } from '../i18n/constants';

const BASE_URL = 'https://lovecation-web.vercel.app';

const getInitialUrl = (): string => {
    const deviceLanguage = Localization.getLocales()[0]?.languageCode || LOCALES.KO;
    const locale = deviceLanguage === LOCALES.JA ? LOCALES.JA : LOCALES.KO;
    return `${BASE_URL}/${locale}`;
};

const WEB_URL = getInitialUrl();

// 내부 호스트만 WebView에서 허용
const isSameHost = (url: string) => {
    try {
        const u = new URL(url);
        const base = new URL(BASE_URL);
        return u.hostname === base.hostname;
    } catch {
        return false;
    }
};

// 외부 열기: iOS는 SFSafariViewController, Android는 Linking.openURL
const openExternal = async (url: string) => {
    try {
        // 스킴은 http/https만 허용(간소화)
        const scheme = url.split(':')[0].toLowerCase();
        if (scheme !== 'http' && scheme !== 'https') {
            Alert.alert('지원하지 않는 링크입니다', url);
            return false;
        }

        if (Platform.OS === 'ios') {
            await WebBrowser.openBrowserAsync(url, {
                enableBarCollapsing: true,
                dismissButtonStyle: 'done',
            });
            return true;
        }

        // Android
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
            return true;
        }

        Alert.alert('링크를 열 수 없습니다', url);
        return false;
    } catch {
        Alert.alert('오류가 발생했습니다', url);
        return false;
    }
};

export const WebViewScreen = () => {
    const webViewRef = useRef<WebView>(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(WEB_URL);

    const handleNavigationStateChange = (navState: WebViewNavigation) => {
        setCanGoBack(navState.canGoBack);
        setCanGoForward(navState.canGoForward);
        setCurrentUrl(navState.url);
    };

    const handleRefresh = () => {
        if (webViewRef.current) {
            setError(false);
            webViewRef.current.reload();
        }
    };

    const handleLoadStart = () => {
        setLoading(true);
        setError(false);
    };

    const handleLoadEnd = () => {
        setLoading(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#EE9CA7" />
                </View>
            )}

            <WebView
                ref={webViewRef}
                source={{ uri: WEB_URL }}
                style={styles.webView}
                onNavigationStateChange={handleNavigationStateChange}
                onLoadStart={handleLoadStart}
                onLoadEnd={handleLoadEnd}
                onError={handleError}
                onHttpError={handleError}

                // 새창(window.open/target=_blank) 이벤트 수신
                setSupportMultipleWindows={true}
                onOpenWindow={(event) => {
                    const url = event.nativeEvent.targetUrl;
                    if (!isSameHost(url)) {
                        // 취소→외부 열기 타이밍 레이스 완화
                        setTimeout(() => { openExternal(url); }, 80);
                    }
                }}

                // 내부 호스트만 WebView에서 열고, 외부 링크는 클릭 시 외부로
                onShouldStartLoadWithRequest={(req) => {
                    const { url, navigationType } = req;

                    if (isSameHost(url)) return true;

                    const isUserGesture = navigationType === 'click';
                    if (isUserGesture) {
                        setTimeout(() => { openExternal(url); }, 80);
                        return false;
                    }

                    // 자동 리다이렉트는 허용
                    return true;
                }}

                // 불필요한 injectedJavaScript 제거(브리지/보안 속성 강제 필요 없으면 생략)
                injectedJavaScript={'true;'}

                // WebView settings
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={false}
                scalesPageToFit={true}
                cacheEnabled={true}
                cacheMode="LOAD_DEFAULT"
                pullToRefreshEnabled={true}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                allowsBackForwardNavigationGestures={true}
                mixedContentMode="always"
                thirdPartyCookiesEnabled={true}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
    },
    navigationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    navButton: {
        padding: 8,
    },
    urlContainer: {
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
    },
    urlText: {
        fontSize: 12,
        color: '#666',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    webView: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    errorMessage: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    retryButton: {
        backgroundColor: '#EE9CA7',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
