import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const colorMap = {
  blue: ['#eff6ff', '#2563eb'],
  red: ['#fef2f2', '#dc2626'],
  green: ['#ecfdf5', '#059669'],
  purple: ['#f5f3ff', '#7c3aed'],
  orange: ['#fff7ed', '#ea580c'],
  yellow: ['#fefce8', '#ca8a04'],
};

const VitalsCard = ({ title, value, unit, icon: Icon, color = 'blue' }) => {
  const [bgColor, iconColor] = colorMap[color] || colorMap.blue;

  return (
    <View style={styles.card}>
      <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
        <Icon size={24} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexBasis: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  iconWrapper: {
    padding: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  textContainer: {
    gap: 2,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  unit: {
    fontSize: 14,
    color: '#6b7280',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
});

export default VitalsCard;
