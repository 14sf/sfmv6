import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import SFMExchange from './SFMExchange';
import Messages from './Messages';
import Groups from './Groups';
import SFMBook from './SFMBook';
import SFMPay from './SFMPay';
import SFMarket from './SFMarket';
import SFMRealEstate from './SFMRealEstate';

const SectionRenderer: React.FC = () => {
  const { activeSection } = useNavigation();

  const sections = {
    exchange: SFMExchange,
    messages: Messages,
    groups: Groups,
    sfmbook: SFMBook,
    sfmpay: SFMPay,
    sfmarket: SFMarket,
    sfmrealestate: SFMRealEstate
  };

  const Component = sections[activeSection] || SFMExchange;
  
  return <Component />;
};

export default SectionRenderer;