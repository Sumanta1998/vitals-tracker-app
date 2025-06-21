import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Calendar } from 'lucide-react-native';
import VitalsChart from '../components/cards/VitalsChart';
import VitalsOverview from '../components/shared/VitalsOverview';
import DateFilter from '../components/shared/DateFilter';

export default function HistoryScreen() {
  const { vitalsData } = useSelector(state => state.vitals);
  const [selectedDate, setSelectedDate] = useState('');

  const filteredData = useMemo(() => {
    if (!selectedDate) return vitalsData;
    return vitalsData.filter(entry => entry.date === selectedDate);
  }, [vitalsData, selectedDate]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Vitals History</Text>

        <DateFilter
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </View>

      <VitalsOverview filteredData={filteredData} selectedDate={selectedDate} />

      {!selectedDate && (
        <View style={styles.chartsWrapper}>
          <VitalsChart
            title="Weight & BMI Trend"
            data={vitalsData}
            lines={[
              { dataKey: 'weight', color: '#8b5cf6', name: 'Weight (kg)' },
              { dataKey: 'bmi', color: '#06b6d4', name: 'BMI' },
            ]}
          />
          <VitalsChart
            title="Temperature & Glucose"
            data={vitalsData}
            lines={[
              { dataKey: 'temperature', color: '#dc2626', name: 'Temp (°F)' },
              {
                dataKey: 'bloodGlucose',
                color: '#059669',
                name: 'Glucose (mg/dL)',
              },
            ]}
          />
        </View>
      )}

      <View style={styles.tableWrapper}>
        <Text style={styles.tableTitle}>
          {selectedDate ? `Entries for ${selectedDate}` : 'Recent Entries'}
        </Text>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>
              No data found for the selected date.
            </Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={[styles.cell, { flex: 1.5 }]}>{item.date}</Text>
              <Text style={styles.cell}>{item.heartRate} BPM</Text>
              <Text style={styles.cell}>
                {item.systolic}/{item.diastolic}
              </Text>
              <Text style={styles.cell}>{item.pulseOx}%</Text>
              <Text style={styles.cell}>{item.weight} kg</Text>
              <Text style={styles.cell}>{item.bmi}</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={[styles.row, styles.tableHeader]}>
              <Text style={[styles.headerCell, { flex: 1.5 }]}>Date</Text>
              <Text style={styles.headerCell}>HR</Text>
              <Text style={styles.headerCell}>BP</Text>
              <Text style={styles.headerCell}>SpO₂</Text>
              <Text style={styles.headerCell}>Weight</Text>
              <Text style={styles.headerCell}>BMI</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  dateFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 8,
    borderRadius: 8,
    fontSize: 14,
    color: '#111827',
  },
  clearButton: {
    fontSize: 12,
    color: '#2563eb',
    marginLeft: 4,
  },
  chartsWrapper: {
    gap: 24,
    marginBottom: 24,
  },
  tableWrapper: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableTitle: {
    backgroundColor: '#f9fafb',
    padding: 12,
    fontWeight: '600',
    fontSize: 16,
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: '#111827',
    // width: 200,
  },
  emptyText: {
    padding: 16,
    textAlign: 'center',
    color: '#6b7280',
  },
});
