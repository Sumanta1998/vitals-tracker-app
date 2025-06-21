import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Heart, Activity, Droplets, Scale } from 'lucide-react-native';

import VitalsCard from '../components/cards/VitalsCard';
import VitalsChart from '../components/cards/VitalsChart';
import FloatingActionButton from '../components/shared/FloatingActionButton';
import AddVitalsModal from '../components/shared/AddVitalsModal';
import AddVitalsBottomSheet from '../components/shared/AddVitalsBottomSheet';

export default function HomeScreen() {
  const { vitalsData } = useSelector(state => state.vitals);
  const [showAddModal, setShowAddModal] = useState(false);

  const latest = vitalsData[vitalsData.length - 1] || {};
  const chartData = vitalsData;

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.heading}>Overview of Vitals</Text>
        </View>

        <View style={styles.cardsContainer}>
          <VitalsCard
            title="Heart Rate"
            value={latest.heartRate || '--'}
            unit="BPM"
            icon={Heart}
            color="red"
          />
          <VitalsCard
            title="Blood Pressure"
            value={
              latest.systolic && latest.diastolic
                ? `${latest.systolic}/${latest.diastolic}`
                : '--'
            }
            unit="mmHg"
            icon={Activity}
            color="blue"
          />
          <VitalsCard
            title="Oxygen Level"
            value={latest.pulseOx || '--'}
            unit="SpO₂%"
            icon={Droplets}
            color="green"
          />
          <VitalsCard
            title="Weight"
            value={latest.weight || '--'}
            unit="kg"
            icon={Scale}
            color="purple"
          />
        </View>

        <View style={styles.chartsContainer}>
          <VitalsChart
            title="Blood Pressure Trend"
            data={chartData}
            lines={[
              { dataKey: 'systolic', color: '#ef4444', name: 'Systolic' },
              { dataKey: 'diastolic', color: '#3b82f6', name: 'Diastolic' },
            ]}
          />
          <VitalsChart
            title="Heart Rate & SpO₂"
            data={chartData}
            lines={[
              {
                dataKey: 'heartRate',
                color: '#f59e0b',
                name: 'Heart Rate (BPM)',
              },
              { dataKey: 'pulseOx', color: '#10b981', name: 'SpO₂ (%)' },
            ]}
          />
        </View>
      </ScrollView>

      <FloatingActionButton onPress={() => setShowAddModal(true)} />
      <AddVitalsModal
        isVisible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  chartsContainer: {
    gap: 16,
    paddingBottom: 80,
  },
});
