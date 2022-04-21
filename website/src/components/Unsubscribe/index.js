import { useState, useEffect } from 'react';

import { Form, Select, Input, Button, notification } from 'antd';

import _service from '@netuno/service-client';

import './index.less';

function Unsubscribe({uid}) {
  const [ loading, setLoading ] = useState(false);
  const onClick = () => {
    setLoading(true);
    _service({
      method: "POST",
      url: "unsubscribe",
      data: {uid},
      success: (response) => {
        if (response.json.result) {
          notification["success"]({
            message: "Unsubscribed",
            description: "You are unsubscribed successfully.",
          });
          setLoading(false);
        } else {
          notification["warning"]({
            message: "Communication",
            description: "We have a problem.",
          });
          setLoading(false);
        }
      },
      fail: () => {
        setLoading(false);
        notification["error"]({
          message: "Failed",
          description: "Something occurred with submission. Please, try again later.",
        });
      },
    });
  };
  return (
    <div>
      <p>Are you sure you want to unsubscribe?</p>
      <Button type="danger" loading={loading} onClick={onClick}>
        Unsubscribe
      </Button>
    </div>
  );
}

export default Unsubscribe;
