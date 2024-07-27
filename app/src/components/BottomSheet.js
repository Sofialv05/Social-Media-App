import { View, Text } from "react-native";
import React, { useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

const Sheet = () => {
  const snapPoints = useMemo(() => ["50%", "95"]);
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <BottomSheet snapPoints={snapPoints} index={0}>
        <Text>test</Text>
      </BottomSheet>
    </View>
  );
};

export default Sheet;
