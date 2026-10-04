import React, { useEffect, useRef } from 'react';

interface Background3DProps {
  darkMode: boolean;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
}

interface CircuitChip3D {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  size: number;
}

export const Background3D: React.FC<Background3DProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates with smooth damping
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) / (width / 2); // -1.0 to 1.0
      targetMouseY = (e.clientY - height / 2) / (height / 2); // -1.0 to 1.0
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 1. Particle Cloud Initialization (3D Space)
    const particleCount = Math.min(Math.floor((width * height) / 14000), 80);
    const particles: Particle3D[] = [];
    const goldColor = darkMode ? 'rgba(245, 158, 11,' : 'rgba(217, 119, 6,';
    const cyanColor = darkMode ? 'rgba(56, 189, 248,' : 'rgba(2, 132, 199,';
    const amberColor = darkMode ? 'rgba(251, 191, 36,' : 'rgba(180, 83, 9,';

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * 900 + 150,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.8 + 1.2,
        color: i % 3 === 0 ? goldColor : i % 3 === 1 ? cyanColor : amberColor,
      });
    }

    // 2. Floating 3D Microchips / Avionics Polyhedra
    const chips: CircuitChip3D[] = [
      { x: -width * 0.3, y: -height * 0.2, z: 450, rotX: 0.2, rotY: 0.3, rotZ: 0.1, vRotX: 0.003, vRotY: 0.005, vRotZ: 0.002, size: 70 },
      { x: width * 0.32, y: -height * 0.15, z: 520, rotX: 0.5, rotY: 0.1, rotZ: 0.4, vRotX: -0.004, vRotY: 0.003, vRotZ: -0.002, size: 85 },
      { x: width * 0.25, y: height * 0.3, z: 380, rotX: 0.1, rotY: 0.6, rotZ: 0.2, vRotX: 0.002, vRotY: -0.004, vRotZ: 0.003, size: 60 },
      { x: -width * 0.28, y: height * 0.25, z: 500, rotX: 0.4, rotY: 0.2, rotZ: 0.5, vRotX: -0.003, vRotY: -0.003, vRotZ: 0.004, size: 75 },
    ];

    // Gyroscope rotation angles
    let gyroRotX = 0;
    let gyroRotY = 0;
    let gyroRotZ = 0;
    let gridOffset = 0;

    const fov = 420;

    // Helper: 3D point projection
    const project = (x: number, y: number, z: number) => {
      const scale = fov / Math.max(1, z);
      const px = width / 2 + x * scale;
      const py = height / 2 + y * scale;
      return { px, py, scale };
    };

    // Helper: Rotate point in 3D (Euler angles)
    const rotate3D = (x: number, y: number, z: number, rx: number, ry: number, rz: number) => {
      // Rotate around X
      let y1 = y * Math.cos(rx) - z * Math.sin(rx);
      let z1 = y * Math.sin(rx) + z * Math.cos(rx);
      // Rotate around Y
      let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
      let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
      // Rotate around Z
      let x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
      let y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
      return { x: x3, y: y3, z: z2 };
    };

    const render = () => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // ========================================================
      // 1. ATMOSPHERIC 3D VOLUMETRIC GLOW AURA (Nebula Depth)
      // ========================================================
      const auraGradient = ctx.createRadialGradient(
        width * 0.5 + mouseX * 120,
        height * 0.4 + mouseY * 100,
        40,
        width * 0.5,
        height * 0.45,
        width * 0.75
      );
      if (darkMode) {
        auraGradient.addColorStop(0, 'rgba(245, 158, 11, 0.06)');
        auraGradient.addColorStop(0.35, 'rgba(14, 165, 233, 0.035)');
        auraGradient.addColorStop(0.7, 'rgba(15, 23, 42, 0.0)');
        auraGradient.addColorStop(1, 'rgba(2, 6, 23, 0.0)');
      } else {
        auraGradient.addColorStop(0, 'rgba(245, 158, 11, 0.05)');
        auraGradient.addColorStop(0.4, 'rgba(56, 189, 248, 0.025)');
        auraGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = auraGradient;
      ctx.fillRect(0, 0, width, height);

      // ========================================================
      // 2. 3D CYBER-GRID HORIZON (Infinite Perspective Warp Plane)
      // ========================================================
      gridOffset = (gridOffset + 0.5) % 40;
      const horizonY = height * 0.82;
      const gridPitch = 0.55 + mouseY * 0.12;

      ctx.lineWidth = 1;
      const gridColor = darkMode ? 'rgba(245, 158, 11, 0.07)' : 'rgba(217, 119, 6, 0.05)';
      const pulseColor = darkMode ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.08)';

      // Radiating perspective lines into horizon
      const numRays = 18;
      const vpX = width / 2 + mouseX * 80;
      for (let i = -numRays; i <= numRays; i++) {
        const bottomX = (width / 2) + i * 70 + mouseX * 120;
        ctx.strokeStyle = Math.abs(i) % 4 === 0 ? pulseColor : gridColor;
        ctx.beginPath();
        ctx.moveTo(vpX, horizonY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // Horizontal depth lines with perspective compression
      for (let z = 20; z < 400; z += 35) {
        const effectiveZ = z + gridOffset;
        const lineY = horizonY + (effectiveZ * effectiveZ * 0.0035) * (height - horizonY) * 0.008;
        if (lineY > height) continue;

        const alpha = Math.min(0.12, (lineY - horizonY) / (height - horizonY) * 0.14);
        ctx.strokeStyle = darkMode ? `rgba(245, 158, 11, ${alpha})` : `rgba(217, 119, 6, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(width, lineY);
        ctx.stroke();
      }

      // ========================================================
      // 3. 3D FLOATING SILICON WAFER & MICROCHIP POLYHEDRA
      // ========================================================
      for (const chip of chips) {
        chip.rotX += chip.vRotX;
        chip.rotY += chip.vRotY;
        chip.rotZ += chip.vRotZ;

        // Apply mouse tilt
        const effRotX = chip.rotX + mouseY * 0.4;
        const effRotY = chip.rotY + mouseX * 0.4;

        const s = chip.size;
        // 8 vertices of a 3D rectangular chip
        const vertices = [
          { x: -s, y: -s * 0.6, z: -s * 0.15 },
          { x: s, y: -s * 0.6, z: -s * 0.15 },
          { x: s, y: s * 0.6, z: -s * 0.15 },
          { x: -s, y: s * 0.6, z: -s * 0.15 },
          { x: -s, y: -s * 0.6, z: s * 0.15 },
          { x: s, y: -s * 0.6, z: s * 0.15 },
          { x: s, y: s * 0.6, z: s * 0.15 },
          { x: -s, y: s * 0.6, z: s * 0.15 },
        ];

        // Rotate & project vertices
        const projVerts = vertices.map((v) => {
          const r = rotate3D(v.x, v.y, v.z, effRotX, effRotY, chip.rotZ);
          return project(chip.x + r.x, chip.y + r.y, chip.z + r.z);
        });

        // Draw wireframe edges of chip
        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0], // back face
          [4, 5], [5, 6], [6, 7], [7, 4], // front face
          [0, 4], [1, 5], [2, 6], [3, 7], // connecting edges
        ];

        const chipAlpha = darkMode ? 0.22 : 0.15;
        ctx.strokeStyle = darkMode ? `rgba(245, 158, 11, ${chipAlpha})` : `rgba(217, 119, 6, ${chipAlpha})`;
        ctx.lineWidth = 1.2;

        for (const [start, end] of edges) {
          ctx.beginPath();
          ctx.moveTo(projVerts[start].px, projVerts[start].py);
          ctx.lineTo(projVerts[end].px, projVerts[end].py);
          ctx.stroke();
        }

        // Draw center silicon core node
        const coreProj = project(chip.x, chip.y, chip.z);
        ctx.fillStyle = darkMode ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.3)';
        ctx.beginPath();
        ctx.arc(coreProj.px, coreProj.py, 3.5 * coreProj.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // ========================================================
      // 4. CENTRAL 3D ROTATING AEROSPACE GYROSCOPE (HUD Rings)
      // ========================================================
      gyroRotX += 0.005;
      gyroRotY += 0.007;
      gyroRotZ += 0.003;

      const gyroX = 0;
      const gyroY = -height * 0.08;
      const gyroZ = 480;
      const gyroRadius = Math.min(width, height) * 0.22;

      // Draw 3 concentric gimbal rings in 3D
      const rings = [
        { radius: gyroRadius, rx: gyroRotX + mouseY * 0.5, ry: gyroRotY + mouseX * 0.5, rz: 0, color: 'rgba(245, 158, 11,' },
        { radius: gyroRadius * 0.8, rx: -gyroRotY * 0.8, ry: gyroRotX * 0.7 + mouseX * 0.4, rz: gyroRotZ, color: 'rgba(56, 189, 248,' },
        { radius: gyroRadius * 0.6, rx: gyroRotZ * 1.1, ry: -gyroRotX * 0.9, rz: gyroRotY + mouseY * 0.3, color: 'rgba(251, 191, 36,' },
      ];

      for (const ring of rings) {
        const ringSegments = 32;
        const ringPoints: Array<{ px: number; py: number }> = [];

        for (let i = 0; i <= ringSegments; i++) {
          const theta = (i / ringSegments) * Math.PI * 2;
          const lx = Math.cos(theta) * ring.radius;
          const ly = Math.sin(theta) * ring.radius;
          const lz = 0;

          const rotated = rotate3D(lx, ly, lz, ring.rx, ring.ry, ring.rz);
          const pr = project(gyroX + rotated.x, gyroY + rotated.y, gyroZ + rotated.z);
          ringPoints.push({ px: pr.px, py: pr.py });
        }

        ctx.strokeStyle = `${ring.color} ${darkMode ? '0.14' : '0.10'})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let i = 0; i < ringPoints.length; i++) {
          if (i === 0) ctx.moveTo(ringPoints[i].px, ringPoints[i].py);
          else ctx.lineTo(ringPoints[i].px, ringPoints[i].py);
        }
        ctx.stroke();

        // Draw radar tick markers on the outer ring
        if (ring.radius === gyroRadius) {
          ctx.fillStyle = `${ring.color} ${darkMode ? '0.35' : '0.25'})`;
          for (let i = 0; i < 8; i++) {
            const idx = Math.floor((i / 8) * ringSegments);
            const pt = ringPoints[idx];
            if (pt) {
              ctx.beginPath();
              ctx.arc(pt.px, pt.py, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // ========================================================
      // 5. 3D CONSTELLATION NODES & ELECTRICAL VECTOR ARCS
      // ========================================================
      const projectedList: Array<{ px: number; py: number; scale: number; color: string; size: number }> = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap boundaries in 3D volume
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;
        if (p.z < 100) p.z = 1000;
        if (p.z > 1000) p.z = 100;

        // Mouse Parallax displacement
        const effX = p.x - mouseX * (1100 - p.z) * 0.25;
        const effY = p.y - mouseY * (1100 - p.z) * 0.25;

        const pr = project(effX, effY, p.z);
        projectedList.push({
          px: pr.px,
          py: pr.py,
          scale: pr.scale,
          color: p.color,
          size: p.size,
        });
      }

      // Draw constellation links between close 3D nodes
      ctx.lineWidth = 1;
      const maxDist = 135;
      for (let i = 0; i < projectedList.length; i++) {
        const p1 = projectedList[i];
        for (let j = i + 1; j < projectedList.length; j++) {
          const p2 = projectedList[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (darkMode ? 0.22 : 0.15) * p1.scale;
            ctx.strokeStyle = `${p1.color} ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw projected nodes
      for (const p of projectedList) {
        const radius = Math.max(1.2, p.size * p.scale);
        const alpha = Math.min(1.0, 0.45 * p.scale + 0.1);

        ctx.fillStyle = `${p.color} ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fill();

        // Specular glow for foreground nodes
        if (p.scale > 0.8) {
          ctx.fillStyle = `${p.color} ${alpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
