import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const VitalsChart = ({ title, data, lines }) => {
  const line = lines[0] || {};
  const chartData = data.map(entry => ({
    value: entry[line.dataKey] || 0,
  }));

  return (
    <View style={styles.chartBox}>
      <Text style={styles.chartTitle}>{title}</Text>
      <LineChart
        data={chartData}
        thickness={2}
        height={180}
        curved
        color={line.color || '#2563eb'}
        hideDataPoints
        startFillColor={line.color || '#2563eb'}
        endFillColor="#ffffff00"
        rulesColor="#e5e7eb"
        noOfSections={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderColor: '#f3f4f6',
    borderWidth: 1,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
});

export default VitalsChart;
