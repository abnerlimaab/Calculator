import React from 'react';
import { FlatList, Text, useColorScheme, View } from 'react-native';
import { createStyles, lineButtonsStyles } from './styles';
import CalculatorButom, { Enphasis } from '../../components/CalculatorButton';
import { themes } from '../../styles/themes';

interface LineButtonsProps {
  data: string[];
}

const eraseCode = '\u232B';
const divideCode = '\u00F7';

const highEnphasis = [divideCode, 'x', '-', '+', '='];
const mediumEnphasis = ['C', '+/-', '%'];

function getEnphasis(item: string): Enphasis {
  if (highEnphasis.includes(item)) {
    return Enphasis.high;
  }

  if (mediumEnphasis.includes(item)) {
    return Enphasis.medium;
  }

  return Enphasis.low;
}

function LineButtons({ data }: LineButtonsProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <CalculatorButom enphasis={getEnphasis(item)}>{item}</CalculatorButom>}
      keyExtractor={item => item}
      numColumns={4}
      scrollEnabled={false}
      columnWrapperStyle={lineButtonsStyles.flexLineColumnWrapper}
    />
  );
}

function Calculator() {
  const colorScheme = useColorScheme();
  const styles = createStyles(themes[colorScheme ?? 'light']);

  return (
    <View style={styles.container}>
      <View style={styles.topSpacer} />

      <Text style={styles.operationText}>6291 {divideCode} 5</Text>

      <Text
        style={styles.resultText}
        numberOfLines={1}
        minimumFontScale={0.3}
        adjustsFontSizeToFit
      >1258.2</Text>

      <View>
        <LineButtons data={['C', '+/-', '%', divideCode]} />
        <LineButtons data={['7', '8', '9', 'x']} />
        <LineButtons data={['4', '5', '6', '-']} />
        <LineButtons data={['1', '2', '3', '+']} />
        <LineButtons data={['.', '0', eraseCode, '=']} />
      </View>
    </View>
  );
}

export default Calculator;
