import * as THREE from 'three';
import { makeHuman, standArmor } from './human.js';
import { glowSprite, sparks, streak, rippleOverlay } from './props.js';
import { materials } from './materials.js';
import { kf, lerp, smooth, easeOut, easeIn, easeInOut, range, clamp, V, cam, place, shake, ikArm } from './anim.js';

export const DURATION = 15.0;

// [start, text, end?] - 1-3 word captions for vertical
export const CAPTIONS = [
  [0.0, 'What if'], [0.7, 'gravity'], [1.3, 'stopped?'],
  [2.0, 'You float'], [2.7, 'upward'],
  [3.5, 'At 1000'], [4.0, 'mph'],
  [4.8, 'Air escapes'], [5.5, 'instantly'],
  [6.5, 'Oxygen'], [7.0, 'burns'],
  [8.0, 'Sky turns'], [8.5, 'white'],
  [9.5, 'Everything'], [10.0, 'ignites'],
  [11.0, 'Then gravity'], [11.7, 'returns'],
  [12.5, 'You fall'], [13.2, 'down'],
  [14.0, 'What if?']
];

// [fadeInStart, fullStart, fullEnd, fadeOutEnd] to black
export const FADES = [[2.8, 3.0, 3.1, 3.3], [11.5, 11.7, 11.8, 12.0]];

function idle(t, k = 1) { return Math.sin(t * 1.6) * 0.012 * k; }
const STAND = {
  lSh: [0.05, 0, 0.16], rSh: [0.05, 0, -0.16], lEl: [-0.25, 0, 0], rEl: [-0.25, 0, 0],
  lHip: [0, 0, 0.07], rHip: [0, 0, -0.07], lAn: [0, 0, -0.07], rAn: [0, 0, 0.07],
};
function standPose(h, t, extra = {}) {
  const p = { ...STAND, ...extra };
  p.chest = [idle(t) + (extra.chest?.[0] || 0), extra.chest?.[1] || 0, extra.chest?.[2] || 0];
  h.setPose(p);
}

// ============ SHOT 1: Person on ground, then floating up (0-3s) ============
function shot1({ makeStage }) {
  const scene = makeStage({ shadowSize: 3 });
  const person = makeHuman('vest');
  person.root.position.set(0, 0, 0.5);
  scene.add(person.root);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(20, 64),
    new THREE.MeshStandardMaterial({ color: 0x333344, roughness: 0.8, metalness: 0.1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  scene.add(ground);

  // Atmosphere particles
  const particles = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(
      new Float32Array(2000 * 3).map((_, i) => (Math.random() - 0.5) * (i % 3 === 1 ? 30 : 20)), 3
    )),
    new THREE.PointsMaterial({ size: 0.02, color: 0x88aaff, transparent: true, opacity: 0.3, depthWrite: false })
  );
  particles.position.y = 2;
  scene.add(particles);

  const c = cam(45);
  c.position.set(0, 1.7, 4);

  return {
    scene, camera: c,
    update(t) {
      standPose(person, t);

      // Person floats up after gravity stops at t=2.0
      const floatUp = t > 2.0 ? easeOut(range(t, 2.0, 3.0)) * 3 : 0;
      person.root.position.y = floatUp;
      person.root.rotation.x = floatUp * 0.15;

      // Particles rise
      particles.position.y = 2 + floatUp * 1.5;
      particles.rotation.y = t * 0.02;

      // Camera follows person
      const k = easeInOut(range(t, 0, 3));
      const targetY = lerp(1.7, 3.5, k);
      place(c, [lerp(0, 0.5, k), targetY, lerp(4, 3.5, k)], [0, targetY - 0.5, 0.5]);

      return { dof: { focus: c.position.distanceTo(new THREE.Vector3(0, targetY, 0.5)), aperture: 0.003, maxblur: 0.008 }, bloom: 0.5 };
    },
  };
}

// ============ SHOT 2: Close up - person floating, air escaping (3-6s) ============
function shot2({ makeStage }) {
  const scene = makeStage({ shadowSize: 1.5 });
  const person = makeHuman('vest');
  person.root.position.set(0, 3.5, 0);
  scene.add(person.root);

  // Air particles rushing upward
  const airGeo = new THREE.BufferGeometry();
  const airPos = new Float32Array(3000 * 3);
  const airVel = new Float32Array(3000 * 3);
  for (let i = 0; i < 3000; i++) {
    airPos[i * 3] = (Math.random() - 0.5) * 8;
    airPos[i * 3 + 1] = Math.random() * 6 + 1;
    airPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    airVel[i * 3 + 1] = 3 + Math.random() * 5; // Upward velocity
  }
  airGeo.setAttribute('position', new THREE.BufferAttribute(airPos, 3));
  airGeo.setAttribute('aVel', new THREE.BufferAttribute(airVel, 3));
  const airMat = new THREE.PointsMaterial({
    size: 0.03, color: 0xaaaaee, transparent: true, opacity: 0.6,
    depthWrite: false, sizeAttenuation: true
  });
  const airParticles = new THREE.Points(airGeo, airMat);
  scene.add(airParticles);

  const c = cam(40);
  c.position.set(1, 3.5, 2);

  return {
    scene, camera: c,
    update(t) {
      const lt = t - 3;
      standPose(person, t, {
        chest: [0.2, 0, 0],
        lSh: [0.8, 0, 0.3], rSh: [-0.8, 0, -0.3],
        lEl: [-1.2, 0, 0], rEl: [-1.2, 0, 0],
        head: [-0.2, 0.3, 0]
      });

      // Air rushing up
      const positions = airParticles.geometry.attributes.position.array;
      const velocities = airParticles.geometry.attributes.aVel.array;
      for (let i = 0; i < 3000; i++) {
        positions[i * 3 + 1] += velocities[i * 3 + 1] * 0.033;
        if (positions[i * 3 + 1] > 8) positions[i * 3 + 1] = 1;
      }
      airParticles.geometry.attributes.position.needsUpdate = true;

      // Camera circles slightly
      const angle = lt * 0.3;
      place(c, [Math.sin(angle) * 1.5, 3.5, Math.cos(angle) * 2.5], [0, 3.5, 0]);

      return { dof: { focus: 2, aperture: 0.005, maxblur: 0.01 }, bloom: 0.6 };
    },
  };
}

// ============ SHOT 3: Oxygen burning - sky turning white (6-9s) ============
function shot3({ makeStage }) {
  const scene = makeStage({ shadowSize: 1 });

  // Sky dome
  const skyGeo = new THREE.SphereGeometry(50, 32, 16);
  const skyMat = new THREE.MeshBasicMaterial({
    color: 0x001133, side: THREE.BackSide, transparent: true, opacity: 1
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  scene.add(sky);

  // Fire/explosion particles
  const fireGeo = new THREE.BufferGeometry();
  const firePos = new Float32Array(5000 * 3);
  const fireLife = new Float32Array(5000);
  const fireColor = new Float32Array(5000 * 3);
  for (let i = 0; i < 5000; i++) {
    const r = 2 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 0.5;
    firePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    firePos[i * 3 + 1] = r * Math.cos(phi) + 3;
    firePos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    fireLife[i] = Math.random();
    fireColor[i * 3] = 1;
    fireColor[i * 3 + 1] = 0.4 + Math.random() * 0.4;
    fireColor[i * 3 + 2] = 0.1;
  }
  fireGeo.setAttribute('position', new THREE.BufferAttribute(firePos, 3));
  fireGeo.setAttribute('aLife', new THREE.BufferAttribute(fireLife, 1));
  fireGeo.setAttribute('aColor', new THREE.BufferAttribute(fireColor, 3));
  const fireMat = new THREE.PointsMaterial({
    size: 0.08, vertexColors: true, transparent: true, opacity: 0.8,
    depthWrite: false, sizeAttenuation: true, blending: THREE.AdditiveBlending
  });
  const fire = new THREE.Points(fireGeo, fireMat);
  scene.add(fire);

  // White flash overlay
  const flashGeo = new THREE.PlaneGeometry(100, 100);
  const flashMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false });
  const flash = new THREE.Mesh(flashGeo, flashMat);
  flash.position.z = -5;
  scene.add(flash);

  const c = cam(50);
  c.position.set(0, 3, 5);

  return {
    scene, camera: c,
    update(t) {
      const lt = t - 6;
      const burnProgress = easeInOut(range(t, 6, 9));

      // Sky color transitions to white
      const skyColor = new THREE.Color().lerpColors(
        new THREE.Color(0x001133),
        new THREE.Color(0xffffff),
        burnProgress
      );
      sky.material.color.copy(skyColor);

      // Fire particles expand and fade
      const positions = fire.geometry.attributes.position.array;
      const lives = fire.geometry.attributes.aLife.array;
      for (let i = 0; i < 5000; i++) {
        const life = (lives[i] + lt * 0.3) % 1;
        lives[i] = life;
        const scale = 1 + life * 3;
        positions[i * 3] *= 1.005;
        positions[i * 3 + 1] *= 1.003;
        positions[i * 3 + 2] *= 1.005;
      }
      fire.geometry.attributes.position.needsUpdate = true;
      fire.geometry.attributes.aLife.needsUpdate = true;

      // White flash at peak
      if (lt > 2.0 && lt < 2.5) {
        flash.material.opacity = Math.sin((lt - 2.0) * Math.PI / 0.5) * 0.8;
      } else {
        flash.material.opacity = 0;
      }

      // Camera pulls back to show scale
      const k = easeInOut(range(t, 6, 9));
      place(c, [0, lerp(3, 5, k), lerp(5, 12, k)], [0, 3, 0]);

      return { dof: { focus: 10, aperture: 0.001, maxblur: 0.005 }, bloom: 0.8 + burnProgress * 0.5 };
    },
  };
}

// ============ SHOT 4: Gravity returns - person falls (9-12s) ============
function shot4({ makeStage }) {
  const scene = makeStage({ shadowSize: 3 });
  const person = makeHuman('vest');
  person.root.position.set(0, 8, 0);
  scene.add(person.root);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(30, 64),
    new THREE.MeshStandardMaterial({ color: 0x222233, roughness: 0.8, metalness: 0.1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  scene.add(ground);

  // Impact sparks
  const impactSparks = sparks(200, { speed: 3, spread: 2, gravity: -10, life: 0.5, size: 0.02, seed: 99, dir: new THREE.Vector3(0, 1, 0), color: [1, 0.8, 0.3] });
  impactSparks.position.set(0, 0.1, 0);
  scene.add(impactSparks);

  const c = cam(45);
  c.position.set(0, 5, 5);

  let hasHit = false;
  let hitTime = 0;

  return {
    scene, camera: c,
    update(t) {
      const lt = t - 9;
      const gravityReturns = t > 11.5;

      if (gravityReturns && !hasHit) {
        hasHit = true;
        hitTime = t;
      }

      let fallY = 8;
      if (t < 11.5) {
        // Floating
        fallY = 8 + Math.sin(t * 2) * 0.1;
      } else {
        // Falling
        const fallTime = t - 11.5;
        fallY = Math.max(0, 8 - fallTime * fallTime * 4.9); // Gravity acceleration
        if (fallY <= 0.1 && !impactSparks.userData.played) {
          impactSparks.userData.played = true;
        }
      }

      person.root.position.y = fallY;

      // Body rotates during fall
      if (t > 11.5) {
        person.root.rotation.x = (t - 11.5) * 1.5;
        person.root.rotation.z = Math.sin((t - 11.5) * 5) * 0.3;
      }

      standPose(person, t, {
        lSh: [0.5, 0, 0.4], rSh: [-0.5, 0, -0.4],
        lEl: [-0.8, 0, 0], rEl: [-0.8, 0, 0],
        head: [0.3, 0, 0]
      });

      // Impact sparks
      if (hasHit) {
        impactSparks.update(t - hitTime);
      }

      // Camera follows fall
      if (t < 11.5) {
        place(c, [0, 5, 5], [0, 8, 0]);
      } else {
        const fallTime = t - 11.5;
        const camY = Math.max(1.5, 8 - fallTime * fallTime * 2);
        place(c, [0, camY, 4], [0, fallY, 0]);
      }

      return { dof: { focus: c.position.distanceTo(new THREE.Vector3(0, fallY, 0)), aperture: 0.004, maxblur: 0.01 }, bloom: 0.4 };
    },
  };
}

// ============ SHOT 5: Brand ending - "What If?" logo (12-15s) ============
function shot5({ makeStage }) {
  const scene = makeStage({ shadowSize: 1 });

  // Question mark ring
  const ringGeo = new THREE.TorusGeometry(1.5, 0.15, 16, 64);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xff6b35, emissive: 0xff6b35, emissiveIntensity: 0.5,
    roughness: 0.2, metalness: 0.3
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  // Dot below
  const dotGeo = new THREE.SphereGeometry(0.25, 16, 16);
  const dotMat = new THREE.MeshStandardMaterial({
    color: 0xff6b35, emissive: 0xff6b35, emissiveIntensity: 0.5,
    roughness: 0.2, metalness: 0.3
  });
  const dot = new THREE.Mesh(dotGeo, dotMat);
  dot.position.y = -2.2;
  scene.add(dot);

  const c = cam(40);
  c.position.set(0, 0, 5);

  return {
    scene, camera: c,
    update(t) {
      const lt = t - 12;
      const progress = easeOut(range(t, 12, 15));

      ring.rotation.z = lt * 0.5;
      ring.scale.setScalar(0.5 + progress * 0.5);
      ring.material.emissiveIntensity = 0.3 + progress * 0.4;

      dot.position.y = -2.2 + (1 - progress) * 1.5;
      dot.scale.setScalar(progress);
      dot.material.emissiveIntensity = 0.3 + progress * 0.4;

      // Slow camera push
      place(c, [0, 0, lerp(5, 4, progress)], [0, 0, 0]);

      return { dof: { focus: 4, aperture: 0.002, maxblur: 0.005 }, bloom: 0.7 };
    },
  };
}

export const SHOTS = [
  { start: 0.0, end: 3.0, build: shot1 },
  { start: 3.0, end: 6.0, build: shot2 },
  { start: 6.0, end: 9.0, build: shot3 },
  { start: 9.0, end: 12.0, build: shot4 },
  { start: 12.0, end: 15.0, build: shot5 },
];