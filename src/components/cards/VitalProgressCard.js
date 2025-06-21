import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const VitalProgressCard = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
  lastUpdated,
  onTrackProgress,
  type,
  normalRange,
  currentReading,
}) => {
  const calculateIndicatorPosition = () => {
    if (!normalRange || !currentReading) return 60; // Default position
    const [systolic, diastolic] = normalRange.split('/').map(Number);
    const [currentSystolic, currentDiastolic] = currentReading
      .split('/')
      .map(Number);

    const minRange = 80;
    const maxRange = 160;
    const percentage = Math.min(
      Math.max(((currentSystolic - minRange) / (maxRange - minRange)) * 100, 0),
      100,
    );
    return percentage;
  };

  const indicatorPosition = calculateIndicatorPosition();

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.chevron}>
          <Text style={styles.chevronText}>›</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.normalRange}>Normal Range {normalRange}</Text>
        <Text style={styles.lastUpdated}>Last Updated: {lastUpdated}</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View
          style={[styles.valueContainer, { left: `${indicatorPosition}%` }]}
        >
          <Text style={styles.currentValue}>{currentReading}</Text>
          <View style={styles.connectorLine} />
        </View>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressHalf, styles.progressGreen]} />
          <View style={[styles.progressHalf, styles.progressRed]} />
        </View>

        <View style={[styles.indicator, { left: `${indicatorPosition}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  chevron: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronText: {
    fontSize: 18,
    color: '#9ca3af',
    fontWeight: '300',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  normalRange: {
    fontSize: 12,
    color: '#6b7280',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#6b7280',
  },
  progressBarContainer: {
    marginBottom: 12,
    position: 'relative',
    paddingTop: 40,
  },
  valueContainer: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    transform: [{ translateX: -20 }],
  },
  currentValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 4,
  },
  connectorLine: {
    width: 1,
    height: 20,
    backgroundColor: '#10b981',
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressHalf: {
    flex: 1,
    height: '100%',
  },
  progressGreen: {
    backgroundColor: '#10b981',
  },
  progressRed: {
    backgroundColor: '#ef4444',
  },
  indicator: {
    position: 'absolute',
    top: 40,
    width: 8,
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
    transform: [{ translateX: -4 }],
  },
});

export default VitalProgressCard;
