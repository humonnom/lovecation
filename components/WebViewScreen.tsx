import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';
import type { WebViewNavigation } from 'react-native-webview';

const WEB_URL = 'https://lovecation-web.vercel.app/';

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

  const handleGoBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const handleGoForward = () => {
    if (canGoForward && webViewRef.current) {
      webViewRef.current.goForward();
    }
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

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={64} color="#EE9CA7" />
          <Text style={styles.errorTitle}>페이지를 불러올 수 없습니다</Text>
          <Text style={styles.errorMessage}>
            인터넷 연결을 확인하고 다시 시도해주세요.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EE9CA7" />
        </View>
      )}

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_URL }}
        style={styles.webView}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onHttpError={handleError}
        // WebView settings
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        // Cache settings
        cacheEnabled={true}
        cacheMode="LOAD_DEFAULT"
        // Pull to refresh
        pullToRefreshEnabled={true}
        // User agent - mobile optimized
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
        // Allow file access
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        // Media settings
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        // iOS specific
        allowsBackForwardNavigationGestures={true}
        // Android specific
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
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
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
