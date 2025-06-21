import { createSlice } from '@reduxjs/toolkit';
import vitalsData from '../data/vitalsData.json';

const initialState = {
  vitalsData,
  alerts: [],
};

const calculateBMI = (weight, height) => {
  if (weight && height) {
    const heightInM = height / 100;
    return +(weight / (heightInM * heightInM)).toFixed(1);
  }
  return 0;
};

const checkForAlerts = vitals => {
  const newAlerts = [];

  if (vitals.heartRate > 120)
    newAlerts.push({
      type: 'warning',
      message: 'High Heart Rate',
      recommendation: 'Take rest and avoid strenuous activity',
    });
  if (vitals.heartRate < 50)
    newAlerts.push({
      type: 'warning',
      message: 'Low Heart Rate',
      recommendation: 'Monitor closely and consult doctor if persistent',
    });
  if (vitals.pulseOx < 95)
    newAlerts.push({
      type: 'danger',
      message: 'Low Oxygen Level',
      recommendation: 'Seek immediate medical attention',
    });
  if (vitals.systolic > 140 || vitals.diastolic > 90)
    newAlerts.push({
      type: 'warning',
      message: 'High Blood Pressure',
      recommendation: 'Reduce salt intake and consult doctor',
    });
  if (vitals.systolic < 90 || vitals.diastolic < 60)
    newAlerts.push({
      type: 'warning',
      message: 'Low Blood Pressure',
      recommendation: 'Stay hydrated and avoid sudden position changes',
    });
  if (vitals.temperature > 100.4)
    newAlerts.push({
      type: 'warning',
      message: 'Fever Detected',
      recommendation: 'Rest, drink fluids, and monitor temperature',
    });
  if (vitals.bloodGlucose > 140)
    newAlerts.push({
      type: 'warning',
      message: 'High Blood Sugar',
      recommendation:
        'Check with healthcare provider about diabetes management',
    });
  if (vitals.bloodGlucose < 70)
    newAlerts.push({
      type: 'danger',
      message: 'Low Blood Sugar',
      recommendation: 'Consume quick-acting carbs immediately',
    });

  return newAlerts;
};

const vitalsSlice = createSlice({
  name: 'vitals',
  initialState,
  reducers: {
    addVitals: (state, action) => {
      const { height, weight, ...rest } = action.payload;

      const bmi = calculateBMI(weight, height);

      const newEntry = {
        id: state.vitalsData.length + 1,
        date: new Date().toISOString().split('T')[0],
        height: +height,
        weight: +weight,
        bmi,
        ...Object.fromEntries(
          Object.entries(rest).map(([k, v]) => [k, parseFloat(v)]),
        ),
      };

      const newAlerts = checkForAlerts(newEntry);
      //   state.alerts = [...newAlerts, ...state.alerts.slice(0, 10)];
      state.alerts = [...newAlerts];
      state.vitalsData.push(newEntry);
    },
  },
});

export const { addVitals } = vitalsSlice.actions;
export default vitalsSlice.reducer;
