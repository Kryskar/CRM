/* eslint-disable */

export interface GoogleCalendarEventsList {
  accessRole: string;
  defaultReminders: DefaultReminder[];
  description: string;
  etag: string;
  items: GoogleCalendarEventsListItem[];
  kind: string;
  nextSyncToken?: string;
  nextPageToken?: string;
  summary: string;
  timeZone: string;
  updated: string;
}

interface DefaultReminder {
  method: string;
  minutes: number;
}

export interface GoogleCalendarEventsListItem {
  attendees?: Attendee[];
  created: string;
  creator: Creator;
  description?: string;
  end: End;
  etag: string;
  eventType: string;
  guestsCanInviteOthers?: boolean;
  htmlLink: string;
  iCalUID: string;
  id: string;
  kind: string;
  location?: string;
  organizer: Organizer;
  privateCopy?: boolean;
  reminders: Reminders;
  sequence: number;
  source?: Source;
  start: Start;
  status: string;
  summary: string;
  transparency?: string;
  updated: string;
  visibility?: string;
}

interface Creator {
  email: string;
  self: boolean;
}

interface Organizer {
  displayName?: string;
  email: string;
}

interface Start {
  date?: string;
  dateTime?: string;
  timeZone?: string;
}

interface End {
  date?: string;
  dateTime?: string;
  timeZone?: string;
}

interface Attendee {
  email: string;
  responseStatus: string;
  self: boolean;
}

interface Reminders {
  overrides?: Override[];
  useDefault: boolean;
}

interface Override {
  method: string;
  minutes: number;
}

interface Source {
  title: string;
  url: string;
}
