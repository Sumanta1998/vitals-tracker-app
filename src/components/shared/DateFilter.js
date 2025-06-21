import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, X } from 'lucide-react-native';
export default function DateFilter({ selectedDate, setSelectedDate }) {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      const formatted = date.toISOString().split('T')[0];
      setSelectedDate(formatted);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.dateFilter}>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={styles.calendarIcon}
        >
          <Calendar size={18} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>{selectedDate || 'Select a date'}</Text>
        </TouchableOpacity>

        {selectedDate ? (
          <TouchableOpacity onPress={() => setSelectedDate('')}>
            <X size={18} color="#6b7280" />
          </TouchableOpacity>
        ) : null}
      </View>

      {showPicker && (
        <DateTimePicker
          value={selectedDate ? new Date(selectedDate) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}
const styles = {
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dateFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateInputWrapper: {
    flex: 1,
  },
  dateInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 8,
    color: '#111827',
    fontSize: 14,
    backgroundColor: '#f9fafb',
  },
};
