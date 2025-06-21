import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

const VitalsInputModal = ({ visible, onClose, onSave }) => {
  const [form, setForm] = useState({
    height: '',
    weight: '',
    heartRate: '',
    spo2: '',
    bpSys: '',
    bpDia: '',
    respirationRate: '',
    temperature: '',
    bloodGlucose: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    const bmi = (
      parseFloat(form.weight) / (parseFloat(form.height) / 100) ** 2 || 0
    ).toFixed(2);

    const newEntry = {
      ...form,
      height: parseFloat(form.height),
      weight: parseFloat(form.weight),
      heartRate: parseFloat(form.heartRate),
      spo2: parseFloat(form.spo2),
      bpSys: parseFloat(form.bpSys),
      bpDia: parseFloat(form.bpDia),
      respirationRate: parseFloat(form.respirationRate),
      temperature: parseFloat(form.temperature),
      bloodGlucose: parseFloat(form.bloodGlucose),
      bmi,
      date: new Date().toISOString(),
    };

    onSave(newEntry);
    setForm({
      height: '',
      weight: '',
      heartRate: '',
      spo2: '',
      bpSys: '',
      bpDia: '',
      respirationRate: '',
      temperature: '',
      bloodGlucose: '',
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modal}>
        <ScrollView contentContainerStyle={styles.container}>
          {Object.keys(form).map(key => (
            <TextInput
              key={key}
              placeholder={key.replace(/([A-Z])/g, ' $1')}
              style={styles.input}
              keyboardType="numeric"
              value={form[key]}
              onChangeText={val => handleChange(key, val)}
            />
          ))}
          <View style={styles.actions}>
            <Button title="Cancel" onPress={onClose} color="gray" />
            <Button title="Save" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default VitalsInputModal;
