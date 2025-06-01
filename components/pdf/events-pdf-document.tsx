'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Path,
  Rect,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import Event from '@/types/event';
import { supabase } from '@/lib/supabase';
import dayjs from 'dayjs';
import 'dayjs/locale/it';

Font.register({
  family: 'Anton',
  src: '/fonts/Anton-Regular.ttf',
});

Font.register({
  family: 'Bebas Neue',
  src: '/fonts/BebasNeue-Regular.ttf',
});

const COLORS = {
  orchiRed: '#8b0000',
  orchiGold: '#b8860b',
  orchiLight: '#d0c0a0',
  orchiGray: '#3a3a3a',
  background: '#121212',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.background,
    color: '#d0c0a0cc',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 24,
  },
  eventType: {
    paddingBottom: 3.6,
    paddingLeft: 9,
    paddingRight: 9,
    paddingTop: 3.6,
  },
  eventTypeText: {
    color: '#fff',
    fontSize: 9,
  },
  header: {
    fontSize: 40,
    fontFamily: 'Anton',
    fontWeight: '900',
    color: COLORS.orchiLight,
    textTransform: 'uppercase',
  },
  infoContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  infoText: {
    color: COLORS.orchiGold,
  },
});

const EventsPDFDocument = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte(
          'start_date',
          new Date(`01 01 ${new Date().getFullYear()}`).toISOString(),
        )
        .order('start_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {events.map((event) => (
          <View key={event.id}>
            <View
              style={[
                styles.eventType,
                {
                  backgroundColor:
                    event?.event_type === 'tournament'
                      ? COLORS.orchiRed
                      : event?.event_type === 'training'
                        ? COLORS.orchiGold
                        : COLORS.orchiGray,
                  marginTop: 'auto',
                },
              ]}
            >
              <Text style={styles.eventTypeText}>
                {event.event_type === 'tournament'
                  ? 'TORNEO'
                  : event.event_type === 'training'
                    ? 'ALLENAMENTO'
                    : 'PARTITA'}
              </Text>
            </View>

            <Text style={styles.header}>{event.title}</Text>

            <View style={[styles.infoContainer, { marginBottom: 'auto' }]}>
              <Svg
                fill="none"
                height="20"
                stroke={COLORS.orchiRed}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                style={{ marginRight: 6 }}
                viewBox="0 0 24 24"
                width="20"
              >
                <Path d="M8 2v4" />
                <Path d="M16 2v4" />
                <Rect height="18" rx="2" width="18" x="3" y="4" />
                <Path d="M3 10h18" />
              </Svg>

              <Text style={styles.infoText}>
                {dayjs(event.start_date)
                  .locale('it')
                  .format('DD MMM YYYY')
                  .toUpperCase()}
                {event.end_date
                  ? ` - ${dayjs(event.end_date).locale('it').format('DD MMM YYYY').toUpperCase()}`
                  : ''}
              </Text>

              <Text style={{ paddingHorizontal: 6 }}>•</Text>

              <Text style={[styles.infoText, { color: COLORS.orchiLight }]}>
                {event.location}
              </Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default EventsPDFDocument;
