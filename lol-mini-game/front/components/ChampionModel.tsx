import { useFrame, BoxGeometryProps, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import classNames from 'classnames';
import * as THREE from 'three';
import React from 'react';
import { INIT_Y } from '../containers/LOLContainer';

const MOVE_SPEED = 0.01;

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  position?: Array<number>;
};

const ChampionModel: React.FC<Props> = ({ className, position, ...props }) => {
  const mesh = React.useRef<THREE.mesh>(null);
  const [move, setMove] = React.useState(false);
  const vec = new THREE.Vector3();
  const championModel = useLoader(
    GLTFLoader,
    '/images/three_d_models/zed.gltf'
  );

  const mixer = new THREE.AnimationMixer(championModel.scene);

  const action = mixer.clipAction(championModel.animations[25]);
  action.play();

  useFrame((_, delta) => {
    mesh.current.position.y = INIT_Y;

    if (mesh.current.position.x < position[0]) {
      mesh.current.position.x += vec.x + MOVE_SPEED;
      setMove(true);
    }

    if (mesh.current.position.x > position[0]) {
      mesh.current.position.x += vec.x - MOVE_SPEED;
    }

    if (mesh.current.position.z < position[2]) {
      mesh.current.position.z += vec.z + MOVE_SPEED;
    }

    if (mesh.current.position.z > position[2]) {
      mesh.current.position.z += vec.z - MOVE_SPEED;
    }

    if (move) {
      mixer?.update(delta);
      // setMove(false);
    }
  });

  return (
    <mesh
      className={classNames('', className)}
      ref={mesh}
      position={[0, 17.2, 0]}
      scale={0.002}
    >
      <primitive object={championModel.scene} />
    </mesh>
  );
};

export default ChampionModel;
