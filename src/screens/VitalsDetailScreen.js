import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useSelector } from 'react-redux';

const vitalConfigs = {
  'heart-rate': {
    title: 'Heart Rate',
    key: 'heartRate',
    unit: 'BPM',
    color: '#dc2626',
    normal: [60, 100],
  },
  'blood-pressure': {
    title: 'Blood Pressure',
    keys: ['systolic', 'diastolic'],
    unit: 'mmHg',
    colors: ['#dc2626', '#7c3aed'],
    normal: { sys: [90, 120], dia: [60, 80] },
  },
  temperature: {
    title: 'Temperature',
    key: 'temperature',
    unit: '°F',
    color: '#ea580c',
    normal: [97, 99],
  },
  'blood-sugar': {
    title: 'Blood Sugar',
    key: 'bloodGlucose',
    unit: 'mg/dL',
    color: '#7c3aed',
    normal: [70, 140],
  },
  'oxygen-level': {
    title: 'Oxygen Level',
    key: 'pulseOx',
    unit: '%',
    color: '#0891b2',
    normal: [95, 100],
  },
  weight: { title: 'Weight', key: 'weight', unit: 'kg', color: '#4f46e5' },
};

export default function VitalsDetailScreen() {
  const route = useRoute(),
    nav = useNavigation();
  const { type } = route.params;
  const config = vitalConfigs[type];
  const vitals = useSelector(s => s.vitals.vitalsData.slice());
  if (!config) return <Text style={styles.error}>Invalid Type</Text>;

  const chartData = useMemo(() => {
    return vitals.map(e => ({
      value: type === 'blood-pressure' ? e.systolic : e[config.key],
      date: e.date,
    }));
  }, [vitals]);

  const latest = vitals[vitals.length - 1],
    prev = vitals[1];
  const trend = (() => {
    if (!latest || !prev) return 'stable';
    let cur = type === 'blood-pressure' ? latest.systolic : latest[config.key];
    let pr = type === 'blood-pressure' ? prev.systolic : prev[config.key];
    return cur > pr ? 'up' : cur < pr ? 'down' : 'stable';
  })();

  const trendIcon =
    trend === 'up' ? (
      <TrendingUp color="#dc2626" />
    ) : trend === 'down' ? (
      <TrendingDown color="#059669" />
    ) : (
      <Minus color="#6b7280" />
    );

  const stats = useMemo(() => {
    if (!vitals.length) return null;
    const arr =
      type === 'blood-pressure'
        ? vitals.map(v => v.systolic)
        : vitals.map(v => v[config.key]).filter(v => v != null);

    const min = Math.min(...arr),
      max = Math.max(...arr),
      avg = Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
    return { min, avg, max };
  }, [vitals]);

  const inNormal = () => {
    if (type === 'blood-pressure') {
      const sys = latest.systolic,
        dia = latest.diastolic;
      const [smin, smax] = config.normal.sys,
        [dmin, dmax] = config.normal.dia;
      return sys >= smin && sys <= smax && dia >= dmin && dia <= dmax;
    }
    const val = latest[config.key],
      [min, max] = config.normal || [];
    return val >= min && val <= max;
  };

  const labelStatus = () => (inNormal() ? 'Normal' : 'Abnormal');
  const statusColor = inNormal() ? '#059669' : '#dc2626';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.section}>
        <Text style={styles.title}>{config.title} Details</Text>
      </View>

      {/* Summary Boxes */}
      <View style={styles.summaryRow}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Current</Text>
          <Text style={[styles.boxValue, { color: statusColor }]}>
            {type === 'blood-pressure'
              ? `${latest.systolic}/${latest.diastolic}`
              : latest[config.key]}{' '}
            {config.unit}
          </Text>
          <View style={styles.trendRow}>
            {trendIcon}
            <Text style={styles.trendText}>
              {trend === 'up'
                ? '↑ Increased'
                : trend === 'down'
                ? '↓ Decreased'
                : '– Stable'}
            </Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Last Updated</Text>
          <Text style={styles.boxValue}>{latest.date}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Normal Range</Text>
          <Text style={styles.boxValue}>
            {type === 'blood-pressure'
              ? `${config.normal.sys[0]}-${config.normal.sys[1]}/${config.normal.dia[0]}-${config.normal.dia[1]}`
              : `${config.normal[0]}-${config.normal[1]}`}{' '}
            {config.unit}
          </Text>
        </View>
      </View>

      {/* Stats */}
      {stats && (
        <View style={styles.statsRow}>
          {['min', 'avg', 'max'].map(k => (
            <View key={k} style={styles.statCol}>
              <Text style={styles.statValue}>{stats[k]}</Text>
              <Text style={styles.statLabel}>{k.toUpperCase()}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.chartTitle}>Trend</Text>
      <LineChart
        data={chartData}
        height={200}
        curved
        thickness={2}
        color={config.color}
        startFillColor={`${config.color}55`}
        noOfSections={4}
        hideDataPoints
        spacing={chartData.length > 7 ? 16 : 40}
      />

      <Text style={styles.chartTitle}>Recent Readings</Text>
      <View style={styles.listHeader}>
        <Text>Date</Text>
        <Text>Value</Text>
        <Text>Status</Text>
      </View>
      <FlatList
        data={vitals}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => {
          const val =
            type === 'blood-pressure'
              ? `${item.systolic}/${item.diastolic}`
              : item[config.key];
          const normal =
            type === 'blood-pressure'
              ? item.systolic >= config.normal.sys[0] &&
                item.systolic <= config.normal.sys[1] &&
                item.diastolic >= config.normal.dia[0] &&
                item.diastolic <= config.normal.dia[1]
              : item[config.key] >= config.normal[0] &&
                item[config.key] <= config.normal[1];
          return (
            <View style={styles.listRow}>
              <Text>{item.date}</Text>
              <Text>
                {val} {config.unit}
              </Text>
              <Text style={{ color: normal ? '#059669' : '#dc2626' }}>
                {normal ? 'Normal' : 'Abnormal'}
              </Text>
            </View>
          );
        }}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  backBtn: { marginBottom: 12 },
  section: { marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold' },
  summaryRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  box: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    marginRight: 8,
  },
  boxTitle: { fontSize: 14, fontWeight: '600' },
  boxValue: { fontSize: 22, fontWeight: 'bold', marginVertical: 4 },
  trendRow: { flexDirection: 'row', alignItems: 'center' },
  trendText: { marginLeft: 6, fontSize: 13, color: '#374151' },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  statCol: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '600', color: '#059669' },
  statLabel: { fontSize: 12, color: '#6b7280' },
  chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
});
