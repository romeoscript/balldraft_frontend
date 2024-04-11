import React from 'react';
import loadingball from '../public/images/loadingball.png';
import Image from 'next/image';
import styled from '@emotion/styled';

// Styled component for the rotating and breathing animation
const BreathingRotatingBall = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: breathingRotating 2s linear infinite;
  width: 100px; 
  height: 100px; 
  border-radius: 50%; 
  @keyframes breathingRotating {
    0%, 100% {
      transform: scale(0.8) rotate(0deg);
    }
    50% {
      transform: scale(1) rotate(180deg);
    }
  }
`;
const Scally = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: breathingRotating 2s linear infinite;
  width: 120px; 
  height: 120px; 
  border-radius: 50%; 
  background: #4096FF;

  @keyframes breathingRotating {
    0%, 100% {
      transform: scale(0.8) rotate(0deg);
    }
    50% {
      transform: scale(1) rotate(180deg);
    }
  }
`;
const Scally1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: breathingRotating 2s linear infinite;
  width: 150px; 
  height: 150px; 
  border-radius: 50%; 
  background:#BAE0FF;

  @keyframes breathingRotating {
    0%, 100% {
      transform: scale(0.8) rotate(0deg);
    }
    50% {
      transform: scale(1) rotate(180deg);
    }
  }
`;

const LoaderBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const Loader = () => {
    return (
        <LoaderBackdrop>
            <Scally1>
                <Scally>
                    <BreathingRotatingBall>
                        <Image src={loadingball} alt="loading" width={100} height={100} layout="fixed" />
                    </BreathingRotatingBall>
                </Scally>
            </Scally1>
        </LoaderBackdrop>
    );
};

export default Loader;
