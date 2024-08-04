import { Button, Form, FormProps, InputNumber, message, Select } from "antd";
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
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/booking/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        // setTrucks(response.data);
        setDestinations(response.data.booking);
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
        `${backend_url}/api/parking-record/`,
        {
          truck_id: values.Truck,
          driver_id: values.driver,
          destination_id: values.destination,
          weight: values.weight,
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
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Select
            showSearch
            placeholder="Select the destination"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={destinations.map((destination: any) => ({
              value: destination?.id,
              label: destination?.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Driver"
          name="driver"
          rules={[{ required: true, message: "Please select a driver!" }]}
        >
          <Select
            showSearch
            placeholder="Select the driver"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={drivers.map((driver: any) => ({
              value: driver?.id,
              label: driver?.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Truck"
          name="Truck"
          rules={[{ required: true, message: "Please select a truck" }]}
        >
          <Select
            showSearch
            placeholder="Select the truck"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={trucks.map((truck: any) => ({
              value: truck?.id,
              label: truck?.license_plate,
            }))}
          />
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
