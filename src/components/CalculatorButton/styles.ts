import {StyleSheet} from 'react-native';
import { ITheme } from '../../styles/themes/ITheme';
import { Enphasis } from '.';

function getEnphasisBackgroundColor(enphasis: Enphasis, theme: ITheme) {
  switch (enphasis) {
    case Enphasis.low:
      return theme.colors.button.lowEmphasis;
    case Enphasis.medium:
      return theme.colors.button.mediumEmphasis;
    case Enphasis.high:
      return theme.colors.button.highEmphasis;
  }
}

export const createStyles = (theme: ITheme, enphasis: Enphasis) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: getEnphasisBackgroundColor(enphasis, theme),
  },
  text: {
    fontSize: 32,
    lineHeight: 40,
    textAlign: 'center',
    color: enphasis === Enphasis.high ? theme.colors.general.white : theme.colors.text,
  },
});
