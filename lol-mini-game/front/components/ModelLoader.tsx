import React from 'react';
import { Html, useProgress } from '@react-three/drei';

type Props = {};

const ModelLoader: React.FC<Props> = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

export default ModelLoader;
