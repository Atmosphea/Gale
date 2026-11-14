/* ============================================================================
   TEXTUAL REVERIE — MASTER CONFIGURATION
   Every tunable value lives here. Edit a number, reload, the app picks it up.
   ========================================================================== */
window.REVERIE_CONFIG = {

  /* ===== BACKGROUND REPOSITORY (one per homepage PAGE; arrows also cycle) =====
     Page N of the library uses backgrounds[N]. The swipe-behind layer shows the
     NEXT page's background, so it is naturally a different scene (e.g. the beach).
     Uploading images via "Change background" appends here and grows the pages. */
  backgrounds: [
    'PANO',                    /* the layered alpine panorama (sky gradient + mountains + foreground, offline) */
    'backgrounds/home-01.png'  /* the original single-image background */
  ],
  /* layered-panorama assets + tuning (all local; PANO entries above render these) */
  pano: {
    mid: 'backgrounds/pano-mid.png',   // mountains + valley (transparent sky)
    fg:  'backgrounds/pano-fg.png',    // foreground hills (transparent above)
    skyTop: '#9cdeff', skyBottom: '#a5e8ff',
    pageX: [12, 50, 88],       // horizontal sample point (%) for library pages 1..3 (cycles)
    midParallax: 0.55,         // fraction of the column displacement the mountain layer takes
    cloudWide: 'backgrounds/cloud-wide.png',
    clouds: ['backgrounds/cloud-a.png','backgrounds/cloud-b.png','backgrounds/cloud-c.png','backgrounds/cloud-d.png'],
    descendMs: 2400,           // landing -> reading room descent duration
    // Ground rise-in: mid (mountains, "2") rises first, then fg (foreground hills, "1") — timed
    // to still be VISIBLY moving as the falling sky-panel uncovers them (not finished under cover).
    riseMidDelayMs: 800, riseFgDelayMs: 1300, riseDurMs: 1150
  },
  defaultBgIndex: 0,
  bgSwitchFadeMs: 420,

  /* ===== LOADING SCREEN (the landing IS the loader) ===== */
  loading: {
    fillMs: 1000,          // 0 -> 100% always completes in this long
    barWidthVw: 30,
    perLetterFontMs: 120   // how fast the font-change wave steps letter to letter
  },

  /* ===== LIBRARY RAILS ===== */
  rails: {
    count: 5,
    dividerOpacity: 0.55,
    dividerColor: 'rgba(255,255,255,0.55)',
    railLineOpacity: 0.20,
    railTopPx: 10,         // capsule travel inset from very top of viewport
    railBottomPx: 10,      // capsule travel inset from very bottom
    fadePct: 10,           // top & bottom 10% of the full-height rail fade out
    sliceZoomPct: 34,
    sliceOffsetMaxPct: 28,
    gradientStrength: 0.1375,
    chapterLabelMs: 3000,  // a chapter name shows this long after the capsule crosses it
    chapterLabelFadeMs: 500
  },

  /* ===== LIBRARY PAGING MODEL ===== */
  library: {
    booksPerPage: 5,        // columns per page
    colMinVw: 10, colMaxVw: 40,   // column width bounds (percent of viewport width)
    fullHours: 15,          // reading time at which a capsule reaches full pill size
    wideHours: 20,          // beyond this, the capsule expands horizontally across two column spans
    shuffleAfterBooks: 20,  // randomized shuffle pages unlock only past this many books
    shufflePages: 3,        // how many bonus shuffle pages exist once unlocked
    singleDisplaceMaxPct: 30, // single-page swipe re-randomizes each column slice 0..this %
    displaceStaggerMs: 70,  // column-to-column stagger for the displacement animation
    displaceDurMs: 620,     // displacement transition duration
    gradSmoothing: 0.18     // per-frame easing factor for the capsule gradient (0..1, lower = smoother)
  },

  /* ===== PREVIEW MODE (tap a column to expand it) ===== */
  preview: {
    grownPct: 40,           // expanded column width as % of viewport
    growMs: 620,            // expand/collapse transition (slower, more graceful)
    marginPct: 8,           // inner margin for the previewed highlight line
    imgRecenter: true,      // grown column pans its photo toward centre (50%)
    imgZoomPct: 8,          // extra zoom applied to the photo while a column is grown
    fullZoomOutPct: 46      // extra zoom-OUT applied when the grown column swallows the screen to open a book (reveals the whole panorama)
  },

  /* ===== LIBRARY BUILD-OUT (columns drop + fade away when a reading opens) ===== */
  libExit: {
    colStaggerMs: 70,       // column-to-column stagger of the drop
    dropDurMs: 460,         // per-column drop/fade duration
    dropDistVh: 64,         // how far columns fall as the reading opens
    rotateDeg: 4,           // slight rotation as they drop
    holdMs: 540             // total time the build-out plays before the reader shows
  },

  /* ===== CAPSULE PHYSICS — edge-to-edge vertical pills riding the rail ===== */
  capsule: {
    widthFrac: 0.92,       // capsule width as a fraction of the column (edge to edge)
    aspect: 1.55,          // height / width  (pill, taller than wide)
    radiusPx: 999,         // pill corners
    startRandom: true,
    startPos: 0.4,
    speed: 0.038,          // drift pace — subtle, unhurried
    speedRandom: 0.014,
    restitution: 0.68,     // most energy absorbed on bounce = very soft landing
    maxSpeed: 0.18,
    minSpeed: 0.007,
    impulse: 0.016,        // small random kick so it never stops dead
    squash: 0.96,          // barely squash on bounce
    squashDecay: 7,
    slipCoverPct: 20,      // swipe-with-nowhere-to-go: boost covers up to this % of the track
    slipDurationMs: 1000,  // ...over this long, decaying (falloff) back to normal drift
    ringOpacity: 0.7,
    shadow: '0 18px 38px rgba(0,0,0,.46)',
    /* PARALLAX: the title rides ahead of the capsule. labelLeadFrac is how much of
       the capsule height the label travels relative to the capsule across the rail. */
    labelParallax: 0.5,
    labelBaseOffsetPx: 18
  },

  /* ===== BUILD-IN (elements assemble one by one on entering the library) ===== */
  libBuild: {
    colStaggerMs: 130, colDurMs: 540, colRisePx: 60,
    capDelayMs: 200, capDurMs: 500,
    chromeDelayMs: 120, chromeDurMs: 680,
    soundPerColumn: true, soundPerCapsule: true
  },

  /* ===== SWIPE PAGE-TURN (columns drop right->left) ===== */
  swipe: {
    dragDivisor: 0.5, threshold: 0.4, colStagger: 0.10,
    dropSpan: 0.55, dropDistVh: 115, rotateDeg: 3, dropDurMs: 820, fadeFloor: 0.9
  },

  /* ===== FINAL SWIPE -> MEANING ROOM (replaces the columns-drop for this one transition) =====
     Instead of the normal page-drop, the whole reading room glides LEFT (columns + chrome, each
     at its own parallax speed = "hierarchical") while the panorama each column carries visibly
     pans left too, at a faster/accelerating rate than the columns themselves. The Meaning Room
     then slides in from the right as if the swipe simply kept going. Duration is NOT fixed —
     it's real distance (how far the shared panorama has left to pan to reach the Meaning Room's
     resting position) divided by a constant speed, so it takes longer with more library pages. */
  profileTransition: {
    panSpeedPctPerSec: 45,     // panorama pan speed — sets duration = distance / speed
    minMs: 700, maxMs: 3200,
    colSpeeds: [1, 1.25, 1.5, 1.75, 2],   // per-column horizontal parallax multiplier (hierarchical)
    chromeSpeed: 0.7,          // top labels/pills drift slower than the columns
    menuStartFrac: 0.55        // Meaning Room begins sliding in once the pan is this far along
  },

  /* ===== READING PACE ===== */
  speedMs: 260, speedMin: 70, speedMax: 760, speedStep: 20,   // Word mode ms/word
  speedMulSteps: [1, 1.25, 1.5, 1.75, 2, 2.5],   // single speed control, expressed as steps off the book's starting pace
  linesPerMin: 16, lpmMin: 4, lpmMax: 60, lpmStep: 2,         // Scroll mode lines/min
  /* WPM measured by the test; used as the starting Word-mode speed for every book. */
  defaultWpm: { savor: 240, skim: 420 },
  useWpm: 'savor',   // which measured pace seeds a freshly opened book

  /* ===== EMPHASIS PAUSES (all multipliers tunable) ===== */
  emphasisPauseMs: 170,
  periodPauseMult: 1.6,
  commaPauseMult: 0.7,      // commas now pause too
  semicolonPauseMult: 1.0,
  emDashPauseMult: 1.3,
  lineBreakPauseMult: 1.2,
  parenSpeedMult: 1.5,
  keyTermFadeMult: 2.0,

  /* ===== TRAILING WORDS (Word mode) — both snap 1..6 ===== */
  fadeBefore: 9, fadeAfter: 9, trailMin: 1, trailMax: 18,
  /* TEXT LIGHT — opacity floor of the FURTHEST trailing word.
     1.0 = every trailing word fully opaque; 0.1 = furthest word at 10%, grading
     linearly up to the current word. */
  textLight: 0.18,
  opCurrent: 1.0,

  /* ===== AUTO-CENTRE / MANUAL OVERRIDE ===== */
  centerFollowStiffness: 6, manualReturnMs: 5000, focusPct: 0.5,
  manualReturnLines: 3,   // after this many auto ticks past a manual scroll, auto-centring resumes (scroll AND word modes)

  /* ===== ACTIVE-SCROLL BROWSING ===== */
  scrollBlurPx: 8,        // gaussian blur applied to the background while the user is scrolling
  scrollSettleMs: 720,   // after motion (incl. momentum) settles this long, browsing state reverts
  scrollConvergeMs: 240,  // scroll-release settle: per-line opacity transition duration (stagger delay computed at commit, 10ms/line)
  ttsResyncMs: 360,       // system voice: if silent this long mid-read, re-issue current unit (period-stall fix)
  pageStepMs: 320,        // page-mode line-step buttons: smooth scroll duration to move/catch up one line

  /* ===== SCROLL (line-by-line) opacity ===== */
  scrollPrevLineOp: 0.5, scrollTailOp: 0.5, scrollCurrentBg: 'rgba(255,255,255,.5)',

  /* ===== HIGHLIGHT APPEARANCE CYCLE (active word) ===== */
  hlStyles: ['White', 'Black', 'Shadow', 'Yellow', 'Underline', 'Glow', 'Box', 'None', 'Spotlight', 'H-Spotlight'],
  defaultHlStyle: 0,        // 0 = white 50% bg, black text
  // Spotlight (circular feathered mask around current word, instant jump) tuning
  spotlight: { radiusPx: 90, featherPx: 70, dimOpacity: 0.5 },
  // Horizontal spotlight (whole line lit, screen dims) tuning
  hSpotlight: { dimOpacity: 0.3, featherPx: 44, padY: 14 },

  /* ===== HIGHLIGHT MOTION CYCLE (how the highlight moves word to word) ===== */
  hlMotion: ['Fade', 'Glide', 'Wipe', 'Wave'],
  defaultHlMotion: 0,
  highlightPrevColor: 'rgba(96,165,250,.55)',   // "highlight previous line" blue

  /* ===== STREAM CYCLE (leading-edge reading flow; overlays any highlight) =====
     Off → Lead → Flow → Comet. Each extends attention ahead of the active word. */
  streamModes: ['Off', 'Lead', 'Flow', 'Comet'],
  stream: {
    leadWords: 2,          // words lit ahead of the active word
    leadOpacity: 0.5,      // opacity of those lead words
    flowTrail: 6,          // Flow mode: trailing words kept lit
    cometTrail: 10         // Comet mode: long trailing tail
  },

  /* ===== PATTERN BREAKS (focus-reset interventions) =====
     Cycle: None → Flash → Tunnel → Period → Motion. All values tunable. */
  patternBreaks: ['None', 'Flash', 'Tunnel', 'Period', 'Motion', 'Snooze'],
  patternBreak: {
    flash: { everyNParagraphs: 3, durMs: 120, color: '#ffffff', peakOpacity: 0.55 },
    tunnel: { everyNEmphasis: 6, steps: 6, stepMs: 200, squarePx: 220, minScale: 0.16, color: 'rgba(255,255,255,.5)' },
    period: { everyNthSentence: 4, flickers: 2, flickerMs: 70, intensity: 0.4 },
    motion: {
      // IMU-ready visual layer (dots only for now; sensor hookup deferred)
      // dots: explicit positions. anchor corners use insetPx; mid dots alternate visibility.
      dots: [
        { x: 'left',  y: 'top',    kind: 'corner' },
        { x: 'right', y: 'top',    kind: 'corner' },
        { x: 'left',  y: 'bottom', kind: 'corner' },
        { x: 'right', y: 'bottom', kind: 'corner' },
        { x: 'left',  y: 'middle', kind: 'mid', phase: 0 },
        { x: 'right', y: 'middle', kind: 'mid', phase: 1 }
      ],
      dotPx: 14,
      cornerInsetPx: 34, midAlternateMs: 4000,
      baseOpacity: 0.07, maxOpacity: 0.24,
      gain: 26, damping: 0.12, deadZone: 0.02, maxDisplacePx: 40,
      updateRateHz: 60,          // sampling frequency for the (future) sensor loop
      killSwitch: false,         // master override: true = never render
      // idle life: dots breathe + drift on a lissajous path so the layer feels alive
      breatheMs: 5200, breatheAmt: 0.28,      // radius pulse
      driftPx: 7, driftMsX: 9000, driftMsY: 12600,   // lissajous idle drift
      glowPx: 18,                // glow radius when displaced
      arcOpacity: 0.05,          // faint connecting arc between mid dots
      color: 'rgba(255,255,255,1)'
    },
    snooze: {
      intervalMin: 6,        // a bubble appears every N minutes of playback
      riseMs: 3000,          // fade-in + rise duration
      railXPct: 88,          // vertical rail position (percent of width)
      bubblePx: 44,          // bubble diameter
      minTopPct: 18, maxTopPct: 62   // random stop height range (percent from top)
    }
  },

  /* ===== MENU AUTO-FADE (after play) ===== */
  menuFadeMs: 10000,    // fades from 100% to menuFadeTo over this long once playing
  menuFadeTo: 0.1,      // resting opacity; any tap restores to 100%

  /* ===== RIVER MODE (single centred line, words flow right -> left) ===== */
  river: { charsVisible: 26, aheadOpacity: 1.0, behindOpacity: 0.5, fontVw: 5.4,
    glyphSpaceEm: 0.52,  /* first-letter glyph width — moves current word so 1st letter hangs left of center line */
    fontVwMin: 3.0, fontVwMax: 9.0  /* River: the margin slider scales text between these (middle = fontVw) */
  },

  /* ===== READING MARGIN (Tune panel slider under Emphasis Pause) =====
     Higher slider -> lower margin. marginVw is the TOTAL horizontal margin (split L/R);
     text column width = 100vw - marginVw. In River mode the SAME slider scales text size
     instead (see river.fontVwMin/Max), so a smaller font reveals more words each side. */
  margin: { minVw: 20, maxVw: 90, defaultPct: 50 },

  /* ===== BACKGROUND TRAVEL (manual parallax; "Travel" button in the Haptics column) =====
     When enabled the panorama very slowly sweeps left->right over travelTime, then drops
     down 20% and sweeps back — repeating forever. The foreground PNG is scaled +20% so it
     travels a little faster (parallax); the sky gradient never moves. Driven off the single
     rAF loop with sub-pixel transforms so there is zero jitter. */
  travelTime: 300000,      /* ms for one full left->right sweep (5 minutes) */
  travelFgScale: 1.20,     /* foreground layer scale-up (drives the faster parallax) */
  travelDropPct: 20,       /* vertical drop applied at each edge before reversing */

  /* ===== PROGRESS BAR (dual-ring radial) ===== */
  progressBar: {
    chapThreshold: 30,   // >this many chapters → no small fill ticks
    maxSmallTicks: 5,    // max small ticks between chapter ticks
    maxTicks: 180        // outer ring draws at most this many chapter ticks (huge books are ratioed down)
  },

  /* ===== MULTITOUCH ===== */
  multitouch: { maxTouches: 18 },

  /* ===== PERF ===== */
  paintWindow: 240,   // only words within +/- this many of the cursor are repainted per tick
  renderWords: 1000,  // virtualization (raised from 500: ~3.5x fewer mid-read window rebuilds)
  wpmMin: 20, wpmMax: 1107, wpmStep: 9, wpmDefaultAvg: 369,   // speed slider range; +/- step; centre when no WPM test taken: words mounted as DOM each side of the cursor (the "near LOD")
  scrollRenderWords: 1200,   // browsing (fully ramped): larger mounted slice so fast scroll never hits blank text
  scrollWindowMargin: 550,   // browsing (fully ramped): rebuild the window well before the viewport reaches its edge
  scrollRampTiers: [[0, 0.3], [220, 0.55], [500, 1]],   // [ms since scroll started, fraction of scrollRenderWords/Margin]
                       // — the very first touch mounts a SMALL slice (cheap, instant); sustained scrolling
                       // ramps it up in steps so a quick tap-and-release never pays the cost of the big buffer,
                       // — wide enough that a rebuild's edge sits well outside the viewport, so the
                       // seam is never scrolled into view; this is what makes continuous reading feel
                       // like one endless feed instead of discrete "sections" popping in
  windowMargin: 300,  // re-window when the cursor comes within this many words of an edge (rebuild
                       // fires while that edge is still far off-screen, well before it's ever visible)
  estWordsPerLine: 11, estLineHeight: 44,  // seed estimates for off-window spacer heights (re-measured live)
  maxParaWords: 90,   // long pasted paragraphs are chunked to this many words so virtualization always has boundaries

  /* ===== SECRET RAPID-SCAN MODE ===== */
  secret: {
    wpm: 738,
    captures: 9,
    requireHl: { keyterm: true, pauses: true, grid: true, dyslexic: true, uppercase: true, highlight: false, syntax: false, nature: false, autonext: false, repeat: false },
    requireEmphasisMs: 180
  },
  /* ===== HIGHLIGHT MOTION TUNING =====
     Glide: box eases word-to-word; on a line break it RESTARTS at the new word (no diagonal).
     Wipe:  reveal sweeps bottom->up with a motion-blur smear.
     Wave:  one calm wave travels along a constant baseline under the whole line (peak points DOWN). */
  motionGlideMs: 190, motionWipeMs: 220,
  glideEase: 'cubic-bezier(.33,0,.15,1)',     // rightward-only feel; left edge stays anchored
  wipeBlurPx: 7, wipeRisePx: 10,
  wave: {
    baselineOpacity: 0.30,   // the calm line under the whole current line
    amp: 13,                 // peak height (downward) in px
    widthMult: 1.5,          // peak width relative to the word width
    rightBiasMult: 0.45,     // nudge the peak this much of a word-width to the RIGHT of the active word
    amplitudePerChar: true,  // taller wave for longer words
    travelMs: 220,           // how long the peak takes to slide to the new word
    stroke: 'rgba(255,255,255,.9)', strokeWidth: 2
  },

  /* ===== LEADING STREAM (highlighted words persist across the line, then clear together) ===== */
  leadStream: false,
  streamTrailWords: 18,    // how many words back the stream keeps lit (longer trail)
  streamFadeMs: 420,       // persisting highlights + trailing words fade out together over this

  /* ===== LINE (sentence) MODE ===== */
  lineFadeStaggerMs: 45, lineFadeDurMs: 550,   // fade-in stagger, now first->last

  /* ===== FIND MODE ===== */
  findBrushBase: 26, findBrushGrow: 22, findBrushMax: 240, findMergeDist: 58,
  findSizeMult: [0.8, 1.0, 1.35], findEdgeLineOpacity: 0.5,

  /* ===== RING MODE ===== */
  donutInner: 74, donutOuter: 150, donutCenter: 0.0, donutIn: 1.0, donutOut: 0.5, donutRest: 0.1,
  discoverySizes: [44, 88, 132], discoveryDefault: 1,

  /* ===== TESTS (cognitive-training menu; replaces the old WPM Test button) =====
     A 3x3 grid of modules. Box 1 = WPM speed test, box 2 = Schulte Table, box 3 = visual
     memory. The Schulte Table trains peripheral vision: keep your eyes on the centre
     crosshair and tap 1..N in order before the timer runs out. */
  tests: {
    schulteSize: 4,           // 4x4 grid (numbers 1..16)
    schulteSeconds: 30,       // countdown for a Schulte round (each of the 2 stages)
    scoreboardMs: 4000,       // how long the Schulte scoreboard shows on its square before flipping back
    schulteScores: ['08.4s', '10.1s', '11.7s', '13.9s'],  // hardcoded best-times scoreboard
    memorySeconds: 4,         // visual-memory: how long the pattern is shown
    memoryTiles: 3,           // visual-memory: tiles to remember on a 4x4 board

    /* ---- Digit Span: three thirds pick a tier (4/5/6 digits); after 6 wins at the
       6-digit tier, the 4-digit third is permanently replaced by a 7-digit third. ---- */
    digitFlashMs: 2000,       // total ms the whole scattered digit set stays on screen
    digitUnlockWins: 6,

    /* ---- Diff Space: 3-stage DOOM-hallway letter tunnel hiding a secret word. ---- */
    diffSpace: {
      stages: [
        { secretLen: 5, streams: 8, durationMs: 8000,  oscAmp: 0,    oscFreq: 0,   oscAngleDeg: 0,  groupOscAmp: 0,     groupOscFreq: 0,    groupAngleDeg: 0,   scrambled: false },
        { secretLen: 6, streams: 8, durationMs: 10000, oscAmp: 0.14, oscFreq: 1.1, oscAngleDeg: 6,  groupOscAmp: 0.07,  groupOscFreq: 0.4,  groupAngleDeg: 4,   scrambled: false },
        { secretLen: 7, streams: 7, durationMs: 12000, oscAmp: 0.24, oscFreq: 2.1, oscAngleDeg: 16, groupOscAmp: 0.12,  groupOscFreq: 0.55, groupAngleDeg: 9,   scrambled: true }
      ]
    },
    diffSpaceWords: {
      5: ['NOVEL','STORY','WORDS','PAGES','BOOKS','VERSE','PROSE','MYTHS','GENRE','FABLE','DIARY','POEMS','TITLE','PLOTS','QUOTE'],
      6: ['READER','AUTHOR','VOLUME','EDITOR','MEMOIR','MARGIN','BINDER','PHRASE','LETTER','FOOTER','HEADER','INDENT','ITALIC','GLYPHS','PREFIX'],
      7: ['CHAPTER','LIBRARY','PASSAGE','NARRATE','GRAMMAR','SUBPLOT','EPIGRAM','EDITION','PREFACE','READING','STORIES','VOLUMES','WRITERS','READERS','INKWELL']
    }
  },

  /* ===== WPM TEST ===== */
  wpmTest: {
    savorSeconds: 15,
    skimSeconds: 18,
    lineOutStaggerMs: 70,
    lineInStaggerMs: 80,
    bg: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1600&q=70',
    savorText: "There is a particular silence that settles over a room when the light begins to fail. The afternoon, which had felt endless, gathers itself quietly toward evening, and the objects on the desk\u2014the cup, the unopened letter, the small brass key\u2014take on the gravity of things about to be remembered rather than merely seen. She had meant to leave hours ago. Instead she sat, watching the slow migration of shadow across the floorboards, and thought about how rarely we notice the exact moment a day turns into something we will keep. Reading, she decided, was a little like this: not the racing toward an ending, but the willingness to stay inside a sentence long enough to feel it close around you, the way dusk closes around a house, gently, completely, and without asking permission. Outside, the street had begun its evening business, the small commerce of footsteps and shutters and a dog somewhere insisting on being heard. She listened without quite attending, the way one listens to rain, and let the sentence she had been holding settle into the quiet like a stone lowered into water. There was no hurry now. The letter would still be there tomorrow, and the key, and the cup with its ring of cold tea; and whatever the day had been trying to tell her would either keep or it would not, and she found, to her surprise, that she no longer minded which. To read slowly, she thought, was to grant the world permission to be exactly as detailed as it already was.",
    skimText: "The report ran to forty pages and every one of them said the same thing in a slightly different costume. Sales were down. Costs were up. The committee had met, deliberated, and produced a recommendation so carefully hedged that it managed to recommend nothing at all. He skimmed the executive summary, then the headings, then the charts, looking for the single sentence that actually mattered, the one buried in the third paragraph of the fourth section where someone had quietly admitted that the new strategy had failed. Everything else was scaffolding. The trick to documents like these was not to read every word but to move quickly across the surface until the important thing snagged your attention, the way a hand passes over fabric and stops, suddenly, at the one rough seam. He had learned the skill the hard way, in a decade of meetings that could have been emails and emails that should have been nothing at all, and he wielded it now without sentiment, the eye dropping down the left margin, catching on numbers, on names, on the small telling verbs that betray where the bodies are buried. Most prose, he had decided, was packaging; the actual cargo was always smaller than the box. By the time he reached the appendix he had what he needed, three facts and one omission, and he closed the document with the brisk satisfaction of a man who has found the exit before anyone else has noticed the room is on fire."
  },

  /* ===== iOS 26-INSPIRED LIQUID GLASS BUTTONS =====
     Every value here feeds directly into the button CSS — change any number and the look updates.
     blur: backdrop-filter blur in px    saturate/brightness: backdrop filter extras
     specularAngle: the direction (deg) of the specular highlight sweep
     spec1/spec2: opacity of two specular gradient stops (rim catch and fill)
     baseAlpha: base frosted translucency of the button face
     rimTop: opacity of the crisp top rim inset highlight
     rimAll: opacity of the all-around inset border (the "glass edge")
     rimBottom: softer lower-edge rim depth
     innerGlow: opacity of the inner-top white glow (depth illusion)
     innerDepth: opacity of the inner-bottom shadow (gives the glass weight)
     dropClose/dropAmbient: opacity of the close and ambient drop shadows ===== */
  glass: {
    blur: 24,
    saturate: '190%',
    brightness: '112%',
    specularAngle: 148,    // deg — angle of the main specular sweep
    spec1: 0.30,
    spec2: 0.09,
    baseAlpha: 0.05,
    rimTop: 0.70,
    rimAll: 0.34,
    rimBottom: 0.15,
    innerGlow: 0.11,
    innerDepth: 0.20,
    dropClose: 0.30,
    dropAmbient: 0.18
  },


  titleCycleMs: 1100, waveMsPerLetter: 160, waveFalloff: 6, waveBaseOpacity: 0.4,
  phraseCycleMs: 3400, wordTransitionMs: 150, presetHoldMs: 600,
  vBlurStdDeviation: '0.6 16',

  /* ===== TYPOGRAPHY ===== */

  /* Brand wordmark "Gale" — sweeps each letter between two Odenburgh cuts.
     Tune speed / window / pattern here to make complex sweeps. */
  gale: {
    text: 'Gale',
    fontA: "'Odenburgh', serif",          // base cut
    fontB: "'Odenburgh Deco', serif",     // accent cut the sweep reveals
    heroSize: 'clamp(64px, 11.5vw, 184px)',  // a touch bigger than the old hero
    sweepMs: 260,        // ms between sweep steps (lower = faster)
    sweepWidth: 1,       // how many letters wear fontB at once
    sweepStep: 1,        // letters the window advances each step
    pingpong: false,     // true = bounce back and forth instead of wrapping
    gap: 0               // extra blank steps between passes (>0 = pause then repeat)
  },

  /* ===== TITLE ART (expanded-column title typography) =====
     Word-level layout: stop-words shrink + nest between lines / on baselines;
     short feature words fill their own line; long words size to fill the width.
     Swipe the title to reshuffle (seed++). No clipping: sizes derive from width/word length. */
  titleArt: {
    stopWords: ['the','and','of','a','an','to','in','or','for','on','at','by','with','from'],
    ownLineMin: 3, ownLineMax: 5,     // 3-5 letter feature words try to take their own line
    widthVw: 30,                       // usable width of the expanded column (vw) for size math
    glyphEm: 0.55,                     // average glyph width factor for no-clip sizing
    maxPx: 64, minPx: 16,             // word font-size clamps
    tinyPx: 11,                        // stop-word size
    letterStaggerMs: 22,               // center-out letter fade stagger
    letterFadeMs: 420
  },


  /* ===== PROFILE PAGE: WORD SOUP / CONSTELLATE / CRYPTOGRAPH =====
     The profile is ALWAYS the last swipe page. All Word Soup dot counts, positions,
     fragment sizes, lightning behavior, and cryptograph feel live here. */
  wordSoup: {
    fragMin: 1, fragMax: 5,          // default phrase length range (dual slider adjusts)
    rows: 5,                          // horizontal concept bands
    driftPxS: 5,                      // idle drift speed (px/s)
    restOpacity: 0.5,                 // fragments rest at 50%
    hopMs: 500,                       // lightning travel time per connection
    chainMin: 6, chainMax: 36,        // random total chain length per tap
    longLen: 7,                       // >=7 letters = "long" word class
    riseLossWords: 1,                 // words pared off when a pair rises
    maxFrags: 140,                    // visual curation cap (older dormant frags hide first)
    dormantDays: 14,                  // untouched this long -> dormant (hidden, not deleted)
    mergeHoldMs: 2000,                // hold a dragged phrase over another this long to merge
    batterySegments: 5,               // vertical lines per meter (5w each)
    chargePerReadMin: 60,             // minutes of reading (at your WPM) per earned tap
    maxCharges: 5,
    autoTapHour: 12                   // daily passive tap registers past noon on launch
  },
  cryptograph: {
    warp: 0.5,                        // 0 = flat, 1 = full cylinder (slider-controlled)
    inertia: 0.94,                    // drag release friction (higher = longer glide)
    grabDamp: 0.35,                   // inertia while grabbing (drag feel)
    lineWordThreshold: 26,            // loose max words per line before splitting
    fadePerWord: 0.10,                // stagger fade per word away from the center rail
    symmetryModes: ['Repeat', 'Mirror'] // Repeat = 12341234, Mirror = 1234554321
  },

  /* ===== LANDING EXTRAS ===== */
  landing: {
    subtitle: 'A new modality of reading',
    pwaHint1: 'Make me an app!',
    pwaHint2: 'Share \u2192 Add to Home Screen'
  },

  /* ===== POPPLE (reading aid) — last word of each sentence pops in size + color ===== */
  popple: { scalePct: 20, color: '#f2b84a' },

  /* ===== PAUSE 4 QUESTIONS ("|| 4 ?") — pauses at each chapter/subchapter boundary from the
     index, dims the screen, and asks a reflection question drawn from one of these banks. ===== */
  pauseQuestions: {
    chapter: [
      'What was the main takeaway trying to be conveyed?',
      'Who was this written for, based on the last passage?',
      'Two sentence summary of what you just read?',
      'Any notes or thoughts on the topic?',
      'What surprised you most in this chapter?',
      'What question do you still have?',
      'What would you tell a friend about this chapter?',
      'What tone or mood did this chapter carry?'
    ],
    subchapter: [
      'What was the point of this particular section?',
      'How does this section connect to the chapter around it?',
      'One sentence summary of this section?',
      'What detail here stood out most?',
      'Any quick reactions before moving on?',
      'What is this section building toward?'
    ]
  },

  /* ===== SQAR3 (chapter-locked reading strategy) =====
     At each chapter boundary: Recite closes out the chapter just finished, then
     Scan -> Question -> Anticipate -> Read previews the one just entered, before a fluid
     auto-scroll/auto-play carries on. Reopening the book (SQAR3 cached on) runs a Review
     pass over the previous chapter first. Text is displayed verbatim. */
  sqar3: {
    stages: [
      { key: 'scan', label: 'Scan', text: 'Quickly scan the introductory paragraph, subtitles, key sentences, key words, summary. Decide on the author\u2019s plan.' },
      { key: 'question', label: 'Question', text: 'Turn the title or key sentences into three questions to discover.' },
      { key: 'anticipate', label: 'Anticipate', text: 'Before reading, try to answer these questions mentally.' },
      { key: 'read', label: 'Read', text: 'Read the entire selection and look for the author\u2019s ideas to answer your questions.' }
    ],
    reciteLabel: 'Recite',
    reciteText: 'Close the book or magazine. Tell yourself in your own words what you have learned. Write notes on material that must be remembered.',
    reviewLabel: 'Review',
    reviewText: 'Later, to make your knowledge stick, review the gist of the article or chapter, again in your own words.',
    fadeMinVh: 16, fadeMaxVh: 38,   // sticky header + gradient height range, scaled to the stage text length
    barBg: 'rgba(8,10,6,.96)',
    labelColorMain: '#ffffff', labelColorReflect: '#60a5fa',   // Scan/Question/Anticipate/Read vs Recite/Review
    minChapterWords: 40,    // skip the overlay for stub chapters (front/back-matter blurbs) — anti-loop guard
    autoScrollPxPerSec: 14, // gentle Scan-stage encouragement nudge
    chapterCardMs: 2000     // Recite -> Scan bridge card duration
  },

  /* ===== IMPORT LIMITS ===== */
  importLimits: { maxBytes: 90 * 1024 * 1024 },

  /* ===== DAILY READING REMINDER (rotary wheel on landing) ===== */
  notifications: {
    startHour: 7, endHour: 21, stepMinutes: 30, defaultMinutes: 17 * 60, // 5:00 PM
    messages: ['Pick up where you left off \u2192', 'Your programmed reminder', 'I miss reading']
  },

  fonts: [
    { name: 'Crimson Text',     stack: "'Crimson Text', serif" },
    { name: 'Playfair Display', stack: "'Playfair Display', serif" },
    { name: 'Libre Baskerville',stack: "'Libre Baskerville', serif" },
    { name: 'Merriweather',     stack: "'Merriweather', serif" },
    { name: 'Source Serif 4',   stack: "'Source Serif 4', serif" },
    { name: 'Lora',             stack: "'Lora', serif" },
    { name: 'Inter',            stack: "'Inter', sans-serif" },
    { name: 'Source Sans 3',    stack: "'Source Sans 3', sans-serif" },
    { name: 'Open Sans',        stack: "'Open Sans', sans-serif" },
    { name: 'Nunito',           stack: "'Nunito', sans-serif" },
    { name: 'Poppins',          stack: "'Poppins', sans-serif" },
    { name: 'Montserrat',       stack: "'Montserrat', sans-serif" },
    { name: 'Universal — CJK · Arabic · Hindi', stack: "system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans', 'Noto Sans CJK SC', 'Noto Sans CJK JP', 'Geeza Pro', 'Kohinoor Devanagari', 'Noto Sans Arabic', 'Noto Sans Devanagari', 'Noto Sans', sans-serif" }   /* renders any language the device supports */
  ],
  defaultFontIdx: 0,
  posColors: { noun: '#9cc4f0', verb: '#9ee0b3', adj: '#d4b1f2', pronoun: '#f4c089', conj: '#d2d2cc' },

  /* ===== SOUNDS — crisp glass + metal, layered.
     Each sound is a stack of `layers`. Layer kinds:
       tone  { type, freq, freqEnd, dur, vol, delay, attack }  — oscillator
       noise { dur, vol, delay, lp(lowpass Hz), hp(highpass Hz), color }  — filtered noise
     Tune freq/vol/dur/delay per layer; layers play together for a richer hit.
     Any `url` (CDN sample) still overrides the synth if you add one. ===== */
  /* ===== SOUND DESIGN — "crisp & mystical" =====
     ⚙️  EDIT SOUNDS HERE. Every cue is synthesized offline (no files). Each cue is a stack of
     `layers`; set `url` to a sample path to override the synth. Layer params:
       {k:'tone', type:'sine'|'triangle'|'square', freq, freqEnd, dur, vol, attack, delay}
       {k:'noise', dur, vol, hp, lp, color:'glass'|'paper'|'stone', delay}
     Mystical timbre = pure sine partials at harmonic/just intervals (octave 2×, fifth 1.5×,
     shimmer 4–6×) + a whisper of 'glass' air + soft attacks. Keep `vol` small — the master bus
     compressor (audioMasterVolume below) guarantees nothing clips. Turn the per-word/line ticks
     on/off with wordTickEnabled / lineTickEnabled at the bottom. */
  audioMasterVolume: 0.6,
  sounds: {
    enter:        { url: null, minGapMs: 200, layers: [ {k:'tone',type:'sine',freq:660,freqEnd:990,dur:.6,vol:.045,attack:.02}, {k:'tone',type:'sine',freq:1320,dur:.5,vol:.022,delay:.04,attack:.02}, {k:'tone',type:'sine',freq:2640,dur:.4,vol:.009,delay:.09}, {k:'noise',dur:.6,vol:.012,hp:5000,color:'glass'} ] },
    buildStep:    { url: null, minGapMs: 24,  layers: [ {k:'tone',type:'sine',freq:1320,freqEnd:1760,dur:.1,vol:.02,attack:.004}, {k:'tone',type:'sine',freq:2640,dur:.06,vol:.008,delay:.01}, {k:'noise',dur:.04,vol:.006,hp:6000,color:'glass'} ] }, /* crystalline tick */
    capsule:      { url: null, minGapMs: 24,  layers: [ {k:'tone',type:'sine',freq:880,dur:.32,vol:.04,attack:.004}, {k:'tone',type:'sine',freq:1760,dur:.24,vol:.018,delay:.012}, {k:'tone',type:'sine',freq:2640,dur:.18,vol:.008,delay:.02}, {k:'noise',dur:.05,vol:.008,hp:6500,color:'glass'} ] }, /* glass bell forms */
    bounceTop:    { url: null, minGapMs: 40,  layers: [ {k:'tone',type:'sine',freq:1760,dur:.1,vol:.03,attack:.001}, {k:'tone',type:'sine',freq:3520,dur:.05,vol:.01,delay:.004}, {k:'noise',dur:.03,vol:.008,hp:7000,color:'glass'} ] },
    bounceBottom: { url: null, minGapMs: 40,  layers: [ {k:'tone',type:'sine',freq:440,dur:.2,vol:.04,attack:.002}, {k:'tone',type:'sine',freq:660,dur:.14,vol:.018,delay:.01}, {k:'tone',type:'sine',freq:1320,dur:.08,vol:.008,delay:.02} ] },
    swipe:        { url: null, minGapMs: 80,  layers: [ {k:'noise',dur:.34,vol:.022,hp:3000,lp:9000,color:'glass'}, {k:'tone',type:'sine',freq:1760,freqEnd:880,dur:.26,vol:.012,attack:.01} ] },
    page:         { url: null, minGapMs: 120, layers: [ {k:'tone',type:'sine',freq:990,freqEnd:1320,dur:.3,vol:.03,attack:.012}, {k:'tone',type:'sine',freq:1980,dur:.2,vol:.012,delay:.04}, {k:'noise',dur:.22,vol:.012,hp:4500,color:'glass'} ] },
    shutter:      { url: null, minGapMs: 100, layers: [ {k:'tone',type:'sine',freq:2640,dur:.05,vol:.022,attack:.001}, {k:'tone',type:'sine',freq:3960,dur:.03,vol:.01,delay:.006}, {k:'noise',dur:.04,vol:.012,hp:7000,color:'glass'} ] }, /* crisp crystal snap */
    open:         { url: null, minGapMs: 120, layers: [ {k:'tone',type:'sine',freq:660,freqEnd:990,dur:.5,vol:.045,attack:.014}, {k:'tone',type:'sine',freq:1320,dur:.36,vol:.02,delay:.03}, {k:'tone',type:'sine',freq:2640,dur:.26,vol:.009,delay:.07}, {k:'noise',dur:.4,vol:.01,hp:5000,color:'glass'} ] },
    modeSwitch:   { url: null, minGapMs: 50,  layers: [ {k:'tone',type:'sine',freq:990,freqEnd:1320,dur:.12,vol:.034,attack:.003}, {k:'tone',type:'sine',freq:2640,dur:.07,vol:.012,delay:.02} ] },
    play:         { url: null, minGapMs: 50,  layers: [ {k:'tone',type:'sine',freq:784,freqEnd:1175,dur:.18,vol:.04,attack:.004}, {k:'tone',type:'sine',freq:1568,dur:.12,vol:.016,delay:.02}, {k:'tone',type:'sine',freq:3136,dur:.07,vol:.007,delay:.05}, {k:'noise',dur:.05,vol:.006,hp:7000,color:'glass'} ] },
    pause:        { url: null, minGapMs: 50,  layers: [ {k:'tone',type:'sine',freq:660,freqEnd:495,dur:.2,vol:.036,attack:.006}, {k:'tone',type:'sine',freq:1320,freqEnd:990,dur:.12,vol:.013,delay:.01} ] },
    wordTick:     { url: null, minGapMs: 16,  layers: [ {k:'tone',type:'sine',freq:2640,dur:.035,vol:.01,attack:.001}, {k:'noise',dur:.015,vol:.004,hp:8000,color:'glass'} ] },
    lineTick:     { url: null, minGapMs: 30,  layers: [ {k:'tone',type:'sine',freq:2640,freqEnd:1980,dur:.05,vol:.012,attack:.001}, {k:'tone',type:'sine',freq:3960,dur:.03,vol:.005,delay:.004}, {k:'noise',dur:.014,vol:.0035,hp:8000,color:'glass'} ] },  /* soft crystal clink */
    chapter:      { url: null, minGapMs: 200, layers: [ {k:'tone',type:'sine',freq:528,dur:.45,vol:.04,attack:.02}, {k:'tone',type:'sine',freq:792,dur:.36,vol:.022,delay:.04,attack:.02}, {k:'tone',type:'sine',freq:1584,dur:.26,vol:.009,delay:.09}, {k:'noise',dur:.4,vol:.008,hp:5500,color:'glass'} ] }, /* bell bloom */
    complete:     { url: null, minGapMs: 200, layers: [ {k:'tone',type:'sine',freq:660,dur:.6,vol:.045,attack:.02}, {k:'tone',type:'sine',freq:990,dur:.55,vol:.03,delay:.06,attack:.02}, {k:'tone',type:'sine',freq:1320,dur:.5,vol:.018,delay:.12,attack:.02}, {k:'tone',type:'sine',freq:2640,dur:.4,vol:.008,delay:.18}, {k:'noise',dur:.6,vol:.01,hp:5000,color:'glass'} ] },
    select:       { url: null, minGapMs: 70,  layers: [ {k:'tone',type:'sine',freq:1046,freqEnd:1568,dur:.16,vol:.036,attack:.004}, {k:'tone',type:'sine',freq:3136,dur:.09,vol:.011,delay:.02} ] },
    capture:      { url: null, minGapMs: 40,  layers: [ {k:'tone',type:'sine',freq:1568,freqEnd:2349,dur:.09,vol:.026,attack:.001}, {k:'tone',type:'sine',freq:4699,dur:.05,vol:.008,delay:.02}, {k:'noise',dur:.04,vol:.008,hp:8000,color:'glass'} ] },
    unlock:       { url: null, minGapMs: 200, layers: [ {k:'tone',type:'sine',freq:528,freqEnd:1584,dur:.8,vol:.04,attack:.04}, {k:'tone',type:'sine',freq:1056,freqEnd:2640,dur:.6,vol:.02,delay:.1,attack:.04}, {k:'tone',type:'sine',freq:3168,dur:.4,vol:.008,delay:.24}, {k:'noise',dur:.7,vol:.01,hp:5000,color:'glass'} ] }
  },
  wordTickEnabled: false, lineTickEnabled: true,

  /* ╔═══════════════════════════════════════════════════════════════════════╗
     ║  CAPSULE MUSIC — procedural harmonic soundscape tied to rail motion  ║
     ║  Each capsule = one voice in a generative micro-ensemble.             ║
     ║  All values are tunable; set enabled:false to silence entirely.       ║
     ╚═══════════════════════════════════════════════════════════════════════╝
     HARMONIC SYSTEM — circle-of-fifths tonic that slowly drifts, plus a
     diatonic scale-type. Notes are drawn from a weighted pool, favoring
     consonant intervals (3rds, 5ths) and penalizing recent repetitions.
     ZONES — as a capsule approaches a rail boundary (0 or 1) it passes
     through three zones: early → mid → hit.  Each zone triggers a louder,
     more harmonically defined tone.  The VIOLIN layer rises from silence in
     the hit zone and bows until the capsule bounces.  The RESOLUTION bells
     fire on bounce — three layered partials with long glass decay. */
  capsuleMusic: {
    enabled: true,
    masterVol: 0.48,          // overall gain of the capsule music bus

    /* Harmonic framework */
    tonicMidi: 60,            // starting tonic (60 = C4)
    tonicDriftMs: 42000,      // ms before tonic advances one fifth up
    tonicDriftSemitones: 7,   // semitones per drift step (7 = perfect fifth)
    scaleType: 'pentatonic',   // 'pentatonic' | 'major' | 'dorian' | 'lydian' | 'mixolydian'
    scales: {
      pentatonic: [0,2,4,7,9],         // zero dissonance — pure consonance
      major:      [0,2,4,5,7,9,11],
      dorian:     [0,2,3,5,7,9,10],
      lydian:     [0,2,4,6,7,9,11],
      mixolydian: [0,2,4,5,7,9,10]
    },
    /* Consonant interval weights — only pure 3rds, 5ths, 4ths, octaves */
    intervalWeights: { 4:5.0, 5:6.0, 7:7.0, 9:4.0, 12:3.5 },
    /* Violin chord progression — each capsule approach plays the NEXT note of the
       current seventh chord (5 notes each). Consecutive chords share 1-2 pitch
       classes so the staggered capsules build a coherent, evolving harmony.
       Offsets are semitones from the tonic. */
    chordProgression: [
      [0, 4, 7, 11, 14],    // Imaj9   (do mi sol ti re)
      [9, 12, 16, 19, 23],  // vi min9 (shares mi/sol/ti)
      [2, 5, 9, 12, 16],    // ii min9 (shares la/do/mi)
      [7, 11, 14, 17, 21]   // V9      (shares re/fa/la)
    ],

    /* Voice registers — base MIDI note per column (col 0=bass … col 4=treble) */
    voiceRegisters: [36, 43, 48, 52, 55],
    voiceRange: 14,           // semitones the voice can reach above its base

    /* Melodic memory — prevents mechanical repetition */
    memoryDepth: 5,           // how many past notes per voice to remember
    repeatPenalty: 3.5,       // weight multiplier reduction per recent use

    /* Zone thresholds (fraction of rail = distance from either boundary) */
    earlyZone: 0.32,
    midZone:   0.14,
    hitZone:   0.05,
    screenEdgeZone: 0.175,    // 15-20% of rail where violin activates (approaching bounce)
    violinPitchStartOffset: -3, // semitones: violin starts 3 semitones below collision note
    violinPitchGlideDur: 0.64, // seconds: time for violin to glide from start pitch to collision pitch

    /* Minimum ms between triggered notes per capsule (prevents machine-gun) */
    minGapMs: 220,

    /* EARLY phase — sine hint, barely present */
    early: { type:'sine', vol:0.010, dur:0.20, attack:0.08 },

    /* MID phase — triangle tone, clear pitch, gentle envelope */
    mid:   { type:'triangle', vol:0.024, dur:0.30, attack:0.04 },

    /* VIOLIN layer — bowed sawtooth, slow attack, vibrato */
    violin: {
      vol: 0.038,
      attack: 0.55,           // luxurious slow bow-on
      releaseMs: 0,           // HARD STOP at bounce — no tail
      filterFreq: 900,        // warm, dark lowpass
      filterQ: 3.8,
      detune1: 7,             // cents detune on oscillator 2 (chorus)
      detune2: -11,           // cents detune on oscillator 3
      octaveVol: 0.018,       // gentle octave-up harmonic
      vibratoHz: 4.8,
      vibratoDepth: 0.009,
      startDownPct: 0.30,     // approach starts pitched down a RANDOM amount up to this fraction below the collision note
      glideS: 1.1,            // seconds to glide UP into the exact collision note
      glissSteps: 4           // approach is a GLISSANDO through this many of the current scale's notes below the target (auto-tuned to the harmonic scale, not a bare pitch bend)
    },

    /* RESOLUTION — five luxurious bell/chime layers fired on bounce */
    resolution: {
      layers: [
        { type:'sine',     mult:1.00, vol:0.052, dur:2.0, attack:0.003, delay:0.000 },
        { type:'sine',     mult:2.00, vol:0.030, dur:1.5, attack:0.005, delay:0.018 },
        { type:'triangle', mult:3.03, vol:0.016, dur:1.1, attack:0.003, delay:0.032 },
        // Luxury chime layers: random whole-step pitches up 0-2 octaves via circle-of-5ths
        { type:'sine',     multVariable:'chimeHigher1', vol:0.024, dur:2.2, attack:0.004, delay:0.008 },
        { type:'sine',     multVariable:'chimeHigher2', vol:0.018, dur:1.8, attack:0.006, delay:0.026 }
      ]
    }
  }
};
