import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Zap,
  Weight,
  Calendar,
} from 'lucide-react-native';
import VitalProgressCard from '../cards/VitalProgressCard';
import { useNavigation } from '@react-navigation/native';

const VitalCard = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
  lastUpdated,
  onTrackProgress,
  type,
}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={[styles.iconWrapper, { backgroundColor: color }]}>
        <Icon size={18} color="white" />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>

    <View style={styles.cardValue}>
      <Text style={styles.valueText}>
        {value}
        <Text style={styles.unitText}> {unit}</Text>
      </Text>
      <Text style={styles.avgText}>Avg. daily {title.toLowerCase()}</Text>
    </View>

    <View style={styles.dateWrapper}>
      <Calendar size={14} color="#6b7280" />
      <View>
        <Text style={styles.dateLabel}>Uploaded Date and Time</Text>
        <Text style={styles.dateText}>{lastUpdated}</Text>
      </View>
    </View>

    <Text style={styles.trackButton} onPress={() => onTrackProgress(type)}>
      Track Progress
    </Text>
  </View>
);

export default function VitalsOverview({ filteredData, selectedDate }) {
  const navigation = useNavigation();

  const getLastUpdated = () => {
    if (!filteredData.length) return 'No data';
    return filteredData[filteredData.length - 1].date;
  };

  const averages = useMemo(() => {
    if (!filteredData.length) return {};

    const totals = filteredData.reduce(
      (acc, entry) => {
        acc.heartRate += entry.heartRate || 0;
        acc.systolic += entry.systolic || 0;
        acc.diastolic += entry.diastolic || 0;
        acc.temperature += entry.temperature || 0;
        acc.bloodGlucose += entry.bloodGlucose || 0;
        acc.pulseOx += entry.pulseOx || 0;
        acc.weight += entry.weight || 0;
        return acc;
      },
      {
        heartRate: 0,
        systolic: 0,
        diastolic: 0,
        temperature: 0,
        bloodGlucose: 0,
        pulseOx: 0,
        weight: 0,
      },
    );

    const count = filteredData.length;
    return {
      heartRate: Math.round(totals.heartRate / count),
      bloodPressure: `${Math.round(totals.systolic / count)}/${Math.round(
        totals.diastolic / count,
      )}`,
      temperature: (totals.temperature / count).toFixed(1),
      bloodGlucose: Math.round(totals.bloodGlucose / count),
      pulseOx: Math.round(totals.pulseOx / count),
      weight: Math.round(totals.weight / count),
    };
  }, [filteredData]);

  const handleTrackProgress = type => {
    console.log('Tracking', type);
    navigation.navigate('VitalDetails', { type });

    // navigation.navigate('HistoryDetails', { type });
  };

  return (
    <ScrollView contentContainerStyle={styles.dashboardContainer}>
      <VitalCard
        title="Heart Rate"
        value={averages.heartRate || '--'}
        unit="bpm"
        icon={Heart}
        color="#ef4444"
        lastUpdated={getLastUpdated()}
        onTrackProgress={handleTrackProgress}
        type="heart-rate"
      />

      <VitalCard
        title="Blood Pressure"
        value={averages.bloodPressure || '--'}
        unit=""
        icon={Activity}
        color="#10b981"
        lastUpdated={getLastUpdated()}
        onTrackProgress={handleTrackProgress}
        type="blood-pressure"
      />

      <VitalCard
        title="Temperature"
        value={averages.temperature || '--'}
        unit="°F"
        icon={Thermometer}
        color="#3b82f6"
        lastUpdated={getLastUpdated()}
        onTrackProgress={handleTrackProgress}
        type="temperature"
      />

      <VitalCard
        title="Blood Sugar"
        value={averages.bloodGlucose || '--'}
        unit="mg/dL"
        icon={Droplets}
        color="#8b5cf6"
        lastUpdated={getLastUpdated()}
        onTrackProgress={handleTrackProgress}
        type="blood-sugar"
      />

      <VitalCard
        title="Oxy Level"
        value={averages.pulseOx || '--'}
        unit="%"
        icon={Zap}
        color="#06b6d4"
        lastUpdated={getLastUpdated()}
        onTrackProgress={handleTrackProgress}
        type="oxygen-level"
      />

      <VitalCard
        title="Weight"
        value={averages.weight || '--'}
        unit="kg"
        icon={Weight}
        color="#6366f1"
        lastUpdated={getLastUpdated()}
        onTrackProgress={handleTrackProgress}
        type="weight"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashboardContainer: {
    gap: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 12,
    marginHorizontal: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  iconWrapper: {
    padding: 6,
    borderRadius: 8,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111827',
  },
  cardValue: {
    marginBottom: 12,
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  unitText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: 'normal',
  },
  avgText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  dateText: {
    fontSize: 13,
    color: '#374151',
    marginTop: 2,
  },
  trackButton: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: '500',
    overflow: 'hidden',
  },
});
