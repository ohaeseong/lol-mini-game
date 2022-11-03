import React, { Suspense } from 'react';
import Box from '../components/Box';
import ModelLoader from '../components/ModelLoader';
import SummonerRiftMap from '../components/SummonerRiftMap';
import { ICoordinate } from '../types/game';

export const INIT_Y = 17.2;

const LOLContainer: React.FC = () => {
  const [coordinate, setCoordinate] = React.useState<ICoordinate>({
    x: 0,
    y: INIT_Y,
    z: 0,
  });

  return (
    <Suspense fallback={<ModelLoader />}>
      <ambientLight />
      <Box position={Object.values(coordinate)} />
      <SummonerRiftMap onClick={handleClickMap} />
    </Suspense>
  );

  function handleClickMap(coordinate: ICoordinate) {
    setCoordinate({ ...coordinate });
  }
};

export default LOLContainer;
