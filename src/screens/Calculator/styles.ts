import { StyleSheet } from 'react-native';
import { ITheme } from '../../styles/themes/ITheme';

export const lineButtonsStyles = StyleSheet.create({
  flexLineColumnWrapper: {
    marginVertical: 8,
    gap: 16,
  },
});

export const createStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
    paddingBottom: 20,
  },
  topSpacer: {
    flex: 1,
  },
  operationText: {
    fontSize: 40,
    textAlign: 'right',
    color: theme.colors.text,
    marginBottom: 16,
  },
  resultText: {
    fontSize: 96,
    lineHeight: 96,
    textAlign: 'right',
    color: theme.colors.text,
  },
  horizontalDivider: {
    width: 16,
  },
});
