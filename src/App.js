import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, ContactShadows, Environment, OrbitControls, TextureLoader } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import { Box, Select, Heading, Text} from "@chakra-ui/react";

import * as THREE from "three"
import "./styles.css";

const state = proxy({
  current: null,
  items: {
    tee: "texture1",
  },
  description: "Outfit 1: Jungle",
  moreInfo: "Jungle texture is inspired by the lush greenery of the forest."
})

const textureLoader = new THREE.TextureLoader()

const textures = {
  texture1: textureLoader.load("1.jpg"),
  texture2: textureLoader.load("2.jpg"),
  texture3: textureLoader.load("3.jpg"),
  texture4: textureLoader.load("4.jpg"),
  // Add more textures here
}

function Shoe() {
  const ref = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("vyom.glb")
  const [hovered, set] = useState(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 4) / 8, -0.2 - (1 + Math.sin(t / 1.5)) / 20)
    // ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
    }
  }, [hovered])
  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        if (e.object.material.name !== "body") {
          e.stopPropagation()
          set(e.object.material.name)
        }
      }}
      onPointerOut={(e) => {
        if (e.object.material.name !== "body") {
          e.intersections.length === 0 && set(null)
        }
      }}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => {
        if (e.object.material.name !== "body") {
          e.stopPropagation()
          state.current = e.object.material.name
        }
      }}>
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.shoe.geometry}
        material={materials.tee}
        material-map={snap.items.tee ? textures[snap.items.tee] : null}
      />
      <mesh receiveShadow castShadow geometry={nodes.shoe_1.geometry} material={materials.body} />
      {/* ... (previous mesh elements) */}
    </group>
  )
}
function Picker() {
  const snap = useSnapshot(state);

  const textureOptions = [
    {
      value: "texture1",
      label: "Jungle",
      description: "This is the Jungle texture.",
      moreInfo: "Jungle texture is inspired by the lush greenery of the forest.",
    },
    {
      value: "texture2",
      label: "Abstract",
      description: "This is the Abstract texture.",
      moreInfo: "Abstract texture features unique and artistic patterns.",
    },
    {
      value: "texture3",
      label: "Checkered",
      description: "This is the Checkered texture.",
      moreInfo: "Checkered texture features unique and artistic patterns.",
    },
    {
      value: "texture4",
      label: "Solid",
      description: "This is the Solid texture.",
      moreInfo: "Solid texture features unique and artistic patterns.",
    },
    // ...other options
  ];
  
  const handleChange = (e) => {
    state.items.tee = e.target.value;
    const selectedOption = textureOptions.find(
      (option) => option.value === e.target.value
    );
    state.description = selectedOption.description;
    state.moreInfo = selectedOption.moreInfo;
  };
  return (
    <Box w="300px" h="300px" className="dropdown-container">
      <Box className="description"><Heading>{snap.description}</Heading></Box>
      <Box className="more-info">{snap.moreInfo}</Box>
      <Box w="20px" h="30px"></Box>
      <Select value={snap.items.tee} onChange={handleChange}>
      {textureOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
          </Select>
    </Box>
  );
  
}



export default function App() {
  return (
    
    <>
      <Canvas class="my-canvas" shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Shoe />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
        <OrbitControls
          maxDistance={1.6}
          minDistance={1.4}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={true}
          enablePan={false}
        />
      </Canvas>
      <Picker />
    </>
  )
}
