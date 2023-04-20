import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, ContactShadows, Environment, OrbitControls, TextureLoader } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import { Box, Select, Heading, Text, Button, VStack,Stack, HStack, AspectRatio, Flex } from "@chakra-ui/react";



import * as THREE from "three"
import "./styles.css";

const state = proxy({
  current: null,
  items: {
    tee: "Jungle",
  },
  description: "Jungle T-Shirt",
  moreInfo: "Introducing our new jungle-inspired t-shirt, perfect for those who love the wild outdoors. The shirt features a beautiful jungle texture design, showcasing the lush green foliage and tropical flowers found in the heart of the jungle."
})

const textureLoader = new THREE.TextureLoader()

const textures = {
  Jungle: textureLoader.load("Jungle.jpg"),
  Abstract: textureLoader.load("Abstract.jpg"),
  Checkered: textureLoader.load("Checkered.jpg"),
  Solid: textureLoader.load("Solid.jpg"),
  // Add more textures here
}

function Shoe() {
  const ref = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("mehtasaheb.glb")
  // const { nodes, materials } = useGLTF("vyom.glb")
  // const { nodes, materials } = useGLTF("aryan.glb")
  const [hovered, set] = useState(null)

  useFrame((state) => {
    ref.current.rotation.set(0, Math.PI / 2, 0)
    ref.current.position.set(0,0,0)
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
      value: "Jungle",
      label: "Jungle",
      description: "Jungle T-Shirt",
      moreInfo: "Introducing our new jungle-inspired t-shirt, perfect for those who love the wild outdoors. The shirt features a beautiful jungle texture design, showcasing the lush green foliage and tropical flowers found in the heart of the jungle.",
    },
    {
      value: "Abstract",
      label: "Abstract",
      description: "Abstract T-Shirt",
      moreInfo: "T-shirt with a stunning abstract texture design! Made with high-quality materials, this t-shirt offers both comfort and style. ",
    },
    {
      value: "Checkered",
      label: "Checkered",
      description: "Checkered T-Shirt",
      moreInfo: "This t-shirt features a stylish and timeless checkered design that will elevate any outfit. The pink and white checkered pattern is versatile and can be dressed up or down, making it perfect for any occasion.",
    },
    {
      value: "Solid",
      label: "Solid",
      description: "Solid T-Shirt",
      moreInfo: "This t-shirt features a solid texture design, giving it a sleek and modern look. The texture is created through the use of high-quality fabric and precise stitching,  ensuring both comfort and durability. ",
    },
    // ...other options
  ];
  
  const handleClick = (option) => {
    state.items.tee = option.value;
    state.description = option.description;
    state.moreInfo = option.moreInfo;
  };
  return (
    <VStack
      className="dropdown-container "
      w="100%"
      h="100%"
      p={4}
      spacing={4}
      alignItems="flex-start"
      backgroundColor="gray.100"
      borderRadius="md"
      boxShadow="md"
    >
          <Box width="600px" height="10px"></Box>
      <Heading bgGradient='linear(to-l, #140f0c,  #554e53,  #140f0c)'  bgClip='text' size="2xl">{snap.description}</Heading>
      <Box width="600px" height="100px"></Box>
    
      <Box>
      <Text size="lg" fontWeight="regular">
       
       {snap.moreInfo} <br/>
     
        <Flex alignItems="center">
        
          <Text fontWeight="bold" color="black" mx={1}>
            <br/>$69
          </Text>
          <Text
            textDecoration="line-through"
            textDecorationColor="red"
            color="red"
          >
             <br/> $100
          </Text>
        </Flex>
      </Text>
    </Box>
      <Box width="600px" height="100px"></Box>


      <Stack direction='row' spacing={4}>
  <Button colorScheme='green' variant='solid'>
    Buy Now
  </Button>
  <Button colorScheme='blue' variant='outline'>
    Add to Cart
  </Button>


</Stack>
      <Box width="600px" height="500px"></Box>

      <HStack
        w="100%"
        spacing={4}
        justifyContent="space-around"
        alignItems="center"
        wrap="wrap"
      >
        {textureOptions.map((option) => (
          <Box
            key={option.value}
            onClick={() => handleClick(option)}
            cursor="pointer"
            borderRadius="md"
            boxShadow="md"
            p={2}
          >
            <Box
              width="100px"
              height="100px"
              overflow="hidden"
              borderRadius="8px"
            >
              <img
                src={`${process.env.PUBLIC_URL}/${option.value}.jpg`}
                alt={option.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Text mt={2} textAlign="center">
              {option.label}
            </Text>
          </Box>
        ))}
      </HStack>
    </VStack>
  );
}



export default function App() {
  return (
    
    <>
    <Box w="600px" h="600px" className="render-model">
      <Canvas class="my-canvas" shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Shoe />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
        <OrbitControls
          maxDistance={1.7}
          minDistance={1.1}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={true}
          enablePan={false}
        />
      </Canvas>
      <Picker/>
      </Box>
    </>
  )
}
