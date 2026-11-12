import { CLOUD_NAME } from '../config/cloudinary'

// ─── Where enquiries go ──────────────────────────────────────────
// TODO: real numbers/emails from the owner (WhatsApp: country code, no + or spaces)
export const CONTACT = {
  events: { whatsapp: '2348012345678', email: 'hello@renzowsevents.com' },
  sets:   { whatsapp: '2348012345678', email: 'sets@renzowsevents.com' },
}

// Still from one of our own event videos, for the vibe cards
const still = (id, so) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_${so},w_400,q_auto,f_auto/${id}.jpg`

// ─── "Plan your event" steps ─────────────────────────────────────
// Edit freely: each step is one question; options are tap-to-choose.
// An option can show a photo (img) or colour dots (swatch), or just text.
// The last step (name + WhatsApp number) is added automatically.
export const PLAN_FLOWS = {
  events: {
    title: 'Plan your event',
    steps: [
      {
        key: 'Occasion',
        q: 'What are we celebrating?',
        hint: 'Pick one. We design all of these.',
        options: [
          { label: 'Wedding' },
          { label: 'Birthday' },
          { label: 'Corporate' },
          { label: 'Private dinner' },
          { label: 'Something else' },
        ],
      },
      {
        key: 'When',
        q: 'When is the big day?',
        hint: 'Roughly is fine for now.',
        options: [
          { label: 'Within 3 months' },
          { label: '3 to 6 months' },
          { label: '6+ months' },
          { label: 'Not sure yet' },
        ],
      },
      {
        key: 'Guests',
        q: 'How many guests?',
        hint: 'Your best guess.',
        options: [
          { label: 'Under 50' },
          { label: '50 to 150' },
          { label: '150 to 300' },
          { label: '300+' },
        ],
      },
      {
        key: 'Vibe',
        q: 'Pick a vibe',
        hint: 'Which room would you walk into?',
        options: [
          { label: 'Romantic florals',  img: still('Caleb_and_Faith_s_love_story_beautifully_designed_Event_Decor-_renzowseventdesignEvent_Planner_xvs2vu', 3) },
          { label: 'Glam and gold',     img: still('A_decor_vision_inspired_by_MummyD_modelefatoyinbo_captured_and_executed_by_us_renzowseventdesi_iol4il', 0) },
          { label: 'Bold and colourful', img: still('Zeitoun_s_21st_renzowseventdesign_abujaeventplanner_eventplannerinabuja_eventdecor_events_tzgnio', 0) },
          { label: 'Soft and minimal',  img: still('From_the_lighting_to_the_layout_every_detail_plays_its_part._Creating_a_dinner_setup_that_feels_umlvua', 3) },
        ],
      },
    ],
  },
  sets: {
    title: 'Plan your shoot',
    steps: [
      {
        key: 'Shoot',
        q: 'What are you shooting?',
        hint: 'Pick the closest.',
        options: [
          { label: 'Portraits' },
          { label: 'Fashion' },
          { label: 'Brand / commercial' },
          { label: 'Editorial' },
          { label: 'Something else' },
        ],
      },
      {
        key: 'Need',
        q: 'What do you need?',
        hint: 'We can do either, or both.',
        options: [
          { label: 'A full set' },
          { label: 'Props only' },
          { label: 'Set and props' },
          { label: 'Not sure yet' },
        ],
      },
      {
        key: 'When',
        q: 'When is the shoot?',
        hint: 'Roughly is fine for now.',
        options: [
          { label: 'Within 2 weeks' },
          { label: 'This month' },
          { label: 'Later' },
          { label: 'Not sure yet' },
        ],
      },
      {
        key: 'Vibe',
        q: 'Pick a mood',
        hint: 'What should the frame feel like?',
        options: [
          { label: 'Florals and disco', swatch: ['#f6badd', '#c9c9c9', '#4c7a3d'] },
          { label: 'Soft and dreamy',   swatch: ['#fbe9f2', '#e8d5f5', '#ffffff'] },
          { label: 'Bold and colourful', swatch: ['#d4006e', '#6b2fa0', '#f2a900'] },
          { label: 'Clean and minimal', swatch: ['#f6f5f3', '#cbcbc7', '#181818'] },
        ],
      },
    ],
  },
}

/** The message sent to WhatsApp / email. Kept pure so it's easy to check. */
export function buildBrief(brand, answers, name, phone) {
  const lines = PLAN_FLOWS[brand].steps
    .filter((s) => answers[s.key])
    .map((s) => `${s.key}: ${answers[s.key]}`)
  return [
    brand === 'sets' ? "Hi SetsByRenzows! I'd like to book a set." : "Hi Renzows! I'd like to plan an event.",
    '',
    ...lines,
    `Name: ${name}`,
    `WhatsApp: ${phone}`,
  ].join('\n')
}
