import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

const AlertCard = ({ alert }) => {
  const isDanger = alert.type === 'danger';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDanger ? '#fef2f2' : '#fefce8',
          borderLeftColor: isDanger ? '#f87171' : '#facc15',
        },
      ]}
    >
      <View style={styles.row}>
        <AlertTriangle
          size={20}
          color={isDanger ? '#f87171' : '#facc15'}
          style={styles.icon}
        />
        <View style={styles.content}>
          <Text
            style={[
              styles.message,
              { color: isDanger ? '#991b1b' : '#92400e' },
            ]}
          >
            {alert.message}
          </Text>
          <Text
            style={[
              styles.recommendation,
              { color: isDanger ? '#b91c1c' : '#ca8a04' },
            ]}
          >
            <Text style={{ fontWeight: 'bold' }}>Recommendation:</Text>{' '}
            {alert.recommendation}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AlertCard;

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginTop: 2,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  recommendation: {
    fontSize: 13,
    lineHeight: 18,
  },
});
