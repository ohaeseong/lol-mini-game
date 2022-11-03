import { ThreeEvent, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React from 'react';
import { CAMERA_MOVE_SPEED, INIT_CAMERA_Y } from '../utils/camera';
import { ICoordinate } from '../types/game';

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  onClick: (coordinate: ICoordinate) => void;
};

const SummonerRiftMap: React.FC<Props> = ({ className, onClick: _onClick }) => {
  const ref = React.useRef(null);
  const vec = new THREE.Vector3();
  const mapModel = useLoader(
    GLTFLoader,
    '/images/three_d_models/summoner_rift_map.glb'
  );

  useFrame((state) => {
    const { x, z } = state.camera.position;
    if (state.mouse.x < -0.9) {
      state.camera.position.lerp(
        vec.set(x - CAMERA_MOVE_SPEED, INIT_CAMERA_Y, z),
        0.1
      );

      state.camera.updateProjectionMatrix();
    }

    if (state.mouse.x > 0.9) {
      state.camera.position.lerp(
        vec.set(x + CAMERA_MOVE_SPEED, INIT_CAMERA_Y, z),
        0.1
      );
      state.camera.updateProjectionMatrix();
    }

    if (state.mouse.y < -0.9) {
      state.camera.position.lerp(
        vec.set(x, INIT_CAMERA_Y, z + CAMERA_MOVE_SPEED),
        0.1
      );
      state.camera.updateProjectionMatrix();
    }

    if (state.mouse.y > 0.9) {
      state.camera.position.lerp(
        vec.set(x, INIT_CAMERA_Y, z - CAMERA_MOVE_SPEED),
        0.1
      );
      state.camera.updateProjectionMatrix();
    }
  });

  return (
    <mesh ref={ref} onClick={onClick} position={[0, 0, 0]}>
      <primitive object={mapModel.scene} />
    </mesh>
  );

  function onClick(
    event: ThreeEvent<MouseEvent> & {
      point: { x: number; y: number; z: number };
    }
  ) {
    const { x, z } = event.point;

    _onClick({
      x,
      y: 17.2,
      z,
    });
  }
};

export default SummonerRiftMap;
