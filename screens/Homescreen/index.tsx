import * as React from "react";
import { View } from "react-native";
import { Header } from "../../components/Header";
import { UserGrid } from "./UserGrid";
import { mockProfiles } from "../../data";

export const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      <Header
        title='새로운 인연 찾기'
        subtitle='하트를 눌러 관심을 표현해보세요.'
      />
      <UserGrid users={mockProfiles} />
    </View>
  );
};
