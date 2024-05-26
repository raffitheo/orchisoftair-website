import Accordion from '@components/accordion';
import Footer from '@components/footer';
import dayjs from 'dayjs';
import { HTMLAttributes, forwardRef } from 'react';

import LorePattern from '../../assets/lore-pattern.webp';

import './faq.sass';

export interface FrequentlyAskedQuestionsProps
    extends HTMLAttributes<HTMLDivElement> {}

const FrequentlyAskedQuestions = forwardRef<
    HTMLDivElement,
    FrequentlyAskedQuestionsProps
>(({ ...props }, ref) => {
    return (
        <div ref={ref} {...props}>
            <div className="faq-container">
                <div className="faq-header-box2">
                    <div className="faq-banner-box">
                        <div className="faq-header-banner">
                            <div className="faq-header">
                                <div className="back-button">
                                    <a href="/">Torna alla home</a>
                                </div>
                            </div>

                            <div>
                                <h1>FAQ - FEQUENTLY ASKED QUESTIONS</h1>
                                <div className="banner-date">
                                    {formatDate(new Date('2024-05-24'))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="faq-main-container"
                    style={{
                        background: `url(${LorePattern}) no-repeat 50%`,
                    }}
                >
                    <div className="faq-main-box">
                        <p>
                            In questa sezione cercheremo di rispondere alle
                            domande più frequenti che ci vengono poste. Non
                            esitare a contattarci per qualsiasi ulteriore
                            domanda o chiarimento!
                        </p>

                        <Accordion
                            content="Il softair è un'attività ludico-sportiva in cui i partecipanti simulano operazioni militari utilizzando repliche di armi da fuoco che sparano pallini di plastica (BB). Questi pallini, solitamente di 6 mm di diametro, sono spinti da aria compressa e\o elettricità.<br />Le partite di softair possono variare da semplici scontri a scenari complessi con obiettivi specifici.<br />Gli appassionati indossano spesso abbigliamento militare e utilizzano tattiche di squadra, rendendo il gioco un'esperienza realistica ma sicura."
                            title="Cos'è il softair?"
                        />

                        <Accordion
                            content="Gli Orchi sono un'Associazione Sportiva Dilettantistica (A.S.D.) fondata a Trieste, Friuli-Venezia Giulia, nel 2007. Come suggerisce il nome, l'Associazione è dedicata esclusivamente al softair, offrendo ai suoi soci l'opportunità di praticare questa attività in modo sicuro, organizzato e appassionante."
                            title="Chi sono gli Orchi?"
                        />

                        <Accordion
                            content="Se non siamo invitati a tornei e\o amichevoli con altre squadre, giochiamo in uno dei due campi a nostra disposizione. Entrambi i nostri campi sono situati nel carso triestino, si trattano quindi di aree boschive."
                            title="Dove giocate?"
                        />

                        <Accordion
                            content="Di norma, giochiamo tutte le domeniche mattina, a meno che non ci siano imprevisti o esigenze particolari. Inoltre, partecipiamo regolarmente a tornei e amichevoli con altre squadre, potendo richiedere un maggiore impegno di tempo."
                            title="Quando giocate?"
                        />

                        <Accordion
                            content="Per contattarci, puoi inviare un messaggio privato sulla nostra pagina Facebook o Instagram, oppure puoi inviarci un'email. Organizzeremo con piacere un primo incontro di persona per conoscerci e compilare insieme il modulo per l'assicurazione giornaliera. Una volta completato questo passaggio, sarai pronto per partecipare alle nostre sessioni di gioco.<br />Ricorda, le prime due prove sono sempre gratuite!"
                            title="Come mi unisco a voi?"
                        />

                        <Accordion
                            content="Per partecipare alle prove, non è necessario avere nulla di particolare, solo la voglia di giocare e divertirsi! Forniamo noi le repliche e i pallini. Se hai bisogno, possiamo anche fornirti gli occhiali protettivi, obbligatori per giocare, ma ti consigliamo di procurarteli da solo.<br />Non c'è bisogno di un abbigliamento specifico, basta qualcosa di comodo per muoverti agilmente in campo. Una tuta nera o verde e un paio di scarpe da trekking saranno più che sufficienti.<br />Dopo le prove, se decidi di iscriverti, ti consigliamo di acquistare al più presto la tua prima replica. I pallini possono essere acquistati direttamente dall'Associazione (senza alcun markup, al costo di acquisto) o puoi portare i tuoi."
                            title="Cosa mi serve per giocare?"
                        />

                        <Accordion
                            content="Per partecipare alle nostre attività al di fuori delle prove, è necessario iscriversi al costo annuale di 60€, che include anche l'assicurazione. Al di fuori dell'iscrizione annuale, non sono richiesti ulteriori pagamenti all'Associazione.<br />Per alcuni eventi speciali, in cui siamo ospiti di altre squadre, potrebbe essere richiesto un contributo aggiuntivo specifico per quella giornata, richiesto dalla squadra ospitante."
                            title="Quanto costa giocare?"
                        />

                        <div className="content-creators"></div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );

    function formatDate(date: Date): string {
        const newDate = dayjs(date);
        const months = [
            'gennaio',
            'febbraio',
            'marzo',
            'aprile',
            'maggio',
            'giugno',
            'luglio',
            'agosto',
            'settembre',
            'ottobre',
            'novembre',
            'dicembre',
        ];

        const day = newDate.date();
        const month = months[newDate.month()];
        const year = newDate.year();

        return `${day} ${month} ${year}`;
    }
});
FrequentlyAskedQuestions.displayName = 'FrequentlyAskedQuestions';

export default FrequentlyAskedQuestions;
