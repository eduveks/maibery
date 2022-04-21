import React, { useEffect, useState } from 'react';

import { useParams } from "react-router-dom";

import Unsubscribe from '../../components/Unsubscribe';

function UnsubscribePage() {
  const { uid } = useParams();
  
  return (
    <div className='home'>
      <img src="/images/logo.png"/>
      <h1>Unsubscribe</h1>
      <Unsubscribe uid={uid} />
    </div>
  );
}

export default UnsubscribePage;
