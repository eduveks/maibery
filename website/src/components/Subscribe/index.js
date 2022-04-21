import { useState, useEffect } from 'react';

import { Form, Select, Input, Button, notification } from 'antd';

import _service from '@netuno/service-client';

import './index.less';

function Subscribe() {
  const [ categories, setCategories ] = useState([]);
  const [ categoriesLoading, setCategoriesLoading ] = useState(false);
  const [ submitting, setSubmitting ] = useState(false);
  useEffect(() => {
    setCategoriesLoading(true);
    _service({
      method: "GET",
      url: "category/list",
      success: (response) => {
        if (response.json) {
          setCategoriesLoading(false);
          setCategories(response.json);
        } else {
          notification["warning"]({
            message: "Communication",
            description: "We have a problem.",
          });
          setCategoriesLoading(false);
        }
      },
      fail: () => {
        setCategoriesLoading(false);
        notification["error"]({
          message: "Categories",
          description: "Something occurred loading the categories. Please, try again later.",
        });
      },
    });
  }, []);
  const onFinish = (values) => {
    setSubmitting(true);
    _service({
      method: "POST",
      url: "subscribe",
      data: values,
      success: (response) => {
        if (response.json.result) {
          notification["success"]({
            message: "Success",
            description: "You was subscribed successfully.",
          });
          setSubmitting(false);
        } else {
          notification["warning"]({
            message: "Communication",
            description: "We have a problem.",
          });
          setSubmitting(false);
        }
      },
      fail: () => {
        setSubmitting(false);
        notification["error"]({
          message: "Failed",
          description: "Something occurred with submission. Please, try again later.",
        });
      },
    });
  };
  return (
    <div>
      <Form onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Categories"
          name="categories"
        >
          <Select mode="multiple" allowClear>
            {categories.map(({code, name})=> {
              return <Select.Option key={code} value={code}>{name}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              type: "email",
              message: "Invalid e-mail."
            },
            {
              required: true,
              message: 'Please input your e-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Subscribe;
