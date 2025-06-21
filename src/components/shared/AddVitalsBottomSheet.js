import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch } from 'react-redux';
import { addVitals } from '../../redux/vitalsSlice';
import FormInput from './FormInput';
import {
  User,
  Weight,
  Thermometer,
  Wind,
  Activity,
  Heart,
  Droplet,
  X,
} from 'lucide-react-native';

const AddVitalsBottomSheet = ({ isOpen, onClose }) => {
  const sheetRef = useRef(null);
  const dispatch = useDispatch();

  const snapPoints = useMemo(() => ['85%'], []);

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    respirationRate: '',
    temperature: '',
    systolic: '',
    diastolic: '',
    pulseOx: '',
    bloodGlucose: '',
    heartRate: '',
  });

  const resetForm = () => {
    setFormData({
      height: '',
      weight: '',
      respirationRate: '',
      temperature: '',
      systolic: '',
      diastolic: '',
      pulseOx: '',
      bloodGlucose: '',
      heartRate: '',
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const isEmpty = Object.values(formData).some(value => value === '');
    if (isEmpty) {
      alert('Please fill in all fields.');
      return;
    }

    dispatch(addVitals(formData));
    resetForm();
    sheetRef.current?.close();
    onClose?.();
  };

  const handleSheetClose = () => {
    resetForm();
    onClose?.();
  };

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.snapToIndex(0);
    } else {
      sheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={handleSheetClose}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.indicator}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrapper}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Add New Vitals</Text>
          <TouchableOpacity onPress={handleSheetClose}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.form}>
          <FormInput
            label="Height"
            value={formData.height}
            onChange={value => handleInputChange('height', value)}
            placeholder="Enter Height"
            unit="cm"
            icon={User}
          />
          <FormInput
            label="Weight"
            value={formData.weight}
            onChange={value => handleInputChange('weight', value)}
            placeholder="Enter Weight"
            unit="kg"
            icon={Weight}
          />
          <FormInput
            label="Temperature"
            value={formData.temperature}
            onChange={value => handleInputChange('temperature', value)}
            placeholder="Enter Temp"
            unit="°F"
            icon={Thermometer}
          />
          <FormInput
            label="Respiration Rate"
            value={formData.respirationRate}
            onChange={value => handleInputChange('respirationRate', value)}
            placeholder="Breaths/min"
            unit="breaths/min"
            icon={Wind}
          />
          <FormInput
            label="Blood Pressure (SYS)"
            value={formData.systolic}
            onChange={value => handleInputChange('systolic', value)}
            placeholder="Systolic"
            unit="mmHg"
            icon={Activity}
          />
          <FormInput
            label="Blood Pressure (DIA)"
            value={formData.diastolic}
            onChange={value => handleInputChange('diastolic', value)}
            placeholder="Diastolic"
            unit="mmHg"
            icon={Activity}
          />
          <FormInput
            label="Pulse Ox"
            value={formData.pulseOx}
            onChange={value => handleInputChange('pulseOx', value)}
            placeholder="Enter Pulse"
            unit="%"
            icon={Heart}
          />
          <FormInput
            label="Heart Rate"
            value={formData.heartRate}
            onChange={value => handleInputChange('heartRate', value)}
            placeholder="Beats/min"
            unit="BPM"
            icon={Heart}
          />
          <FormInput
            label="Blood Glucose"
            value={formData.bloodGlucose}
            onChange={value => handleInputChange('bloodGlucose', value)}
            placeholder="mg/dL"
            unit="mg/dL"
            icon={Droplet}
          />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleSheetClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Vitals</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  indicator: {
    backgroundColor: '#d1d5db',
    width: 60,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#e5e7eb',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  form: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cancelBtn: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelText: {
    color: '#374151',
    fontWeight: '500',
  },
  saveBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default AddVitalsBottomSheet;
