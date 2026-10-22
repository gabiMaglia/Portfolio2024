export const AR_TZ = 'America/Argentina/Buenos_Aires';

const fmt = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: AR_TZ });

export const formatArTime = (date) => fmt.format(date);

export const msUntilNextMinute = (now) => 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
