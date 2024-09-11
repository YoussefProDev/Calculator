import { CurrencyPickerComponent } from '@youssefprodev/rn-currency-picker';
import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Switch } from '@/components/ui/switch';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Currency } from '@/constants/types';
const Index = () => {
  const [currencyRate, setCurrencyRate] = React.useState<Record<string, number>>({});
  const [lastUpdate, setLastUpdate] = React.useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [darkMode, setDarkMode] = React.useState<boolean>(false);
  const [valueFrom, setValueFrom] = React.useState<string>();
  const [valueTo, setValueTo] = React.useState<string>();
  const [canCalc, setCanCalc] = React.useState<boolean>(false);
  const [currencyFrom, setCurrencyFrom] = React.useState<Currency>({
    symbol: '€',
    name: 'Euro',
    symbol_native: '€',
    decimal_digits: 2,
    rounding: 0,
    code: 'EUR',
    name_plural: 'euros',

    flag_emoji: '🇪🇺',
  });
  const [currencyTo, setCurrencyTo] = React.useState<Currency>({
    symbol: '$',
    name: 'US Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'USD',
    name_plural: 'US dollars',
    flag_emoji: '🇺🇸',
  });

  const getCurrencyRate = async (selectedCurrency: Currency) => {
    try {
      setCanCalc(false);
      const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedCurrency.code.toLowerCase()}.json`;
      const response = await fetch(url);
      const data = await response.json();

      const { date, ...currency } = data;
      setLastUpdate(date);

      setCurrencyRate(currency[selectedCurrency.code.toLowerCase()]);

      return currency;
    } catch (error) {
      console.error(error);
    } finally {
      setCanCalc(true);
    }
  };

  React.useEffect(() => {
    // console.log('currencyFrom: ', currencyFrom);
    // console.log('currencyTo: ', currencyTo);

    getCurrencyRate(currencyFrom);
  }, []);

  const calc = (type: 'from' | 'to', value = 1) => {
    if (type === 'from') {
      const rate = currencyRate[currencyTo.code.toLowerCase()];

      const rateXamount: number = value * rate;
      setValueTo(rateXamount.toFixed(2) === '0.00' ? '' : rateXamount.toFixed(2));
    } else {
      const rate = currencyRate[currencyTo.code.toLowerCase()];

      const rateXamount: number = value / rate;

      // rateXamount.toPrecision(4);
      setValueFrom(rateXamount.toFixed(2) === '0.00' ? '' : rateXamount.toFixed(2));
    }
  };
  return (
    <KeyboardAvoidingView
      style={defaultStyles.container}
      behavior="height"
      keyboardVerticalOffset={80}>
      <Text style={defaultStyles.header}>Currency Exchange</Text>

      <View style={styles.inputContainer}>
        <CurrencyPickerComponent
          enable
          onSelectCurrency={(data: Currency) => {
            setCurrencyFrom(data);

            getCurrencyRate(data);
            setValueFrom('');
            setValueTo('');
            // console.log('DATA', data);
            // console.log('DATA', currencyFrom.name);
          }}
          darkMode={darkMode}
          title="Currency"
          searchPlaceholder="Search"
          showCloseButton
          showModalTitle
          showNativeSymbol
          showSymbol={false}
          currencyCode={currencyFrom.code}
          showFlag
          showCurrencyName={false}
          showCurrencyCode
          containerStyle={{
            container: [
              {
                backgroundColor: Colors.light.lightGray,
                padding: 20,
                borderRadius: 16,
                fontSize: 20,
                marginRight: 10,
              },
              canCalc ? styles.enabled : styles.disabled,
            ],
            flagWidth: 25,
            currencyCodeStyle: {},
            currencyNameStyle: {},
            symbolStyle: {},
            symbolNativeStyle: {
              display: 'none',
            },
          }}
          modalStyle={{
            container: {},
            searchStyle: {},
            tileStyle: {},
            itemStyle: {
              itemContainer: {},
              flagWidth: 25,
              currencyCodeStyle: {},
              currencyNameStyle: {},
              symbolStyle: {},
              symbolNativeStyle: {},
            },
          }}
        />
        <TextInput
          onChangeText={(Text: string) => {
            setValueFrom(Text);

            calc('from', +Text);
          }}
          style={[styles.input, { flex: 1 }, canCalc ? styles.enabled : styles.disabled]}
          placeholder="From Value"
          placeholderTextColor={Colors.light.gray}
          keyboardType="numeric"
          value={valueFrom}
        />
      </View>
      <View style={styles.inputContainer}>
        <CurrencyPickerComponent
          enable
          onSelectCurrency={(data: Currency) => {
            setCurrencyTo(data);

            setValueFrom('');
            setValueTo('');
            // calc('from');

            // console.log('DATA', data);
            // console.log('DATA', currencyTo.name);
          }}
          darkMode={darkMode}
          title="Currency"
          searchPlaceholder="Search"
          showCloseButton
          showModalTitle
          showNativeSymbol
          showSymbol={false}
          currencyCode={currencyTo.code}
          showFlag
          showCurrencyName={false}
          showCurrencyCode
          containerStyle={{
            container: [
              {
                backgroundColor: Colors.light.lightGray,
                padding: 20,
                borderRadius: 16,
                fontSize: 20,
                marginRight: 10,
              },
              canCalc ? styles.enabled : styles.disabled,
            ],
            flagWidth: 25,
            currencyCodeStyle: {},
            currencyNameStyle: {},
            symbolStyle: {},
            symbolNativeStyle: {
              display: 'none',
            },
          }}
          modalStyle={{
            container: {},
            searchStyle: {},
            tileStyle: {},
            itemStyle: {
              itemContainer: {},
              flagWidth: 25,
              currencyCodeStyle: {},
              currencyNameStyle: {},
              symbolStyle: {},
              symbolNativeStyle: {},
            },
          }}
        />
        <TextInput
          onChangeText={(Text: string) => {
            setValueTo(Text);
            calc('to', +Text);
          }}
          style={[styles.input, { flex: 1 }, canCalc ? styles.enabled : styles.disabled]}
          placeholder="To Value"
          placeholderTextColor={Colors.light.gray}
          keyboardType="numeric"
          value={valueTo}
        />
      </View>

      <Switch
        onToggle={() => setDarkMode(!darkMode)}
        size="lg"
        isDisabled={false}
        trackColor={{ false: Colors.light.gray, true: Colors.light.primary }}
        thumbColor={Colors.light.lightGray}
        ios_backgroundColor={Colors.light.lightGray}
        value={darkMode}
      />

      <Text
        style={{
          fontSize: 18,
          color: Colors.light.gray,
          marginTop: 'auto',
          marginBottom: 40,
          textAlign: 'center',
        }}>
        Last Update: {lastUpdate}
      </Text>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.light.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.light.lightGray,
  },
  disabled: {
    backgroundColor: Colors.light.lightGray,
    opacity: 0.5,
  },
});

export default Index;
