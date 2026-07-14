/**
 * Class-specific template sections for Thirsty Sword Lesbians, appended to the
 * shared `base.json` template at seed time (see prisma/seed.ts).
 *
 * Content is based on the Thirsty Sword Lesbians SRD (poweredbylesbians.com),
 * by April Kit Walsh / Evil Hat, licensed under CC BY-SA 4.0. Playbook move
 * names are transcribed from the SRD; each playbook's signature mechanic (the
 * Beast's Feral track, the Chosen's Destiny, the Scoundrel's Smitten, the
 * Seeker's Tradition & Authority) is modeled as its own field.
 *
 * Note: CC BY-SA is copyleft — shipped content derived from TSL carries the
 * ShareAlike obligation plus attribution.
 */
export const thirstySwordLesbiansPlaybookSpecificSections: Record<string, any[]> = {
  Beast: [
    {
      id: "class_details",
      title: "The Beast",
      description: "You follow your truth and your instincts, torn between assimilation and authenticity.",
      fields: [
        {
          id: "playbook_moves",
          label: "Playbook Moves",
          type: "CHECKBOX",
          options: [
            { label: "Transform", value: "transform" },
            { label: "Big Dyke Energy", value: "big_dyke_energy" },
            { label: "Ferocious", value: "ferocious" },
            { label: "Shameless", value: "shameless" },
            { label: "Tenacious Purpose", value: "tenacious_purpose" },
            { label: "Tracker", value: "tracker" },
            { label: "Smitten Kitten", value: "smitten_kitten" },
            { label: "The Bloody Truth", value: "the_bloody_truth" }
          ]
        },
        { id: "feral_track", label: "Feral Track", type: "PROGRESS", description: "0-4, starts at 1. At 4 you must Transform.", defaultValue: 1, maxValue: 4 }
      ]
    }
  ],

  Chosen: [
    {
      id: "class_details",
      title: "The Chosen",
      description: "Your inner truth against the crushing weight of a destiny others wrote for you.",
      fields: [
        {
          id: "playbook_moves",
          label: "Playbook Moves",
          type: "CHECKBOX",
          options: [
            { label: "The Fated Day Approaches", value: "the_fated_day_approaches" },
            { label: "Don't You Know Who I Am?", value: "dont_you_know_who_i_am" },
            { label: "Entourage", value: "entourage" },
            { label: "Gossip", value: "gossip" },
            { label: "Guidance from Above", value: "guidance_from_above" },
            { label: "Help Me~!", value: "help_me" },
            { label: "Know Your Place!", value: "know_your_place" },
            { label: "Love Is Not My Destiny", value: "love_is_not_my_destiny" },
            { label: "Inescapable Conclusions", value: "inescapable_conclusions" }
          ]
        },
        { id: "destiny", label: "Destiny", type: "TEXT", description: "The fate you will fulfill or reject.", defaultValue: "" },
        { id: "destiny_aspects", label: "Destiny Aspects", type: "TEXTAREA", description: "Two Heroic and two Tragic aspects.", defaultValue: "" }
      ]
    }
  ],

  Scoundrel: [
    {
      id: "class_details",
      title: "The Scoundrel",
      description: "The urge to chase new horizons against the pull of purpose and security.",
      fields: [
        {
          id: "playbook_moves",
          label: "Playbook Moves",
          type: "CHECKBOX",
          options: [
            { label: "Living in the Moment", value: "living_in_the_moment" },
            { label: "Heat of the Moment", value: "heat_of_the_moment" },
            { label: "Lust at First Sight", value: "lust_at_first_sight" },
            { label: "Shiny and New", value: "shiny_and_new" },
            { label: "Better to Seek Forgiveness", value: "better_to_seek_forgiveness" },
            { label: "Fools Rush In", value: "fools_rush_in" },
            { label: "Impressive Swordplay", value: "impressive_swordplay" },
            { label: "The Main Attraction", value: "the_main_attraction" },
            { label: "One in Every Port", value: "one_in_every_port" },
            { label: "Rrrip!", value: "rrrip" },
            { label: "To Love and Lose", value: "to_love_and_lose" },
            { label: "Repartee", value: "repartee" }
          ]
        },
        { id: "smitten", label: "Smitten with", type: "TEXT", description: "Who has caught your eye right now.", defaultValue: "" }
      ]
    }
  ],

  Seeker: [
    {
      id: "class_details",
      title: "The Seeker",
      description: "Shaped by a rigid upbringing you are now questioning, one commandment at a time.",
      fields: [
        {
          id: "playbook_moves",
          label: "Playbook Moves",
          type: "CHECKBOX",
          options: [
            { label: "People Are People", value: "people_are_people" },
            { label: "Hear Me!", value: "hear_me" },
            { label: "It Wasn't All Bad", value: "it_wasnt_all_bad" },
            { label: "Listen and Learn", value: "listen_and_learn" },
            { label: "Proper Courtship", value: "proper_courtship" },
            { label: "Silly Tourist", value: "silly_tourist" },
            { label: "Stiff Upper Lip", value: "stiff_upper_lip" }
          ]
        },
        { id: "authority", label: "Authority", type: "TEXT", description: "The society that raised and constrained you.", defaultValue: "" },
        { id: "tradition_track", label: "Tradition Track", type: "PROGRESS", description: "0-4 alignment with your Authority's expectations.", defaultValue: 0, maxValue: 4 },
        { id: "commandments", label: "Commandments & Convictions", type: "TEXTAREA", description: "The rules you were raised with; cross off those you repudiate.", defaultValue: "" }
      ]
    }
  ]
};
