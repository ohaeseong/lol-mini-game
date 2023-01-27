import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect } from 'react';
import ObjectList from '../components/ObjectList';
import DefaultLayout from '../layouts/DefaultLayout';
import Button from '../components/Button';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  useEffect(() => {
    const loaded = sessionStorage.getItem('load');
    if (loaded === 'true') {
      setLoading(false);
    }

    if (loading === false) return;

    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('load', 'true');
    }, 5000);
  }, [loading]);

  return (
    <DefaultLayout titleClassName="my-20">
      {loading ? (
        <>
          <Image src="/images/logo.png" width={500} height={200} alt="logo" />
          <div className="relative flex w-1/4 overflow-hidden rounded">
            <div className="flex-1 -rotate-180 ">
              <div className="animate-[progress_5s_ease-in-out] border border-brown-300" />
            </div>
            <div className="flex-1">
              <div className="animate-[progress_5s_ease-in-out] border border-brown-300" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center space-y-16">
            <ObjectList />
            <div>
              <Button size="base" onClick={goToSettingPage()}>
                START
              </Button>
              <Button
                size="base"
                theme="clear"
                className="ml-2"
                onClick={goToSmiteRankPage()}
              >
                RANK
              </Button>
            </div>
          </div>
        </>
      )}
    </DefaultLayout>
  );

  function goToSettingPage(): () => void {
    return () => {
      router.push(`/setting`);
    };
  }

  function goToSmiteRankPage(): () => void {
    return () => {
      router.push(`/smite_rank`);
    };
  }
};

export default Home;
