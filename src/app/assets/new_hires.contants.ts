export const PAST = [
    'were adopted by a blood cult',
    'barely survived traumatic relationship',
    'are a murderer on the run',
    'were a victim of identity theft',
    'lost something important',
    'suffer from a family curse',
    'are part of a damning conspiracy',
    'lost an easy, well-paying government job',
    'were voluenteered for an experimental brain transplant',
    'spent five years in coma',
    'enjoyed peaceful life, suddenly interrupted by tragedy',
    'were clinically dead for 5 minutes',
];

export const ISSUES = [
    'your confusing relationship with Martha H. from HR and her evil twin, Anastasia H. from Facilities',
    'that you\'ve been roped into overtime that just won\'t end',
]

export const REASON = [
    'you suffer from a rare illness and a need insurance',
    'have a family to support',
    'you have very low self-esteem; this is all you deserve',
    'your parents said this is what success looks like',
    'the office is close to home',
    'of the free coffee',
    'of your twisted need for an oppressive structure, like at home',
    'your weird fetish for suits',
    'your lack of ideas for a career',
    'you dream of a stable career',
    'you\'re an absolute psychopath',
    'of your submissive personality',
    'need to belong to <strong>SOMETHING</strong>',
    'of a nightmarish curse',
    'you owe a huge debt to some scary people',
    'you\'re on an espionage mission for a rival corp',
    'of cronyism, you haven\'t earned this',
    'of soul-crushing boredom',
    'of a recommendation by a supposed friend',
    'you made a grave mistake'
];

export const YEARNING = [
    'enough money to solve your problems',
    'power to make them <strong>FEAR</strong> you',
    'safety from whatever hunts you',
    'so much blood, more than anyone can imagine',
    'the thrill of adrenaline pumping through your veins',
    'the freedom to do whatever your dark heart desires',
    'forbidden knowledge that only this place can provide',
    'fulfilment by being part of winning team',
    'success that comes at the cost of others',
    'to belong to something greater than yourself',
    'the transformation that comes with work',
    'the extreme exaltation after barely making it though the workday',
    'to feel love for the first time',
    'to escape the horrors of the world and find peace within your work',
    'pleasure; material, monetary, or otherwise',
    'to experience the inter-office drama you\'ve seen on tv',
    'pain so pure that it wipes your sins clean',
    'the purity of performing a task to the letter',
    'to lose yourself in your work and go numb',
    'absolution in the form of labor',
];

export const STRESS = [
    'bite your nails until your fingertips are bloody stumps',
    'soak yourself with sweat',
    'breakout in extreme rashes',
    'yank fistfuls of your hair out',
    'scratch angry red furrows into your skin',
    'turn a lurid red',
    'get blood boilingly angry',
    'wail like banshee',
    'go completely catatonic',
    'clench your jaws so hard your teeth crack',
    'carve lines into yourself',
    'isolate yourself in the nearest, smallest space',
    'bite your lips bloody',
    'feel intense and passionate arousal',
    'stutter like a machine gun',
    'clench your chest as your heart palpatates worryingly ',
    'burst into roaring flames',
    'cry and sob uncontrollably',
    'fall over in narcoleptic slumber',
    'do not care. Stress simply doesn\'t affect you',
];

export const JOBS = [
    {
        name: 'helpdesker',
        extra: [],
        descrip: "<strong>You\'re the first one to take the hit.</strong> Not because you can necessarily endure it, but because they needed some <strong>cannon fodder</strong>. If you made it alive so far, maybe there is something more in you. <strong>“Once broken, a bone heals back stronger”</strong> after all.",
        skill_descrips: [
            'The stress of handling customer complaints gave you two of these:',
            'Each time, after taking a first hit in a fight:'
        ],
        first_skill: [
            'Loss of vision in one eye <strong>(but opened a third one?)</strong>',
            'Panic attacks <strong>(that brings visions of the future?)</strong>',
            'Constant heartburn <strong>(literal?)</strong>',
            'Tinnitus <strong>(sounds like… speech?)</strong>',
            'Weight loss <strong>(can you get into the vent now?)</strong>',
            'Insomnia <strong>(only restore d4 HP after rest)</strong>',
        ],
        second_skill: [
            'Adrenaline kicks in, <strong>gain a free counter-attack</strong>',
            'Your skin, muscles, and bones toughen, <strong>add -d2 armor for d4 rounds</strong>',
            'Pain makes you stronger, <strong>+1 damage for d6 rounds</strong>',
            '<strong>Reality shifts:</strong> mitigate all damage and teleport randomly in a 10 meter radius',
            'Black flames explode around you, <strong>damaging yourself and every enemy in sight for d4 damage</strong>',
            'Attacker becomes overwhelmed by guilt looking at your miserable face, <strong>test their Motivation (lowered by 2)</strong>',
        ],
        stats: [
            {
                name: '$avings',
                mod: '2d6x10'
            },
            {
                name: 'undos',
                mod: 'd3'
            },
            {
                name: 'hp',
                mod: '2+1'
            },
            {
                name: 'integrity',
                mod: 1
            },
            {
                name: 'flexibility',
                mod: 1
            },
            {
                name: 'soft skills',
                mod: -2
            },
        ],
    },
    {
        name: 'salesperson',
        extra: [
            '<strong class="non-clickable">Charismatic.</strong> All Soft Skills checks are <strong>-2DR</strong>.',
            '<strong class="non-clickable">Soft.</strong> All attacks hit for <strong>-1 damage</strong>.',
            '<strong class="non-clickable">Social Proof.</strong> When you kill an enemy, lower the <strong>Motivation</strong> of other enemies in the group by <strong>d2</strong>.',
        ],
        descrip:
            "They said you could sell sand to desert dwellers. Silvertongued, <strong>you easily manipulate others</strong>, so they agreed on whatever bullshit you had to offer. All it took was some bad luck and one month below the target. <strong>Now, you have nothing to lose and everything to gain.</strong>",
        skill_descrips: [
            'You are selling:',
            'Once a day, you can choose to use the one of the following tactics:'
        ],
        first_skill: [
            'Blood of stray animals.',
            'Human bones.',
            'Sentient ticks.',
            'Insight-bestowing eyes.',
            'The scent of non-existing flowers.',
            'Something called “Coins of the Two-Headed Hybrid.”',
        ],
        second_skill: [
            '<strong class="non-clickable">Foot in the Door.</strong> Both during and outside of battle, you can ask for something small (napkin, penny etc.) followed by a bigger request (for one to kill themselves, attack a friend, surrender, etc.). The first ask will be automatically successful. In the following round, test <strong>Soft Skills DR16 for the second ask</strong>.',
            '<strong class="non-clickable">Long Pitch.</strong> Start pitching. Doesn\'t matter what you say, just try to get people to listen. <strong>All enemies skip their action</strong>.',
            '<strong class="non-clickable">Discount.</strong> Loot an additional <strong>d66x10¤</strong> from the fallen enemy.',
            '<strong class="non-clickable">Door-in-the-face.</strong> Ask someone for something big. Test their <strong>Motivation and Soft Skills DR12</strong>. If both tests are successful, the target will <strong>do what they were asked to do</strong>.',
            '<strong class="non-clickable">Understanding Pain Points.</strong> Analyze an enemy. <strong>Skip one turn</strong>. Next turn, you deal <strong>+d6 damage to the analyzed opponent</strong>.',
            '<strong class="non-clickable">FOMO (Fear of Misplaced Omens).</strong> Harness the fear of your enemies by offering them a limited deal (e.g., run now or be brutally violated later). <strong>Test their Motivation this turn</strong>.'
        ],
        stats: [
            {
                name: '$avings',
                mod: '4d6x10'
            },
            {
                name: 'undos',
                mod: 'd2'
            },
            {
                name: 'hp',
                mod: '6'
            },
            {
                name: 'hard skills',
                mod: -2
            },
            {
                name: 'soft skills',
                mod: 2
            },
        ],
    },
    {
        name: 'engineer',
        extra: [],
        descrip: "They hired you to build and fix things they use to <strong>break the world</strong>. You can repair and construct many things, but a broken body and a crushed soul are beyond your expertise. However, you quickly realize that your tools and knowledge are not only suitable for construction, but also <strong>destruction</strong>.",
        skill_descrips: [
            'Your latest corporate project was:',
            'One thing in your toolbox:'
        ],
        first_skill: [
            'A portable, pocket-size server containing a spellcrafting AI',
            'Invisible surveillance equipment for monitoring employees',
            'A fully automatic rig for human sacrifice',
            'An algorithm capable of predicting people\'s nightmares',
            'Satellite directed to the Earth\'s core',
            'Elaborate cog machinery that does nothing',
        ],
        second_skill: [
            '<strong>Skeleton Screwdriver.</strong> Made from the bone of an old handyman, this tool not only can repair nearly anything (<strong>test Hard Skills or Knowledge DR14</strong>) but can be used as a weapon (<strong>d3 damage, 50% chance for bleed, 1 damage/d4 rounds</strong>)',
            '<strong>Silver Cables.</strong> Faster than normal ones (<strong>-2DR for Knowledge test when used for anything computer related</strong>), also can be used to bind lesser demons',
            '<strong>Talking Wrench.</strong> Seems to be very, very knowledgeable, but it\'s trustworthy only half of the time, useful in repairs too',
            '<strong>BerHam.</strong> <strong>d2 damage</strong>, a regular sized hammer that becomes heavier with the decline of the user\'s health (<strong>+1DR to hit and +d2 damage with each HP lost during the battle, resets after the fight</strong>)',
            '<strong>High Quality Junk.</strong> Test <strong>Knowledge and Hard Skills DR8</strong>. If both are successful, <strong>create two of the following</strong>: a weapon enhancement (additional d2 damage), a piece of armor (additional -d2 to the existing defense) or an automaton (2HP, 2 damage, -d2 steel); enough for one time use, can be salvaged from intricate and/or occult machinery',
            '<strong>20.20 Fuel.</strong> Almost impossible to contain, will burn through most things but only for <strong>d20 seconds</strong>; when drunk, turns the drinker into a living bomb that will <strong>explode in d20 seconds and inflict d20 damage in a 20 meter radius</strong>',
        ],
        stats: [
            {
                name: '$avings',
                mod: '3d6x10'
            },
            {
                name: 'undos',
                mod: 'd2'
            },
            {
                name: 'hp',
                mod: '8'
            },
            {
                name: 'hard skills',
                mod: 2
            },
            {
                name: 'knowledge',
                mod: 2
            },
            {
                name: 'soft skills',
                mod: -4
            },
        ],
    },
    {
        name: 'controller',
        extra: [],
        descrip: "You\'ve always had an eye for details. <strong>You can spot bugs, glitches, and inconsistencies</strong> quickly and reliably. It's ironic that you didn\'t see the truth until now. Now your job is to <strong>protect</strong>, not the quality of the product, <strong>but the frail existence of your coworker\'s life</strong>. ",
        skill_descrips: [
            '<strong>Instant Insights</strong>:',
            'Once a day, you can bend reality. Test <strong>Knowledge DR10</strong> to gain a chosen advantage:'
        ],
        first_skill: [
            "<strong>Once per day</strong>, spend one round in a fight to analyze your opponent and find their weakness. <strong>Your next attack will deal double damage</strong>. Outside of a fight, you can examine a situation and discover a perfect solution (e.g. a way to escape a trap, a weakness in the code, etc.). <strong>Costs 1 Undo</strong>."
        ],
        second_skill: [
            '<strong>False Negative.</strong> Your or others’ defects are omitted. Negate all harmful effects (bleed, poison etc.) and heal d4 HP.',
            '<strong>False Positive.</strong> Make yourself or others look powerful. Lower all your target’s DR by 2 for d4 hours.',
            '<strong>Critical Error.</strong> Detonate a fatal flaw in reality. Deal d6 damage to everyone in a 15 meters radius. Random objects might be spawned.',
            '<strong>Leakage.</strong> Open the bridge between realities where the line is thinnest. Everyone is transported to the Mundane for d4 rounds.',
            '<strong>Bugs.</strong> When accessing a computer or server, materialize hidden bugs in the code. They’ll attack one target for d4 damage/d4 rounds and then fade in a hallucinogenic mist.',
            '<strong>Cleansing Ritual.</strong> Heal (if successful) or damage (if failed) everyone in proximity for a d6 HP. Can’t move or perform any other actions during the ritual.',
        ],
        stats: [
            {
                name: '$avings',
                mod: '2d6x10'
            },
            {
                name: 'undos',
                mod: 'd4+1'
            },
            {
                name: 'hp',
                mod: '6'
            },
            {
                name: 'integrity',
                mod: 1
            },
            {
                name: 'knowledge',
                mod: 1
            },
            {
                name: 'hard skills',
                mod: -2
            },
        ],
    },
    {
        name: 'designer',
        extra: [],
        descrip: "<strong>You are an artist</strong>. Well, at least you try to be one. Everyone thinks your “artistic” soul makes you an <strong>ideal candidate to adopt the occult right off the bat</strong>. But having the abyss staring back at you is <strong>not as fun as you might think it is</strong>.",
        skill_descrips: [
            'You carry one important artifact imbued with the power of nostalgia. You can use it only <strong>once per day</strong>'
        ],
        first_skill: [
            '<strong>A comic book.</strong> Weirdly enough, it tells the story of your life. Even the future. But as often as it shows the truth, it spreads lies (<strong>50/50% chance</strong>).',
            '<strong>An old CD mixtape.</strong> Play music or throw it for d4 damage. Victims test Integrity DR8 or sing the songs from the mixtape until they are dead, or the CD is removed from their body.',
            '<strong>Photo of your pet.</strong> Animate your pet for <strong>d4 hours</strong>. It comes with additional teeth, tentacles, or other unnatural body parts. Knowledge +d4 HP, -d2 armor, and feral attack (d4). Once it’s dead <strong>it’s gone forever</strong>.',
            '<strong>Coffee mug that says “Geek.”</strong> Drink from it and test <strong>Integrity DR12</strong>. On a success, decrease DR of all Knowledge tests by 4 for a day. If failed, <strong>increase DR of all Soft Skills and Flexibility by 2 for a day</strong>.',
            '<strong>Sketchbook.</strong> You can draw a location within your reality and teleport to it. <strong>Roll d6</strong> to determine the quality and effect of your drawing: <ul><li><strong>1-2, pretty bad sketch.</strong> doesn’t work, take d4 damage</li><li><strong>3-4, barely recognizable.</strong> you are teleported somewhere else</li><li><strong>5-6, good enough.</strong> you teleport to the place you drew.</li></ul>',
            '<strong>Key chain with an anime character.</strong> Put this on any key, it will open all doors. Test <strong>Knowledge DR12</strong> to see whether the opened door leads to where it should (success) or to a place filled with d6 enemies (fail).',
        ],
        second_skill: [],
        stats: [
            {
                name: '$avings',
                mod: '6d10'
            },
            {
                name: 'undos',
                mod: 'd2'
            },
            {
                name: 'hp',
                mod: '4'
            },
            {
                name: 'knowledge',
                mod: 3
            },
            {
                name: 'hard skills',
                mod: -3
            },
        ],
    },
    {
        name: 'supplier',
        extra: [],
        descrip: "This building is up and running largely because of you. <strong>You are responsible for all the equipment and supplies</strong>, for the office layout and safety. You know every nook and cranny of this building and every <strong>dirty secret</strong> that resonates within its walls. They think you don\'t see or hear, as they don\'t see or hear you. Well, <strong>the shadows suit you</strong>.",
        skill_descrips: [
            'You\'ve seen some stuff nobody is supposed to see. Now you know two of these:',
            'You specialize in one of these:'
        ],
        first_skill: [
            'A dirty secret of someone from the <strong>executive team</strong>',
            'Ingredients and requirements for 2 random <strong>Rituals</strong>',
            'The HR database <strong>password</strong>',
            'The secret escape from the building (<strong>you\'re working in</strong>)',
            'Two random <strong>Incantations</strong>',
            'Name of all <strong>demons and employees</strong> of your company',
        ],
        second_skill: [
            '<strong>Equipment.</strong> Improvised and makeshift weapons deal <strong>+2 damage</strong> in your hands and <strong>don\'t break during combat</strong>',
            '<strong>Resupply.</strong> When using consumable items, test <strong>Knowledge DR12</strong> to see if the item is used up or not',
            '<strong>Shortcuts.</strong> Lockpicking or Hacking rolls to open regular doors is <strong>-2DR</strong>',
            '<strong>Coffee.</strong> The benefits of coffee are <strong>doubled for you</strong>',
            '<strong>Repairs.</strong> You can test <strong>DR12 Knowledge</strong> to make a hasty repair of equipment or machines that lasts <strong>2d8 rounds</strong>',
            '<strong>Electricity.</strong> When accessing a fuse box, can test <strong>Knowledge DR10</strong> to overload a connected machine, or turn off lighting or security systems to an area for <strong>2d6 rounds</strong>',
        ],
        stats: [
            {
                name: '$avings',
                mod: '2d6x5'
            },
            {
                name: 'undos',
                mod: 'd3'
            },
            {
                name: 'hp',
                mod: '4'
            },
            {
                name: 'flexibility',
                mod: 2
            },
            {
                name: 'soft skills',
                mod: -2
            },
        ],
    },
];

export const OFFICE_TOOLS = [
    {
        name: 'stapler',
        descrip: 'd3',
    },
    {
        name: 'pen',
        descrip: 'd3, At maximum damage, it punctures the target. Test Flexibility or Hard Skills DR12 to pull out and cause bleeding (<strong>1 damage/d4 rounds</strong>).',
    },
    {
        name: 'mug',
        descrip: 'd4, d3 splash of hot liquid (<strong>one use, can be refilled</strong>).',
    },
    {
        name: 'keyboard',
        descrip: 'd6, Breaks after <strong>d4 hits</strong>.',
    },
    {
        name: 'scissors',
        descrip: 'd4',
    },
    {
        name: 'stapler',
        descrip: 'd3',
    },
    {
        name: 'briefcase',
        descrip: 'd6, Find a random <strong>item</strong> or a random <strong>weapon</strong> inside.',
    },
    {
        name: 'cable whip',
        descrip: 'd6 + 1',
    },
    {
        name: 'paper cutter blade',
        descrip: 'd6, 50% chance to cause <strong>bleeding on hit</strong>.',
    },
];

export const SUITS = [
    {
        name: 'just a shirt & jeans',
        descrip: 'no damage reduction, -2DR for all Flexibility tests'
    },
    {
        name: 'cheap suit',
        descrip: '-d2 damage, +2DR for all Soft Skills tests'
    },
    {
        name: 'linen suit',
        descrip: '-d2 damage'
    },
    {
        name: 'three piece suit',
        descrip: '-d4 damage'
    },
    {
        name: 'bulletproof suit',
        descrip: '-d4 damage, 0 damage from gunshots to the core +2DR for all Flexibility tests'
    },
    {
        name: 'executive suit',
        descrip: '-d6 damage'
    },
];

export const BAGS = [
    {
        name: 'Just Pockets',
        descrip: ''
    },
    {
        name: 'Fanny Pack',
        descrip: '1 standard-sized item'
    },
    {
        name: 'Handbag/Laptop bag',
        descrip: '4 items'
    },
    {
        name: 'Backpack',
        descrip: '7 items'
    },
    {
        name: 'Two-deck metal trolley',
        descrip: '12 items'
    },
    {
        name: 'Bag of Wonders',
        descrip: 'holds ∞ items; roll flat d20, 12 or more, you get the item you wanted otherwise you pull something horrible)'
    },
];

export const ESSENTIALS = [
    '<span class="clickable">Set of cables</span>',
    '<span class="clickable">Flashlight</span> with battery for <strong>d4+Hard Skills hrs</strong>',
    'C4 explosive left by an ex-employee (<strong>d12 damage in 10m radius</strong>)',
    '<span class="clickable">First aid kit</span>; d4 uses, stops bleeding, <strong>heals d6 HP</strong>',
    'Disposable <strong class="clickable">electronic key-hacker</strong>; d3 uses (<strong>open electronic doors</strong>)',
    'A <span class="clickable">USB drive</span> with d3 viruses (<strong>test Knowledge DR12 to hack</strong>)',
    '<span class="clickable">Golden credit card</span> with <strong>d6x100¤</strong> on it',
    'Set of d6 <span class="clickable">paper clips</span> (<strong>test Flexibility DR12 to open doors</strong>)',
    '<span class="clickable">Very sharp pencil</span> (d8 damage, <strong>one use</strong>)',
    '<span class="clickable">Power bank</span> with energy for <strong>d6 hours</strong>',
    'Bottle of high % <span class="clickable">vodka</span>',
    'Bag of <span class="clickable">coffee additives</span>',
];

export const SPECIALS = [
    '<span class="clickable">A crystal</span> that glows red in the presence of a <strong>left-handed person</strong>',
    'An invisible, annoying <span class="clickable">parrot</span>',
    '<span class="clickable">A toy plane</span> with a <strong>tiny portal</strong> inside',
    '<span class="clickable">A microwaved fish</span>',
    '<span class="clickable">A coupon for</span> d20 <span class="clickable">free coffees</span> at the local coffee shop',
    '<span class="clickable">Magic detecting glasses</span> (d3 uses/day, test <strong>Knowledge DR12</strong> to use)',
    'Random incantation',
    '<span class="clickable">A mug</span> always filled with stale water',
    'An old <span class="clickable">boombox</span>',
    'd66 day old <span class="clickable">sandwich</span>',
    '<span class="clickable">A note</span> with your name written in <strong>blood</strong>',
    '<span class="clickable">Necklace</span> worth <strong>100¤</strong>',
];

export const INCANTATIONS = [
    {
        name: 'Larval Migraine.',
        descrip: ' Create a maggot inside a human brain, dealing <strong>d6 damage</strong> and taking one of the senses.',
    },
    {
        name: 'Tongues.',
        descrip: ' Understand demon language for a day but <strong>lose the ability to speak for a day</strong>.'
    },
    {
        name: 'Hourglass.',
        descrip: ' Make <strong>d4 targets</strong> think the end of the world just started.'
    },
    {
        name: 'Caffine Descend.',
        descrip: ' Make one human target eternally dependent on constant caffeine intake to survive. If deprived of coffee for <strong>longer than an hour</strong> it suffers excruciating pain, losing 1HP (<strong>if it goes to null, it dies</strong>).'
    },
    {
        name: 'Smart Casual.',
        descrip: ' Change appearance and voice for <strong>d20 minutes</strong>.'
    },
    {
        name: 'Intern Affairs.',
        descrip: ' Summon <strong>d4 faithful interns</strong> (no armor, d2 scratch, <strong>worthless</strong>).'
    },
    {
        name: 'Doom Merger.',
        descrip: ' Link <strong>d4 targets</strong> minds so anything that happens to one happens to all, including damage taken.'
    },
    {
        name: 'Cubicle Surprise.',
        descrip: 
        `For <strong>4 minutes enclose one target</strong> in a 2x2x2m cubicle filled with <strong>d6</strong>:
        <div class="internal-list">
            <ul>
                <li><strong>1-2.</strong> water</li>
                <li><strong>3-4.</strong> coffee</li>
                <li><strong>5-6.</strong> pineapple jelly</li>
            </ul>
        </div>
        <div>
            Swim to escape (test <strong>Flexibility DR12</strong>) or hold your breath (test <strong>Hard Skills DR12</strong>) until the incantation ends.
        </div>`
    },
    {
        name: 'Persona Non Grata.',
        descrip: ' The target becomes invisible for <strong>d6 turns/minutes</strong> or until their heart rate exceeds 70 BPM.'
    },
    {
        name: 'Downgrade.',
        descrip: ' Lowers target’s HP to <strong>d6</strong> and Motivation to <strong>d4</strong>.'
    },
    {
        name: 'Brainstorm.',
        descrip: ' Confuse <strong>d4</strong> targets for <strong>2 rounds</strong>. They will attack each other in a frenzy.'
    },
    {
        name: 'One Last Task.',
        descrip: 'Bring back a human to life with <strong>1HP</strong> and total, indivisible attention to one specific task. <strong>It will die after the task is done</strong>.'
    },
];

export const NAMES = [
    'Jonn',
    'Gene',
    'Jane',
    'Mikael',
    'Sussan',
    'Dave ID',
    'Emi',
    'Robby',
    'Sarha ',
    'Karren',
    'Lindy',
    'Willyam',
    'Pathricia',
    'Nanncy',
    'Marvy',
    'Loura',
    'Sammsy',
    'Barbrry',
    'Dantel',
    'Debr\'ah',
    'Thommy',
    'Ama',
    'Brayn',
    'Stepph',
    'Cyntya',
    'Edd W.',
    'Charles III ',
    'Miquelle',
    'Jeff',
    'Rebby',
    'Coxy',
    'Scotchy',
    'Kamilla',
    'Justina',
    'Ravy',
    'Chin',
    'Meloras',
    'Yooki',
    'Sorra',
    'Himeshi',
    'Taro',
    'Lin',
    'Ayya',
    'H. Akira',
    'Yong',
    'Ha Na',
    'Aruto',
    'Shiy',
    'Ahmmy',
    'Hass',
    'Nouhr',
    'Ali B.',
    'Mohha',
    'Yuss',
    'Ranya',
    'Lima',
    'Dallya',
    'Ariq',
    'Freq',
    'Janush',
    'Pille',
    'Pike',
    'Mourav',
    'Gracyan',
    'Edemyon',
    'Alamina',
    'Bozena',
    'Loyza',
];