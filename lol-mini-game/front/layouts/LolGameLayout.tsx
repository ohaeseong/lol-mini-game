import { Canvas } from '@react-three/fiber';
import React from 'react';
import { INIT_CAMERA_Y } from '../utils/camera';
import LOLContainer from '../containers/LOLContainer';

type Props = {};

const LolGameLayout: React.FC<Props> = () => {
  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{
          position: [0, INIT_CAMERA_Y, 0],
          rotation: [-1.2, 0, 0],
        }}
      >
        <LOLContainer />
      </Canvas>
    </div>
  );
};

export default LolGameLayout;
