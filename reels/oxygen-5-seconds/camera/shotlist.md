# Shotlist: oxygen-5-seconds

Master timeline = audio scene_map.json (VO total 26.2s; each scene gets +1.2s hold → cuts at VO end + hold).

| # | Cut window | VO ends | Camera | Element motion (12fps stepped unless noted) | Entry/exit | Shift timestamp |
|---|-----------|---------|--------|---------------------------------------------|-----------|-----------------|
| 1 | 0.0–5.0s | 3.8 | push-in 1.10× | Earth drops in from top, lands center; red flash overlay at 2.0s; "5 SECONDS" slams scale 3→1 | hard cut in, whip out | 2.0s flash, 3.0s text |
| 2 | 5.0–7.8s | 6.6 | static | Stick figure chest inflates (scale 1→1.3), head shake 3 steps at 6.2s; red ✕ stamps over figure | hard cut | 4.4s (figure pop), 6.2s (shake) |
| 3 | 7.8–11.1s | 9.9 | pan-r 8% | Sky band snaps blue→black in ONE frame (no fade); stars pop sequentially top-down | hard cut | 8.8s (sky snap), 9.5s (stars) |
| 4 | 11.1–15.1s | 13.9 | static | O₂ particles (12 dots) fly OUT of frame left+right; sun ray bends from curved→straight line | hard cut | 12.1s (particles exit), 13.5s (ray) |
| 5 | 15.1–18.8s | 17.6 | static split | Sun scales 1→1.8 harsh; skin swatch grey→red in 2 steps; heat wave lines wiggle | hard cut | 16.1s (sun flare), 17.2s (red skin) |
| 6 | 18.8–22.3s | 21.1 | pull-out 1.15× | Building collapses: 6 stepped frames (intact→tilt→crack→chunks→dust pile), dust drifts up | hard cut | 19.8s (crack), 21.0s (dust) |
| 7 | 22.3–27.4s | 26.2 | push-in to loop frame | O₂ dots flood back inward (reverse of scene 4); counter ticks 4.8→5.0→0.0; end frame = scene 1 framing for seamless loop | whip in, hard loop | 23.3s (dots), 25.0s (counter) |

Motion amplitude check: every scene has ≥1 element moving ≥15% frame width (earth drop, particle flyout, building collapse, dot flood) → exceeds gate.

Pipeline: **bang-motion** (kinetic-typography). Single HTML, 7 scene sections, GSAP timeline with `steps(12)` on element motion, hard-cut `display:none` swaps, static grain overlay 25%.

Transitions: whip = 0.2s x-translate blur swipe. NO fades anywhere.
