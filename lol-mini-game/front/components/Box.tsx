import { useFrame, BoxGeometryProps, ThreeElements } from '@react-three/fiber';
import classNames from 'classnames';
import * as THREE from 'three';
import React from 'react';
import { INIT_Y } from '../containers/LOLContainer';

const MOVE_SPEED = 0.01;

type Props = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>['className'];
  position?: Array<number>;
} & BoxGeometryProps;

const Box: React.FC<Props> = ({ className, position, ...props }) => {
  const mesh = React.useRef<THREE.mesh>(null);
  const vec = new THREE.Vector3();
  const [hovered, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  useFrame(() => {
    mesh.current.position.y = INIT_Y;

    if (mesh.current.position.x < position[0]) {
      mesh.current.position.x += vec.x + MOVE_SPEED;

      console.log(mesh.current.position.x);
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
  });

  return (
    <mesh
      className={classNames('', className)}
      {...props}
      ref={mesh}
      scale={1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default Box;
