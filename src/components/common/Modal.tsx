import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants';
import { Button } from './Button';

const { width } = Dimensions.get('window');

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  footer,
  size = 'medium',
}) => {
  const modalWidth = size === 'small' ? width * 0.8 : size === 'large' ? width * 0.95 : width * 0.9;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, { width: modalWidth }]}>
          {/* Header */}
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && <Text style={styles.title}>{title}</Text>}
              {showCloseButton && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialCommunityIcons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Content */}
          <View style={styles.content}>{children}</View>

          {/* Footer */}
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </View>
    </RNModal>
  );
};

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  onClose,
  title,
  message,
  type = 'info',
  confirmText = 'Tamam',
  cancelText = 'İptal',
  onConfirm,
}) => {
  const iconConfig = {
    success: { name: 'check-circle', color: COLORS.success },
    error: { name: 'alert-circle', color: COLORS.error },
    warning: { name: 'alert', color: COLORS.warning },
    info: { name: 'information', color: COLORS.info },
  };

  const config = iconConfig[type];

  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={false} size="small">
      <View style={styles.alertContent}>
        <MaterialCommunityIcons name={config.name as any} size={64} color={config.color} />
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertMessage}>{message}</Text>
        
        <View style={styles.alertButtons}>
          {onConfirm && (
            <Button
              title={cancelText}
              onPress={onClose}
              variant="outline"
              style={{ flex: 1 }}
            />
          )}
          <Button
            title={confirmText}
            onPress={onConfirm || onClose}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  content: {
    padding: SPACING.lg,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  alertContent: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  alertTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  alertButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    width: '100%',
  },
});
