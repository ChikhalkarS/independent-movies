import * as THREE from 'three';
import { makeHuman } from './human.js';
import { globe, building, beachPerson, sand, harshSun, rippleOverlay, glowSprite, sparks, streak } from './props.js';
import { materials } from './materials.js';
import { kf, lerp, smooth, easeOut, easeIn, easeInOut, range, clamp, V, cam, place, shake } from './anim.js';

export const DURATION = 29.49;

// [start, text, end?]
export const CAPTIONS = [
  [0.0, 'What if Earth lost oxygen for just five seconds?', 3.8],
  [3.8, 'Holding your breath would not save you.', 6.6],
  [6.6, 'The daytime sky would instantly turn black.', 9.925],
  [9.925, 'No oxygen means nothing to scatter sunlight blue.', 13.95],
  [13.95, 'Every beachgoer would get an instant sunburn.', 17.575],
  [17.575, 'Every concrete building would crumble to dust.', 21.1],
  [21.1, 'Oxygen returns. The counter resets. The loop begins again.', 29.49],
];

// [fadeInStart, fullStart, fullEnd, fadeOutEnd] to black
export const FADES = [
  [0.0, 0.5, 3.3, 3.8],      // Scene 1 fade
  [6.6, 7.1, 9.4, 9.925],    // Scene 3 fade (sky turns black)
  [13.95, 14.45, 17.075, 17.575], // Scene 5 fade (sunburn)
  [17.575, 18.075, 20.6, 21.1],   // Scene 6 fade (building crumbles)
  [21.1, 21.6, 25.75, 26.25],     // Scene 7 fade (oxygen returns)
];

function buildGlobeScene(makeStage) {
  const stage = makeStage({ shadowSize: 0 });
  const g = globe();
  stage.add(g);
  return { scene: stage, globe: g };
}

function buildBeachScene(makeStage) {
  const stage = makeStage({ shadowSize: 5, sunDir: [2, 8, 3] });
  const g = beachPerson();
  stage.add(g.group);
  const s = sand();
  stage.add(s);
  const sun = harshSun();
  stage.add(sun);
  return { scene: stage, human: g.human, skinPlate: g.skinPlate, sun, sunCore: sun.userData.core, sunGlow: sun.userData.glow, sunStreak: sun.children[2] };
}

function buildBuildingScene(makeStage) {
  const stage = makeStage({ shadowSize: 5, sunDir: [-3, 6, 4] });
  const b = building();
  stage.add(b);
  return { scene: stage, building: b, target: b.userData.target };
}

// ---------- SHOT 1: 0.0-3.8 - Hook: Earth with atmosphere ring ----------
function shot1({ makeStage }) {
  const { scene, globe } = buildGlobeScene(makeStage);
  const c = cam(40);
  c.position.set(0, 0.2, 3.5);
  c.lookAt(0, 0, 0);
  return {
    scene, camera: c,
    update(t) {
      const rot = t * 0.08;
      globe.rotation.y = rot;
      globe.userData.atmo.rotation.y = rot * 0.95;
      globe.userData.rim.rotation.y = rot * 0.9;
      c.position.x = Math.sin(t * 0.15) * 0.12;
      c.position.y = 0.2 + Math.sin(t * 0.2) * 0.05;
      c.lookAt(0, 0, 0);
      return { dof: { focus: 3.5, aperture: 0.001, maxblur: 0.004 }, bloom: 0.45, exposure: 1.0 };
    },
  };
}

// ---------- SHOT 2: 3.8-6.6 - Close on atmosphere ring vanishing ----------
function shot2({ makeStage }) {
  const { scene, globe } = buildGlobeScene(makeStage);
  const c = cam(55);
  c.position.set(0, 0.05, 2.2);
  c.lookAt(0, 0, 0);
  return {
    scene, camera: c,
    update(t) {
      const k = clamp(t / 2.8, 0, 1);
      const atmo = globe.userData.atmo;
      const rim = globe.userData.rim;
      atmo.material.opacity = lerp(0.22, 0.0, smooth(k));
      rim.material.opacity = lerp(0.5, 0.0, smooth(k));
      globe.rotation.y = t * 0.05;
      c.position.z = lerp(2.2, 1.8, smooth(k));
      c.lookAt(0, 0, 0);
      return { dof: { focus: 2.0, aperture: 0.002, maxblur: 0.006 }, bloom: 0.6, exposure: lerp(1.0, 1.15, k) };
    },
  };
}

// ---------- SHOT 3: 6.6-9.925 - Sky turns black (daytime -> night) ----------
function shot3({ makeStage }) {
  const { scene, globe } = buildGlobeScene(makeStage);
  const c = cam(38);
  c.position.set(0, 0.15, 3.0);
  c.lookAt(0, 0, 0);
  return {
    scene, camera: c,
    update(t) {
      const k = clamp((t - 3.325) / 3.325, 0, 1); // 3.325s into this shot
      const atmo = globe.userData.atmo;
      const rim = globe.userData.rim;
      const ocean = globe.userData.ocean;
      const land = globe.userData.land;
      atmo.material.opacity = 0;
      rim.material.opacity = 0;
      ocean.material.color.setHex(lerp(0x1c5fa8, 0x050f1e, smooth(k)));
      land.material.color.setHex(lerp(0x2e7d4f, 0x0d1a0f, smooth(k)));
      globe.rotation.y = t * 0.04;
      c.position.z = 3.0;
      c.lookAt(0, 0, 0);
      return { dof: { focus: 3.0, aperture: 0.001, maxblur: 0.004 }, bloom: 0.3, exposure: lerp(1.0, 0.6, smooth(k)) };
    },
  };
}

// ---------- SHOT 4: 9.925-13.95 - No oxygen = no blue scattering (close on atmosphere absence) ----------
function shot4({ makeStage }) {
  const { scene, globe } = buildGlobeScene(makeStage);
  const c = cam(65);
  c.position.set(0.05, 0.02, 1.5);
  c.lookAt(0, 0, 0);
  return {
    scene, camera: c,
    update(t) {
      const k = clamp((t - 3.325) / 4.025, 0, 1);
      globe.rotation.y = t * 0.03;
      const atmo = globe.userData.atmo;
      const rim = globe.userData.rim;
      atmo.material.opacity = 0;
      rim.material.opacity = 0;
      // Subtle pulse on the dark globe
      const pulse = 1.0 + Math.sin(t * 3) * 0.005;
      globe.scale.setScalar(pulse);
      c.lookAt(0, 0, 0);
      return { dof: { focus: 1.5, aperture: 0.003, maxblur: 0.008 }, bloom: 0.2, exposure: 0.55 };
    },
  };
}

// ---------- SHOT 5: 13.95-17.575 - Beach person gets instant sunburn ----------
function shot5({ makeStage }) {
  const { scene, human, skinPlate, sun, sunCore, sunGlow, sunStreak } = buildBeachScene(makeStage);
  const c = cam(42);
  c.position.set(0.6, 1.4, 1.8);
  c.lookAt(0, 1.3, 0);
  const ripple = rippleOverlay(skinPlate);
  scene.add(ripple);
  return {
    scene, camera: c,
    update(t) {
      const k = clamp((t - 13.95) / 3.625, 0, 1);
      // Sun streak animation
      sunCore.rotation.z = t * 0.5;
      sunGlow.material.opacity = 0.4 + Math.sin(t * 8) * 0.1;
      // Skin burn ripple
      const u = ripple.material.uniforms;
      u.uCenter.value.set(0.02, 1.3, 0.1);
      u.uAmp.value = k * 0.8;
      u.uRadius.value = 0.08 + k * 0.15;
      u.uSpot.value = 0.3;
      u.uSpotAmp.value = 1.5;
      u.uRings.value = 180;
      u.uTime.value = t;
      // Camera slow push
      c.position.z = lerp(1.8, 1.4, smooth(k));
      c.lookAt(0, 1.3, 0);
      return { dof: { focus: 1.6, aperture: 0.008, maxblur: 0.015 }, bloom: 0.7, exposure: lerp(0.55, 1.1, smooth(k)) };
    },
  };
}

// ---------- SHOT 6: 17.575-21.1 - Concrete building crumbles to dust ----------
function shot6({ makeStage }) {
  const { scene, building, target } = buildBuildingScene(makeStage);
  const c = cam(36);
  c.position.set(-2.5, 2.0, 3.0);
  c.lookAt(0, 1.6, 0);
  const sparkCount = 200;
  const debris = sparks(sparkCount, {
    speed: 4.0, spread: 2.5, gravity: -9.8, life: 2.0,
    size: 0.015, seed: 77, dir: new THREE.Vector3(0, 1, 0),
    color: [0.55, 0.55, 0.5]
  });
  debris.position.set(0, 1.6, 0);
  scene.add(debris);
  const dustCloud = glowSprite(0x7a7a78, 0.5);
  dustCloud.position.set(0, 1.6, 0);
  scene.add(dustCloud);
  return {
    scene, camera: c,
    update(t) {
      const k = clamp((t - 17.575) / 3.525, 0, 1);
      const collapseStart = 0.3;
      if (k > collapseStart) {
        const ck = clamp((k - collapseStart) / (1 - collapseStart), 0, 1);
        const fall = smooth(ck) * 2.5;
        target.position.y = 1.6 - fall;
        target.rotation.x = smooth(ck) * 0.08;
        target.rotation.z = smooth(ck) * 0.05;
        debris.update(t - collapseStart * 3.525);
        dustCloud.scale.setScalar(lerp(0.01, 1.2, ck));
        dustCloud.material.opacity = lerp(0, 0.6, ck) * (1 - ck * 0.5);
      }
      c.position.y = lerp(2.0, 1.6, smooth(k));
      c.lookAt(0, lerp(1.6, 0.8, smooth(k)), 0);
      return { dof: { focus: 3.0, aperture: 0.006, maxblur: 0.012 }, bloom: 0.4, exposure: lerp(1.1, 0.8, smooth(k)) };
    },
  };
}

// ---------- SHOT 7: 21.1-26.25 - Oxygen returns, loop resets ----------
function shot7({ makeStage }) {
  const { scene, globe } = buildGlobeScene(makeStage);
  const c = cam(40);
  c.position.set(0, 0.2, 3.5);
  c.lookAt(0, 0, 0);
  return {
    scene, camera: c,
    update(t) {
      const k = clamp((t - 21.1) / 5.15, 0, 1);
      const atmo = globe.userData.atmo;
      const rim = globe.userData.rim;
      const ocean = globe.userData.ocean;
      const land = globe.userData.land;
      // Restore atmosphere
      atmo.material.opacity = lerp(0.0, 0.22, smooth(k));
      rim.material.opacity = lerp(0.0, 0.5, smooth(k));
      ocean.material.color.setHex(lerp(0x050f1e, 0x1c5fa8, smooth(k)));
      land.material.color.setHex(lerp(0x0d1a0f, 0x2e7d4f, smooth(k)));
      globe.rotation.y = t * 0.08;
      c.position.z = lerp(3.5, 3.5, 1);
      c.lookAt(0, 0, 0);
      // Counter pulse at end
      const counterPulse = k > 0.85 ? (1 - smooth((k - 0.85) / 0.15)) : 0;
      return {
        dof: { focus: 3.5, aperture: 0.001, maxblur: 0.004 },
        bloom: lerp(0.3, 0.5, smooth(k)),
        exposure: lerp(0.6, 1.0, smooth(k))
      };
    },
  };
}

export const SHOTS = [
  { start: 0.0,    end: 3.8,   build: shot1 },   // Hook
  { start: 3.8,    end: 6.6,   build: shot2 },   // Atmosphere vanishes
  { start: 6.6,    end: 9.925, build: shot3 },   // Sky turns black
  { start: 9.925,  end: 13.95, build: shot4 },   // No scattering blue
  { start: 13.95,  end: 17.575, build: shot5 },  // Beach sunburn
  { start: 17.575, end: 21.1,  build: shot6 },   // Building crumbles
  { start: 21.1,   end: 29.49, build: shot7 },   // Oxygen returns, loop
];