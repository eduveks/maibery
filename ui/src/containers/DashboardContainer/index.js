import React, { useState, useEffect, useRef } from "react";

import {Button, notification} from 'antd';

import _service from '@netuno/service-client';

import "./index.less";

function DashboardContainer() {
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    _service({
      method: 'POST',
      url: 'jobs/send',
      success: (response) => {
        if (response.json) {
          setLoading(false);
          notification["success"]({
            message: 'E-mails Sent',
            description: 'All e-mails were sent sucessfully.',
            style: {
              marginTop: 100
            }
          });
        }
      },
      fail: (e) => {
        setLoading(false);
        console.log("Service Error", e);
        notification["error"]({
          message: 'E-mails Failed',
          description: 'E-mails were not sent because of a malfunction.',
          style: {
            marginTop: 100
          }
        });
      }
    });
  };

  return (
    <div className="my-dashboard">
      <div className="my-dashboard__button">
        <Button type="primary" onClick={onClick} loading={loading}>Send</Button>
      </div>
    </div>
  );
}

export default DashboardContainer;
