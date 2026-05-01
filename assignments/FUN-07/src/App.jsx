import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  Text3D,
  Center,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Stars,
  Float,
  Sparkles,
  Environment,
  Html,
} from '@react-three/drei'
import * as THREE from 'three'
import './App.css'

const TEAL      = '#5ab8c8'
const GOLD      = '#d4a840'
const GOLD_PALE = '#f0d888'
const GREEN     = '#88c878'
const MEADOW    = '#b8deb0'
const SKY       = '#d4ecf8'

// ── Model 1: Magic Crystal Gem ──────────────────────────
function CrystalGem({ position }) {
  const outerRef = useRef()
  const innerRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.6
      outerRef.current.rotation.x = Math.sin(t * 0.4) * 0.1
    }
    if (innerRef.current) {
      const s = 0.9 + Math.sin(t * 2.0) * 0.1
      innerRef.current.scale.setScalar(s)
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.8
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * -0.5
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <group position={position}>
        <mesh ref={outerRef} castShadow>
          <octahedronGeometry args={[0.7, 0]} />
          <MeshTransmissionMaterial
            color={TEAL}
            thickness={1.0}
            roughness={0.05}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.04}
            backside
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={2.5} transparent opacity={0.9} />
        </mesh>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[0.85, 0.022, 8, 64]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
          <torusGeometry args={[0.85, 0.018, 8, 64]} />
          <meshStandardMaterial color={GOLD_PALE} emissive={GOLD} emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>
        <Sparkles count={30} scale={2.5} size={1.5} speed={0.4} color={GOLD_PALE} opacity={0.7} />
      </group>
    </Float>
  )
}

// ── Model 2: Enchanted Torus Knot ───────────────────────
function EnchantedKnot({ position }) {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4
      meshRef.current.rotation.y = t * 0.6
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.05} floatIntensity={0.6}>
      <group position={position}>
        <mesh ref={meshRef} castShadow>
          <torusKnotGeometry args={[0.45, 0.14, 128, 16, 2, 3]} />
          <MeshDistortMaterial
            color={MEADOW}
            emissive={GREEN}
            emissiveIntensity={0.3}
            distort={0.15}
            speed={2}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
        <Sparkles count={20} scale={2} size={1.2} speed={0.3} color={GREEN} opacity={0.5} />
      </group>
    </Float>
  )
}

// ── Model 3: Spell Book ─────────────────────────────────
function SpellBook({ position }) {
  const groupRef = useRef()
  const pageRef  = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.25
    if (pageRef.current)  pageRef.current.rotation.y  = Math.sin(t * 3) * 0.12
  })
  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.5}>
      <group position={position} ref={groupRef}>
        <mesh castShadow>
          <boxGeometry args={[0.65, 0.85, 0.12]} />
          <meshStandardMaterial color='#8b6040' roughness={0.8} />
        </mesh>
        <mesh position={[-0.33, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 0.85, 0.14]} />
          <meshStandardMaterial color='#6a4828' roughness={0.9} />
        </mesh>
        <mesh position={[0.35, 0, 0.07]}>
          <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.065]}>
          <planeGeometry args={[0.35, 0.45]} />
          <meshStandardMaterial color={GOLD_PALE} emissive={GOLD} emissiveIntensity={0.6} transparent opacity={0.5} />
        </mesh>
        <mesh ref={pageRef} position={[0.35, 0, 0.01]}>
          <planeGeometry args={[0.6, 0.8]} />
          <meshStandardMaterial color='#f0ead8' roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  )
}

// ── 3D Name Text ────────────────────────────────────────
function NameText() {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = 2.6 + Math.sin(clock.elapsedTime * 0.7) * 0.08
    }
  })

  return (
    <group ref={groupRef} position={[0, 2.6, 0]}>
      <Center>
        <Text3D
          font='https://unpkg.com/three@0.160.0/examples/fonts/gentilis_regular.typeface.json'
          size={0.36}
          height={0.08}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.005}
          bevelSegments={4}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          Thanyanop Sriwanit
          <meshStandardMaterial
            color={hovered ? GOLD_PALE : '#f0f8f0'}
            emissive={hovered ? GOLD : TEAL}
            emissiveIntensity={hovered ? 0.7 : 0.2}
            roughness={0.3}
            metalness={0.1}
          />
        </Text3D>
      </Center>
      <Center position={[0, -0.58, 0]}>
        <Text3D
          font='https://unpkg.com/three@0.160.0/examples/fonts/gentilis_regular.typeface.json'
          size={0.16}
          height={0.03}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.004}
          bevelSize={0.002}
          bevelSegments={3}
        >
          Robotics & Automation · Third Year
          <meshStandardMaterial color={GOLD_PALE} emissive={GOLD} emissiveIntensity={0.3} roughness={0.4} />
        </Text3D>
      </Center>
    </group>
  )
}

// ── Floating Island ─────────────────────────────────────
function FloatingIsland() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = -1.6 + Math.sin(clock.elapsedTime * 0.4) * 0.06
  })

  const roots  = [...Array(8)].map((_, i) => ({
    angle: (i / 8) * Math.PI * 2,
    r:     2.2 + (i % 3) * 0.3,
    len:   0.4 + (i % 4) * 0.15,
  }))
  const rocks  = [...Array(5)].map((_, i) => ({
    angle: (i / 5) * Math.PI * 2 + 0.3,
    scale: 0.12 + (i % 3) * 0.04,
  }))

  return (
    <group ref={ref}>
      <mesh receiveShadow castShadow position={[0, -1.6, 0]}>
        <cylinderGeometry args={[3.5, 2.5, 0.6, 32]} />
        <meshStandardMaterial color='#7a9060' roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, -1.3, 0]}>
        <cylinderGeometry args={[3.5, 3.5, 0.12, 32]} />
        <meshStandardMaterial color={MEADOW} roughness={0.85} />
      </mesh>
      {roots.map((r, i) => (
        <mesh key={i} position={[Math.cos(r.angle)*r.r, -2.1, Math.sin(r.angle)*r.r]} castShadow>
          <cylinderGeometry args={[0.03, 0.01, r.len, 6]} />
          <meshStandardMaterial color='#6a7850' roughness={1} />
        </mesh>
      ))}
      {rocks.map((r, i) => (
        <mesh key={i} position={[Math.cos(r.angle)*2.5, -1.22, Math.sin(r.angle)*2.5]} castShadow>
          <dodecahedronGeometry args={[r.scale, 0]} />
          <meshStandardMaterial color='#9a9880' roughness={0.95} />
        </mesh>
      ))}
    </group>
  )
}

// ── Iframe Preview Panel ────────────────────────────────
function IframePanel({ position }) {
  const [selected, setSelected] = useState('HOME')

  const pages = [
    { id: 'HOME',   url: '../../index.html',   label: 'Homepage'         },
    { id: 'FUN-01', url: '../FUN-01/index.html',  label: 'My First Website' },
    { id: 'FUN-03', url: '../FUN-03/index.html',  label: 'Counter'          },
    { id: 'FUN-06', url: '../FUN-06/index.html',  label: 'Three.js Scene'   },
  ]

  const current = pages.find(p => p.id === selected)

  return (
    <group position={position}>
      {/* Gold frame */}
      <mesh>
        <boxGeometry args={[3.3, 2.3, 0.05]} />
        <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.2} emissive={GOLD} emissiveIntensity={0.15} />
      </mesh>

      <Html
        transform
        distanceFactor={1}
        position={[0, 0, 0.04]}
        style={{ width: '590px', height: '400px', background: '#f0f8f0', overflow: 'hidden', borderRadius: '2px' }}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Cormorant Garamond, serif' }}>
          {/* Tab strip */}
          <div style={{
            display: 'flex', gap: '5px', padding: '6px 8px',
            background: 'rgba(200,232,200,0.7)',
            borderBottom: '1px solid rgba(120,175,105,0.3)',
            flexShrink: 0,
          }}>
            {pages.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)} style={{
                fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
                fontSize: '11px', padding: '3px 10px',
                border: '1px solid rgba(120,175,105,0.4)', borderRadius: '4px',
                cursor: 'pointer',
                background: selected === p.id ? 'rgba(255,255,255,0.9)' : 'transparent',
                color: selected === p.id ? '#506048' : '#a8bca0',
                transition: 'all 0.15s',
              }}>
                {p.label}
              </button>
            ))}
          </div>
          <iframe src={current.url} title={current.label} style={{ flex: 1, border: 'none' }} loading='lazy' />
        </div>
      </Html>

      {/* Label */}
      <Html transform distanceFactor={1} position={[0, -1.3, 0.04]}
        style={{ width: '320px', textAlign: 'center', pointerEvents: 'none' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '11px', color: '#7a9070', letterSpacing: '0.1em' }}>
          ✦ live preview of my other work ✦
        </p>
      </Html>
    </group>
  )
}

// ── Mote particles ──────────────────────────────────────
function FloatingMotes() {
  const ref = useRef()
  const count = 200
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i*3]   = (Math.random()-0.5)*14
    positions[i*3+1] = (Math.random()-0.5)*8
    positions[i*3+2] = (Math.random()-0.5)*14
  }
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={GOLD_PALE} size={0.04} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

// ── Animated lights ─────────────────────────────────────
function SceneLights() {
  const pointRef = useRef()
  useFrame(({ clock }) => {
    if (pointRef.current) pointRef.current.intensity = 2.5 + Math.sin(clock.elapsedTime * 2) * 0.4
  })
  return (
    <>
      <ambientLight intensity={1.2} color={SKY} />
      <directionalLight position={[6,10,5]} intensity={2.0} color={GOLD_PALE}
        castShadow shadow-mapSize={[2048,2048]}
        shadow-camera-near={0.5} shadow-camera-far={40}
        shadow-camera-left={-10} shadow-camera-right={10}
        shadow-camera-top={10} shadow-camera-bottom={-10}
        shadow-bias={-0.001} />
      <directionalLight position={[-5,4,2]} intensity={0.6} color='#d0eef8' />
      <pointLight ref={pointRef} position={[0,1.5,0]} color={TEAL} intensity={2.5} distance={8} decay={2} />
      <hemisphereLight args={[MEADOW,'#88b878',0.5]} />
    </>
  )
}

// ── App ─────────────────────────────────────────────────
export default function App() {
  return (
    <div className='app-wrap'>

      <nav className='top-nav'>
        <a className='back-btn' href='http://127.0.0.1:5500/index.html'>Back to Spellbook</a>
      </nav>

      <div className='scene-label'>
        <p className='scene-eyebrow'>my react three fiber project</p>
        <h1 className='scene-title'>The Mage's World</h1>
        <p className='scene-note'><em>I used React Three Fiber so Three.js works like React components — pretty cool!</em></p>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 2, 10], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <color attach='background' args={['#cce8f0']} />
        <fog attach='fog' args={['#c8e8d0', 14, 30]} />

        <SceneLights />

        <Suspense fallback={null}>
          <Stars radius={30} depth={20} count={600} factor={2} fade speed={0.5} />

          <NameText />

          {/* 3 distinct 3D models */}
          <CrystalGem    position={[-3.4, 0.8, 0]} />
          <EnchantedKnot position={[3.4,  0.6, 0]} />
          <SpellBook     position={[0,    0.4, 3]} />

          <FloatingIsland />

          {/* Iframe panel */}
          <IframePanel position={[0, 0.4, -2.8]} />

          <FloatingMotes />
          <Environment preset='dawn' />
        </Suspense>

        <OrbitControls
          enableDamping dampingFactor={0.06}
          minDistance={4} maxDistance={18}
          maxPolarAngle={Math.PI * 0.6}
          target={[0, 0.5, 0]}
        />
      </Canvas>

      <div className='hints'>
        <span className='hint'>drag to orbit</span>
        <span className='hint-sep'>·</span>
        <span className='hint'>scroll to zoom</span>
        <span className='hint-sep'>·</span>
        <span className='hint'>hover name to glow</span>
      </div>

      <footer className='page-footer'>
        <p className='footer-quote'><em>"Even if I forget, the spells I've mastered will stay with me."</em></p>
        <p className='footer-credit'>Thanyanop · FRA502 Web Programming · FIBO KMUTT</p>
      </footer>
    </div>
  )
}