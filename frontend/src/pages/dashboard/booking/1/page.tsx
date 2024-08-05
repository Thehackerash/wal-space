import { Button, Form, FormProps, Input, InputNumber, message } from "antd";
import axios from "axios";
import { backend_url } from "../../../../utils/link";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const page = () => {
  const token = Cookies.get("accessToken");
  const navigate = useNavigate();

  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/booking/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setWarehouses(response.data.booking);
        setTrucks(response.data.truck);
        setDrivers(response.data.driver);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onFinish: FormProps<any>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      const response = await axios.post(
        `${backend_url}/api/record/`,
        {
          truck_id: values.truck,
          driver_id: values.driver,
          destination: values.destination,
          weight: values.weight,
          expected_arrival_time: values.expected_arrival_time,
          parking_lot: values.parking_lot,
          price: values.price,
          point_of_origin: values.source,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        message.success("Booking successful!");
        navigate("/dashboard/booking/2");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSourceChange = (e:any) => {
    const form = e.target.form;
    const destination = form.elements.destination;
    if (e.target.value === "warehouse") {
      destination.value = "";
    }
  };

  const handleDestinationChange = (e:any) => {
    const form = e.target.form;
    const source = form.elements.source;
    if (e.target.value === "warehouse") {
      source.value = "";
    }
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Destination"
          name="destination"
          rules={[{ required: true, message: "Please input the destination!" }]}
        >
          <Input onChange={handleDestinationChange} />
        </Form.Item>

        <Form.Item
          label="Driver"
          name="driver"
          rules={[{ required: true, message: "Please input the driver!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Truck"
          name="truck"
          rules={[{ required: true, message: "Please input the truck!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Weight"
          name="weight"
          rules={[
            { required: true, message: "Please input the weight!" },
            { type: "number", message: "Please input a valid number!" },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Expected Arrival Time"
          name="expected_arrival_time"
          rules={[{ required: true, message: "Please input the arrival time!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Parking Lot"
          name="parking_lot"
          rules={[{ required: true, message: "Please input the parking lot!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Source"
          name="source"
          rules={[{ required: true, message: "Please input the source!" }]}
        >
          <Input onChange={handleSourceChange} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default page;
