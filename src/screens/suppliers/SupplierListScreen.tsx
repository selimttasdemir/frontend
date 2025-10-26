import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSupplierStore } from '../../store/supplierStore';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants';
import { Supplier } from '../../types';

export const SupplierListScreen = ({ navigation }: any) => {
  const { suppliers, isLoading, fetchSuppliers } = useSupplierStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    await fetchSuppliers();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSuppliers();
    setRefreshing(false);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    await fetchSuppliers({ search: query });
  };

  const renderSupplier = ({ item }: { item: Supplier }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SupplierDetail', { supplierId: item.id })}
      activeOpacity={0.7}
    >
      <Card>
        <View style={styles.supplierCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="truck" size={32} color={COLORS.primary} />
          </View>
          
          <View style={styles.supplierInfo}>
            <Text style={styles.supplierName}>{item.name}</Text>
            
            {item.contactPerson && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="account" size={16} color={COLORS.textSecondary} />
                <Text style={styles.infoText}>{item.contactPerson}</Text>
              </View>
            )}
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="phone" size={16} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>{item.phone}</Text>
            </View>

            {item.email && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="email" size={16} color={COLORS.textSecondary} />
                <Text style={styles.infoText}>{item.email}</Text>
              </View>
            )}
          </View>

          <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input
          placeholder="Tedarikçi ara..."
          value={searchQuery}
          onChangeText={handleSearch}
          leftIcon="magnify"
          containerStyle={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddSupplier')}
        >
          <MaterialCommunityIcons name="plus" size={24} color={COLORS.surface} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={suppliers}
        renderItem={renderSupplier}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="truck" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>Tedarikçi bulunamadı</Text>
            <Button title="İlk Tedarikçiyi Ekle" onPress={() => navigation.navigate('AddSupplier')} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    padding: SPACING.md,
    gap: SPACING.sm,
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: SPACING.md,
  },
  supplierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supplierInfo: {
    flex: 1,
  },
  supplierName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  infoText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    marginVertical: SPACING.lg,
  },
});
