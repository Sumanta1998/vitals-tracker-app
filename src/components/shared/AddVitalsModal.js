import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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

const AddVitalsModal = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

  const handleSubmit = () => {
    const isEmpty = Object.values(formData).some(value => value === '');
    if (isEmpty) {
      alert('Please fill in all fields.');
      return;
    }

    dispatch(addVitals(formData));
    resetForm();
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Vitals</Text>
            <TouchableOpacity onPress={onClose}>
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
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
              <Text style={styles.saveText}>Save Vitals</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
    padding: 16,
    borderTopColor: '#e5e7eb',
    borderTopWidth: 1,
    gap: 10,
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

export default AddVitalsModal;
