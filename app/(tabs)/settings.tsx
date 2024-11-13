import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EventSource from 'react-native-event-source';
import Dashboard from './Dashboard';

// Define instrument tokens with respective IDs
const instrumentTokens = {
    SENSEX: 265,         // BSE:SENSEX
    NIFTY_50: 256265,    // NSE:NIFTY 50
    BANKNIFTY: 260105,   // NSE:BANKNIFTY
};

// Initial dummy data displayed on the cards
const initialData = [
    { name: 'SENSEX', price: 'Loading...', change: '0.00' },
    { name: 'NIFTY 50', price: 'Loading...', change: '0.00' },
    { name: 'BANKNIFTY', price: 'Loading...', change: '0.00' }
];

const SettingsScreen = () => {
    const [tickData, setTickData] = useState(initialData);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:4000/fetchIndexTicks');

        eventSource.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            const updatedTicks = data.data.map(tick => ({
                name: getInstrumentName(tick.instrument_token),
                price: tick.last_price.toFixed(2),
                change: tick.change.toFixed(2)
            }));

            setTickData(prevData =>
                prevData.map(item =>
                    updatedTicks.find(t => t.name === item.name) || item
                )
            );
        });

        return () => {
            eventSource.close();
        };
    }, []);

    const getInstrumentName = (token) => {
        switch (token) {
            case instrumentTokens.SENSEX: return 'SENSEX';
            case instrumentTokens.NIFTY_50: return 'NIFTY 50';
            case instrumentTokens.BANKNIFTY: return 'BANKNIFTY';
            default: return 'Unknown';
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.tickerRow}>
                {tickData.map((tick, index) => (
                    <View
                        key={index}
                        style={[
                            styles.tickerCard,
                            parseFloat(tick.change) > 0 ? styles.positive : styles.negative
                        ]}
                    >
                        <Text style={styles.tickerName}>{tick.name}</Text>
                        <Text style={styles.price}>₹{tick.price}</Text>
                        <Text style={[
                            styles.change,
                            parseFloat(tick.change) > 0 ? styles.positiveText : styles.negativeText
                        ]}>
                            {tick.change}%
                        </Text>
                    </View>
                ))}
            </View>
       
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
       
    },
    tickerRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    tickerCard: {
        width: '30%',
        margin: 5,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 3,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    tickerName: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    price: {
        fontSize: 14,
        textAlign: 'center',
    },
    change: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    positive: {
        borderColor: 'green',
        borderWidth: 1,
    },
    negative: {
        borderColor: 'red',
        borderWidth: 1,
    },
    positiveText: {
        color: 'green',
    },
    negativeText: {
        color: 'red',
    },
});

export default SettingsScreen;
