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
  ],

  Devoted: [
    {
      id: "class_details",
      title: "The Devoted",
      description: "Your loyalty is your strength and your weakness — you'd sacrifice anything for what you believe in.",
      fields: [
        {
          id: "playbook_moves",
          label: "Playbook Moves",
          type: "CHECKBOX",
          options: [
            { label: "Fanatical Self-Sacrifice", value: "fanatical_self_sacrifice" },
            { label: "For the Cause!", value: "for_the_cause" },
            { label: "Gallant Rescue", value: "gallant_rescue" },
            { label: "Power of Conviction", value: "power_of_conviction" },
            { label: "Lay on Hands", value: "lay_on_hands" },
            { label: "Loyal Steed", value: "loyal_steed" },
            { label: "Toxic Devotion", value: "toxic_devotion" },
            { label: "Last Stand", value: "last_stand" }
          ]
        },
        { id: "devotion", label: "Devotion", type: "TEXT", description: "What you're devoted to: a cause, a person, or a higher power.", defaultValue: "" },
        { id: "tenets", label: "Tenets", type: "TEXTAREA", description: "Three tenets of your devotion you're tempted to violate.", defaultValue: "" }
      ]
    }
  ],

  Infamous: [
    {
      id: "class_details",
      title: "The Infamous",
      description: "You have a wicked past you're trying to leave behind — but no one lets you forget it.",
      fields: [
        {
          id: "playbook_moves",
          label: "Playbook Moves",
          type: "CHECKBOX",
          options: [
            { label: "Wicked Past", value: "wicked_past" },
            { label: "Make It Right", value: "make_it_right" },
            { label: "Always Suspect", value: "always_suspect" },
            { label: "Talons of the Past", value: "talons_of_the_past" },
            { label: "They Can Change, Too", value: "they_can_change_too" },
            { label: "Used to Disappointment", value: "used_to_disappointment" },
            { label: "What Makes a Home", value: "what_makes_a_home" },
            { label: "Who's the Monster?", value: "whos_the_monster" },
            { label: "Undeserving", value: "undeserving" },
            { label: "Your Wicked Heart", value: "your_wicked_heart" }
          ]
        },
        { id: "vow", label: "Vow", type: "TEXTAREA", description: "The harmful acts you swear never to commit again.", defaultValue: "" },
        { id: "past", label: "Your wicked past", type: "TEXTAREA", description: "What you did that cannot be undone.", defaultValue: "" }
      ]
    }
  ],

  "Nature Witch": [
    {
      id: "class_details",
      title: "The Nature Witch",
      description: "You draw power from the living world and the bonds of love that grow within it.",
      fields: [
        {
          id: "playbook_moves",
          label: "Playbook Moves",
          type: "CHECKBOX",
          options: [
            { label: "Wild Friends", value: "wild_friends" },
            { label: "Awaken the Wild", value: "awaken_the_wild" },
            { label: "Familiar", value: "familiar" },
            { label: "I Ship It", value: "i_ship_it" },
            { label: "The Magic of Love", value: "the_magic_of_love" },
            { label: "Nature's Touch", value: "natures_touch" }
          ]
        },
        { id: "familiar", label: "Familiar", type: "TEXT", description: "Your animal companion.", defaultValue: "" },
        { id: "trials", label: "Trials", type: "TEXTAREA", description: "Four trials you're working to complete.", defaultValue: "" }
      ]
    }
  ],

  "Spooky Witch": [
    {
      id: "class_details",
      title: "The Spooky Witch",
      description: "You keep company with the weird and the unseen, and pay the price in belonging.",
      fields: [
        {
          id: "playbook_moves",
          label: "Playbook Moves",
          type: "CHECKBOX",
          options: [
            { label: "The Unseen", value: "the_unseen" },
            { label: "I Like Snails!", value: "i_like_snails" },
            { label: "Astral Dance", value: "astral_dance" },
            { label: "Divination", value: "divination" },
            { label: "Dreamwalk", value: "dreamwalk" },
            { label: "Eerie Companion", value: "eerie_companion" },
            { label: "Friends in Weird Places", value: "friends_in_weird_places" },
            { label: "Talk Nerdy to Me", value: "talk_nerdy_to_me" },
            { label: "Witchfire", value: "witchfire" }
          ]
        },
        { id: "the_unseen", label: "The Unseen", type: "TEXTAREA", description: "The mysterious entity you commune with.", defaultValue: "" }
      ]
    }
  ],

  Trickster: [
    {
      id: "class_details",
      title: "The Trickster",
      description: "You hide your heart behind a clever mask — until you can't hold it in any longer.",
      fields: [
        {
          id: "playbook_moves",
          label: "Playbook Moves",
          type: "CHECKBOX",
          options: [
            { label: "Ew, Feelings", value: "ew_feelings" },
            { label: "The Mask", value: "the_mask" },
            { label: "Center of the Web", value: "center_of_the_web" },
            { label: "Deft Fingers", value: "deft_fingers" },
            { label: "Devious Scheme", value: "devious_scheme" },
            { label: "Knives behind the Mask", value: "knives_behind_the_mask" },
            { label: "Play the Part", value: "play_the_part" }
          ]
        },
        { id: "the_mask", label: "The Mask", type: "TEXT", description: "The persona you present to the world.", defaultValue: "" },
        { id: "too_many_feelings", label: "Too Many Feelings", type: "PROGRESS", description: "0-4. At 4 you tear off the mask and let it all out, then reset.", defaultValue: 0, maxValue: 4 }
      ]
    }
  ]
};
