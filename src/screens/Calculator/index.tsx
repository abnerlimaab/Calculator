import React, {useReducer} from 'react';
import {FlatList, Text, useColorScheme, View} from 'react-native';
import {createStyles, lineButtonsStyles} from './styles';
import CalculatorButom from '../../components/CalculatorButton';
import {themes} from '../../styles/themes';
import {Enphasis} from '../../enums/Enphasis';
import {isOperator, Operators} from '../../enums/Operators';
import {calculatorReducer} from '../../reducers/calculator';
import {initialState} from '../../store/calculator';
import {CalculatorActionsType} from '../../types/actions/CalculatorActions';

const highEnphasis: Operators[] = [
  Operators.Divide,
  Operators.Multiply,
  Operators.Subtract,
  Operators.Add,
  Operators.Equal,
];
const mediumEnphasis: Operators[] = [
  Operators.Erase,
  Operators.PlusMinus,
  Operators.Percent,
];

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
  onPress: (item: string) => void;
}

function LineButtons({data, onPress}: LineButtonsProps) {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <CalculatorButom
          onPress={() => onPress(item)}
          enphasis={getEnphasis(item)}>
          {item}
        </CalculatorButom>
      )}
      keyExtractor={item => item}
      numColumns={4}
      scrollEnabled={false}
      columnWrapperStyle={lineButtonsStyles.flexLineColumnWrapper}
    />
  );
}

function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const colorScheme = useColorScheme();
  const styles = createStyles(themes[colorScheme ?? 'light']);

  function handlePress(item: string) {
    dispatch({
      type: CalculatorActionsType.CHANGE_OPERATION,
      payload: item,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSpacer} />

      <Text
        style={styles.operationText}
        adjustsFontSizeToFit
        numberOfLines={1}
        minimumFontScale={0.3}>
        {state.operationString}
      </Text>

      <Text
        style={styles.resultText}
        numberOfLines={1}
        minimumFontScale={0.3}
        adjustsFontSizeToFit>
        {state.result}
      </Text>

      <View>
        <LineButtons
          data={[
            Operators.Erase,
            Operators.PlusMinus,
            Operators.Percent,
            Operators.Divide,
          ]}
          onPress={handlePress}
        />
        <LineButtons
          data={['7', '8', '9', Operators.Multiply]}
          onPress={handlePress}
        />
        <LineButtons
          data={['4', '5', '6', Operators.Subtract]}
          onPress={handlePress}
        />
        <LineButtons
          data={['1', '2', '3', Operators.Add]}
          onPress={handlePress}
        />
        <LineButtons
          data={['.', '0', Operators.Rubber, '=']}
          onPress={handlePress}
        />
      </View>
    </View>
  );
}

export default Calculator;
