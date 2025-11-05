import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Dimensions } from "react-native";
import ImageSkeleton from "./ImageSkeleton";

const { width } = Dimensions.get("window");

const UserDetailSkeleton: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header skeleton */}
      <View style={styles.header}>
        <View style={styles.backButtonSkeleton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main photo skeleton */}
        <View style={styles.photoContainer}>
          <ImageSkeleton width={width} height={500} borderRadius={0} />
        </View>

        {/* Basic info section */}
        <View style={styles.section}>
          <View style={styles.nameContainer}>
            {/* Name skeleton */}
            <View style={styles.nameSkeleton} />
            {/* Name reading skeleton */}
            <View style={styles.nameReadingSkeleton} />
          </View>
          <View style={styles.basicInfo}>
            {/* Age skeleton */}
            <View style={styles.infoItemSkeleton}>
              <View style={styles.iconSkeleton} />
              <View style={styles.infoTextSkeleton} />
            </View>
            {/* Location skeleton */}
            <View style={styles.infoItemSkeleton}>
              <View style={styles.iconSkeleton} />
              <View style={styles.infoTextSkeleton} />
            </View>
          </View>
        </View>

        {/* About Me section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleSkeleton} />
          <View style={styles.aboutTextSkeleton1} />
          <View style={styles.aboutTextSkeleton2} />
          <View style={styles.aboutTextSkeleton3} />
        </View>

        {/* Interests section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleSkeleton} />
          <View style={styles.tagsContainer}>
            {Array.from({ length: 6 }).map((_, index) => (
              <View key={index} style={styles.tagSkeleton} />
            ))}
          </View>
        </View>

        {/* Language Skills section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleSkeleton} />
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={styles.languageItemSkeleton}>
              <View style={styles.languageLabelSkeleton} />
              <View style={styles.starsContainerSkeleton} />
              <View style={styles.languageLevelSkeleton} />
            </View>
          ))}
        </View>

        {/* Cultural Preferences section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleSkeleton} />
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={styles.preferenceItemSkeleton}>
              <View style={styles.preferenceLabelSkeleton} />
              <View style={styles.preferenceBarSkeleton}>
                <View style={styles.preferenceBarFillSkeleton} />
              </View>
            </View>
          ))}
        </View>

        {/* Lifestyle section */}
        <View style={styles.section}>
          <View style={styles.sectionTitleSkeleton} />
          <View style={styles.lifestyleGrid}>
            {Array.from({ length: 4 }).map((_, index) => (
              <View key={index} style={styles.lifestyleItemSkeleton}>
                <View style={styles.lifestyleIconSkeleton} />
                <View style={styles.lifestyleLabelSkeleton} />
                <View style={styles.lifestyleValueSkeleton} />
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButtonSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
  },
  photoContainer: {
    width: width,
    height: 500,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  nameContainer: {
    marginBottom: 12,
  },
  nameSkeleton: {
    width: "60%",
    height: 28,
    backgroundColor: "#E8E8E8",
    borderRadius: 6,
    marginBottom: 8,
  },
  nameReadingSkeleton: {
    width: "40%",
    height: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
  },
  basicInfo: {
    gap: 8,
  },
  infoItemSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconSkeleton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E8E8E8",
  },
  infoTextSkeleton: {
    width: 120,
    height: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
  },
  sectionTitleSkeleton: {
    width: "40%",
    height: 20,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    marginBottom: 12,
  },
  aboutTextSkeleton1: {
    width: "100%",
    height: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    marginBottom: 8,
  },
  aboutTextSkeleton2: {
    width: "95%",
    height: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    marginBottom: 8,
  },
  aboutTextSkeleton3: {
    width: "80%",
    height: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagSkeleton: {
    width: 80,
    height: 28,
    backgroundColor: "#E8E8E8",
    borderRadius: 14,
  },
  languageItemSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  languageLabelSkeleton: {
    width: 80,
    height: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
  },
  starsContainerSkeleton: {
    width: 110,
    height: 18,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 12,
  },
  languageLevelSkeleton: {
    width: 60,
    height: 14,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
  },
  preferenceItemSkeleton: {
    marginBottom: 16,
  },
  preferenceLabelSkeleton: {
    width: "50%",
    height: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    marginBottom: 8,
  },
  preferenceBarSkeleton: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  preferenceBarFillSkeleton: {
    height: "100%",
    width: "70%",
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
  },
  lifestyleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  lifestyleItemSkeleton: {
    width: "48%",
    backgroundColor: "#FAFAFA",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  lifestyleIconSkeleton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E8E8E8",
  },
  lifestyleLabelSkeleton: {
    width: 60,
    height: 14,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 4,
  },
  lifestyleValueSkeleton: {
    width: 80,
    height: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
  },
});

export default UserDetailSkeleton;
