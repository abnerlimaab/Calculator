import React from 'react';
import { FlatList, Text, useColorScheme, View } from 'react-native';
import { createStyles, lineButtonsStyles } from './styles';
import CalculatorButom from '../../components/CalculatorButton';
import { themes } from '../../styles/themes';
import { Enphasis } from '../../enums/Enphasis';
import { isOperator, Operators } from '../../enums/Operators';

const highEnphasis: Operators[] = [Operators.Divide, Operators.Multiply, Operators.Subtract, Operators.Add, Operators.Equal];
const mediumEnphasis: Operators[] = [Operators.Erase, Operators.PlusMinus, Operators.Percent];

function getEnphasis(item: Operators | string): Enphasis {
  if (!isOperator(item)) {
    return Enphasis.low;
  }

  if (highEnphasis.includes(item)) {
    return Enphasis.high;
  }

  if (mediumEnphasis.includes(item)) {
    return Enphasis.medium;
  }

  return Enphasis.low;
}

interface LineButtonsProps {
  data: string[];
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

      <Text style={styles.operationText}>6291 {Operators.Divide} 5</Text>

      <Text
        style={styles.resultText}
        numberOfLines={1}
        minimumFontScale={0.3}
        adjustsFontSizeToFit
      >1258.2</Text>

      <View>
        <LineButtons data={[Operators.Erase, Operators.PlusMinus, Operators.Percent, Operators.Divide]} />
        <LineButtons data={['7', '8', '9', Operators.Multiply]} />
        <LineButtons data={['4', '5', '6', Operators.Subtract]} />
        <LineButtons data={['1', '2', '3', Operators.Add]} />
        <LineButtons data={['.', '0', Operators.Rubber, '=']} />
      </View>
    </View>
  );
}

export default Calculator;
