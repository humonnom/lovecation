import * as React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Header } from "../../components/Header";
import { UserGrid } from "./UserGrid";
import { useProfiles } from "../../hooks/queries";
import { useAuth } from "../../contexts/AuthContext";
import Locale from "../../components/Locale";

export const HomeScreen = () => {
  const { t } = useTranslation();
  const { session, user } = useAuth();
  const isLoggedIn = !!session;
  
  // 로그인한 경우: 반대 성별, 비로그인: 모든 성별
  const getGenderFilter = () => {
    if (!isLoggedIn || !user?.user_metadata?.gender) {
      return null; // 모든 성별
    }
    // 반대 성별 반환
    return user.user_metadata.gender === 'male' ? 'female' : 'male';
  };
  
  const { profiles, loading, error } = useProfiles({ gender: getGenderFilter() });

  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          title={t('home.title')}
          subtitle={t('home.subtitle')}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EE9CA7" />
          <Text style={styles.loadingText}>{t('home.loadingProfiles')}</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header
          title={t('home.title')}
          subtitle={t('home.subtitle')}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t('home.errorLoadingProfiles')}</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={t('home.title')}
        subtitle={t('home.subtitle')}
      />
      <UserGrid users={profiles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500"
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 8
  },
  errorText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    textAlign: "center"
  },
  errorMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center"
  }
});
