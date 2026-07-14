/**
 * Class-specific template sections for Masks: A New Generation, appended to the
 * shared `base.json` template at seed time (see prisma/seed.ts).
 *
 * Content is based on Masks: A New Generation (Brendan Conway, Magpie Games),
 * whose text is released under CC BY 4.0. Labels, Conditions, Influence and each
 * playbook's distinctive mechanic (the Beacon's Drives, the Bull's Love/Rival,
 * the Nova's Burn & Flares, the Legacy's lineage) are modeled faithfully. The
 * specific *lists* of playbook moves are left as free-entry fields rather than
 * enumerated, since they could not be verified from an open source at authoring
 * time — fill them in from the CC-BY text when available.
 */
export const masksPlaybookSpecificSections: Record<string, any[]> = {
  Beacon: [
    {
      id: "class_details",
      title: "The Beacon",
      description: "You have no powers, but you have heart. You're here to be a hero and prove you belong.",
      fields: [
        { id: "playbook_moves", label: "Playbook Moves", type: "TEXTAREA", defaultValue: "" },
        { id: "drives", label: "Drives", type: "TEXTAREA", description: "Goals you chase to prove yourself. Mark one off to mark potential.", defaultValue: "" }
      ]
    }
  ],

  Bull: [
    {
      id: "class_details",
      title: "The Bull",
      description: "You were built to be a weapon, but you're free now — making your own choices and your own bonds.",
      fields: [
        { id: "playbook_moves", label: "Playbook Moves", type: "TEXTAREA", defaultValue: "" },
        { id: "bull_love", label: "The one you're sweet on (Love)", type: "TEXT", defaultValue: "" },
        { id: "bull_rival", label: "The one you compete with (Rival)", type: "TEXT", defaultValue: "" }
      ]
    }
  ],

  Nova: [
    {
      id: "class_details",
      title: "The Nova",
      description: "An endless font of power and destruction. The more you've been through, the more you can unleash.",
      fields: [
        { id: "playbook_moves", label: "Playbook Moves", type: "TEXTAREA", defaultValue: "" },
        { id: "burn", label: "Burn", type: "COUNTER", defaultValue: 0 },
        { id: "flares", label: "Flares", type: "TEXTAREA", description: "The powers you channel through your Burn.", defaultValue: "" }
      ]
    }
  ],

  Legacy: [
    {
      id: "class_details",
      title: "The Legacy",
      description: "You carry a superheroic family name and everything it expects of you.",
      fields: [
        { id: "playbook_moves", label: "Playbook Moves", type: "TEXTAREA", defaultValue: "" },
        { id: "legacy_name", label: "The Legacy", type: "TEXT", description: "The lineage or family name you inherited.", defaultValue: "" },
        { id: "expectations", label: "Expectations", type: "TEXTAREA", description: "What your Legacy demands of you.", defaultValue: "" }
      ]
    }
  ]
};
