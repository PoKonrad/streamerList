import React from 'react';
import { Platform } from '../types';

interface PlatformIconProps {
  platform: Platform;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform }) => {
  return <img src={`/icons/${platform.toLowerCase()}.svg`} height={30} />;
};

export default PlatformIcon;
