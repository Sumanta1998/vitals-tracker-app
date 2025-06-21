import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  unit,
  icon: Icon,
  keyboardType = 'numeric',
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        {Icon && <Icon size={16} color="#2563eb" />}
        <Text style={styles.label}>
          {label} <Text style={{ color: '#dc2626' }}>*</Text>
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          keyboardType={keyboardType}
          style={styles.input}
        />
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  unit: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
});

export default FormInput;
