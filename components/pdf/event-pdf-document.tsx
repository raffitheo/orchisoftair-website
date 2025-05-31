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
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import Event from '@/types/event';

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
  eventDetails: {
    backgroundColor: '#3a3a3a1a',
    border: `1px solid ${COLORS.orchiGray}`,
    borderRadius: 3.6,
    padding: 18,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    color: COLORS.orchiGold,
    letterSpacing: 0.6,
    lineHeight: 1.68,
    fontFamily: 'Bebas Neue',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  listItemContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
  },
  bullet: {
    backgroundColor: COLORS.orchiLight,
    borderRadius: 3.6,
    height: 3.6,
    marginLeft: 12,
    marginRight: 7.2,
    marginTop: 4.8,
    width: 3.6,
  },
  scheduleTime: {
    fontWeight: '700',
    color: COLORS.orchiRed,
    width: 72,
  },
});

type Props = {
  event: Event;
};

const EventPdfDocument = ({ event }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
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
      </Page>

      <Page size="A4" style={styles.page} wrap>
        <View style={styles.eventDetails}>
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: COLORS.orchiLight,
                  fontSize: 18,
                  lineHeight: 1.56,
                  marginBottom: 12,
                },
              ]}
            >
              Descrizione
            </Text>

            <Text>{event.description?.replace(/\\n/g, '\n')}</Text>
          </View>

          {event.rules && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Regolamento</Text>

              {event.rules.map((rule, ruleIndex) => (
                <View style={styles.listItemContainer} key={ruleIndex}>
                  <View style={styles.bullet} />

                  <Text
                    style={{
                      marginBottom:
                        ruleIndex !== event.rules.length - 1 ? 3 : 0,
                    }}
                  >
                    {rule}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {event.schedule && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Programma</Text>

              {event.schedule.map((schedule, scheduleIndex) => (
                <View
                  style={[
                    styles.listItemContainer,
                    {
                      borderBottom: `1px solid ${COLORS.orchiGray}`,
                      paddingBottom: 6,
                      marginBottom:
                        scheduleIndex !== event.schedule.length - 1 ? 6 : 0,
                    },
                  ]}
                  key={scheduleIndex}
                >
                  <Text style={styles.scheduleTime}>{schedule.time}</Text>

                  <Text>{schedule.activity}</Text>
                </View>
              ))}
            </View>
          )}

          {event.equipment && (
            <View style={[styles.section, { marginBottom: 0 }]}>
              <Text style={styles.sectionTitle}>Equipaggiamento Richiesto</Text>

              {event.equipment.map((equipment, equipmentIndex) => (
                <View style={styles.listItemContainer} key={equipmentIndex}>
                  <View style={styles.bullet} />

                  <Text
                    style={{
                      marginBottom:
                        equipmentIndex !== event.equipment.length - 1 ? 3 : 0,
                    }}
                  >
                    {equipment}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default EventPdfDocument;
