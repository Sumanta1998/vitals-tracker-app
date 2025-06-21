import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';

const FloatingActionButton = ({ onPress, label = 'Add Vitals' }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Plus color="#fff" size={20} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 6,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default FloatingActionButton;
