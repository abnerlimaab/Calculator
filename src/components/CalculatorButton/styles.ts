import { StyleSheet } from 'react-native';
import { ITheme } from '../../interfaces/ITheme';
import { Enphasis } from '../../enums/Enphasis';

const mapEnphasisBackgroundColor = (theme: ITheme) => ({
  [Enphasis.low]:
    theme.colors.button.lowEmphasis,
  [Enphasis.medium]:
    theme.colors.button.mediumEmphasis,
  [Enphasis.high]:
    theme.colors.button.highEmphasis,
});

export const createStyles = (theme: ITheme, enphasis: Enphasis) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: mapEnphasisBackgroundColor(theme)[enphasis],
  },
  text: {
    fontSize: 32,
    lineHeight: 40,
    textAlign: 'center',
    color: enphasis === Enphasis.high ? theme.colors.general.white : theme.colors.text,
  },
});
