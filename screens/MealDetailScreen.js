import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function MealDetailScreen({ route }) {
    const {mealName} = route.params;

    const mealMenus = {
        Breakfast: ['Idli', 'Poha', 'Paratha'],
        Lunch: ['Rice', 'Dal', 'Paneer Curry'],
        Snacks: ['Samosa', 'Tea', 'Biscuits'],
      };

      const today = new Date().getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
      const isNonVegDay = today === 3 || today === 5;

      const menuItems = mealMenus[mealName] || [];

      if (isNonVegDay && (mealName === 'Lunch' || mealName === 'Snacks')) {
            menuItems = [...menuItems, 'Chicken Curry'];
          }

          return (
            <View style={styles.container}>
              <Text style={styles.title}>{mealName} Menu</Text>
              {menuItems.map((item, index) => (
                <Text key={index} style={styles.menuItem}>{`\u2022 ${item}`}</Text>
              ))}
              {isNonVegDay && (mealName === 'Lunch' || mealName === 'Snacks') && (
                <Text style={styles.note}>* Non-veg items are shown only on Wednesday and Friday</Text>
              )}
            </View>
          );
        }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'light green',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'dark green',
        marginBottom: 30,
    },
    subTitle: {
        fontSize: 18,
        color: 'green',
    },
    menuItem: {
        fontSize: 18,
        marginVertical: 5,
        color: 'green',
      },
      note: {
        marginTop: 20,
        fontSize: 14,
        color: 'dark green',
        fontStyle: 'italic',
      },
});