import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { CheckCircle, TrendingUp } from 'lucide-react-native';
import AlertCard from '../components/cards/AlertCard';

const AlertsScreen = () => {
  const { alerts } = useSelector(state => state.vitals);

  const healthTips = [
    {
      title: 'Heart Health',
      content:
        'Regular exercise and a balanced diet help maintain healthy heart rate and blood pressure.',
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      title: 'Weight Management',
      content:
        'Monitor your BMI regularly and maintain it within the healthy range of 18.5-24.9.',
      color: '#10b981',
      bg: '#ecfdf5',
    },
    {
      title: 'Blood Sugar',
      content:
        'Keep blood glucose levels stable through consistent meal timing and portion control.',
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
    {
      title: 'Hydration',
      content:
        'Stay well-hydrated to support optimal blood pressure and overall circulation.',
      color: '#f97316',
      bg: '#fff7ed',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Alerts</Text>
        <View style={styles.trending}>
          <TrendingUp size={16} color="#6b7280" />
          <Text style={styles.trendingText}>AI-powered health insights</Text>
        </View>
      </View>

      {alerts.length > 0 ? (
        <View style={styles.alertList}>
          {alerts.map((alert, index) => (
            <AlertCard key={index} alert={alert} index={index} />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <CheckCircle size={48} color="#22c55e" />
          <Text style={styles.emptyTitle}>All vitals are normal</Text>
          <Text style={styles.emptyDescription}>
            No alerts or warnings detected from your recent vitals.
          </Text>
        </View>
      )}

      <View style={styles.tipsContainer}>
        <Text style={styles.tipHeader}>Health Tips</Text>
        {healthTips.map((tip, index) => (
          <View
            key={index}
            style={[styles.tipCard, { backgroundColor: tip.bg }]}
          >
            <Text style={[styles.tipTitle, { color: tip.color }]}>
              {tip.title}
            </Text>
            <Text style={[styles.tipContent, { color: tip.color }]}>
              {tip.content}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AlertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  trending: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trendingText: {
    fontSize: 13,
    color: '#6b7280',
  },
  alertList: {
    marginBottom: 24,
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  emptyDescription: {
    marginTop: 4,
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  tipsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 60,
  },
  tipHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  tipCard: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  tipTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  tipContent: {
    fontSize: 13,
    lineHeight: 18,
  },
});
