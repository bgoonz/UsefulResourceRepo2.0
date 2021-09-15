import * as THREE from "three"
import React from "react"
import { Canvas } from "react-three-fiber"
import Model from "../components/model"
import Controls from "../components/controls"
import GLTF from "../components/gatsby.gltf"
import uniforms from "../components/uniforms"
import "../style.css"
import bg from "../pattern.jpg"

uniforms.init(THREE)

const RectAreaLightDecl = ({
  color = "white",
  intensity = 1.5,
  width = 1000,
  height = 400,
  position = [50, 100, -500],
  lookAt = [0, 0, 0],
}) => {
  return (
    <rectAreaLight
      intensity={intensity}
      position={position}
      color={color}
      width={width}
      height={height}
      onUpdate={self => self.lookAt(...lookAt)}
    />
  )
}

export default () => (
  <main style={{ background: `url(${bg})` }}>
    <Canvas
      orthographic
      camera={{ position: [0, 0, 150], zoom: 5 }}
      onCreated={({ gl }) => (
        (gl.shadowMap.enabled = true),
        (gl.shadowMap.type = THREE.PCFSoftShadowMap)
      )}
    >
      <ambientLight intensity={0.2} />
      <pointLight
        intensity={1}
        position={[0, 0, 10]}
        color="#663399"
      />
      <RectAreaLightDecl />
      <RectAreaLightDecl
        intensity={4}
        width={100}
        height={1000}
        position={[0, 0, 500]}
        color="#663399"
      />
      <RectAreaLightDecl
        intensity={1}
        width={500}
        height={1000}
        position={[0, 500, 0]}
      />
      <RectAreaLightDecl
        intensity={0.5}
        width={500}
        height={1000}
        position={[400, 0, 400]}
        color="#ffb238"
      />
      <RectAreaLightDecl
        intensity={5}
        width={1000}
        height={100}
        position={[-400, 0, 400]}
      />
      <Model url={GLTF} />
      <Controls
        autoRotate
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.6}
        rotateSpeed={1}
        maxPolarAngle={Math.PI / 3}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  </main>
)
