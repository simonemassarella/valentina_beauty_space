import { google } from 'googleapis';

const calendar = google.calendar('v3');

function getAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google service account non configurato');
  }

  return new google.auth.JWT(clientEmail, undefined, privateKey, [
    'https://www.googleapis.com/auth/calendar',
  ]);
}

export async function createCenterCalendarEvent(params: {
  summary: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  timezone: string;
}) {
  const { summary, description, startDateTime, endDateTime, timezone } = params;

  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID non configurato');
  }

  const auth = getAuth();

  await calendar.events.insert({
    auth,
    calendarId,
    requestBody: {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: timezone,
      },
      end: {
        dateTime: endDateTime,
        timeZone: timezone,
      },
    },
  });
}
