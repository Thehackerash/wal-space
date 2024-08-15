import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
  TimePicker,
} from "antd";
import axios from "axios";
import { backend_url } from "../../../../utils/link";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
const Page = () => {
  const token = Cookies.get("accessToken");
  const navigate = useNavigate();
  // const [form] = Form.useForm();

  const [trucks, setTrucks] = useState<any>([]);
  const [drivers, setDrivers] = useState<any>([]);
  const [warehouses, setWarehouses] = useState([]);
  const [managerWarehouse, setManagerWarehouse] = useState<any>(null);
  const [path, setPath] = useState("");

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
        setManagerWarehouse(response.data.warehouse); // Assuming warehouse is an object with details
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
const csrfToken = Cookies.get("csrftoken");
  const onFinish: FormProps<any>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      const source = path === "incoming" ? values.source : managerWarehouse?.id;
      const destination =
        path === "incoming" ? managerWarehouse.id : values.destination;

      const response = await axios.post(
        `${backend_url}/api/parking-record/insert/`,
        {
          truck_id: values.truck,
          driver_id: values.driver,
          destination: destination,
          weight: values.weight,
          expected_arrival_time: values.expected_arrival_time,
          price: values.price,
          source: source,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-CSRFToken': csrfToken,  
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
      message.error("Booking failed!");
    }
  };

  const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handlePathChange = (value: any) => {
    setPath(value);
  };

  return (
    <div>
      <Form
        name="basic"
        // form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Path"
          name="path"
          rules={[{ required: true, message: "Please select the path!" }]}
        >
          <Select onChange={handlePathChange}>
            <Select.Option value="incoming">Incoming</Select.Option>
            <Select.Option value="outgoing">Outgoing</Select.Option>
          </Select>
        </Form.Item>

        {path === "incoming" && (
          <Form.Item
            label="Source"
            name="source"
            rules={[{ required: true, message: "Please input the source!" }]}
          >
            <Input />
          </Form.Item>
        )}

        {path === "outgoing" && managerWarehouse && (
          <Form.Item
            label="Source"
            name="source"
            initialValue={managerWarehouse.name}
          >
            <Input disabled />
          </Form.Item>
        )}
        {path === "incoming" && managerWarehouse && (
          <Form.Item
            label="Destination"
            name="destination"
            initialValue={managerWarehouse.name}
          >
            <Input disabled />
          </Form.Item>
        )}
        {path === "outgoing" && managerWarehouse && (
          <Form.Item label="Destination" name="destination">
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="Driver"
          name="driver"
          rules={[{ required: true, message: "Please input the driver!" }]}
        >
          <Select>
            {drivers.map((driver: any) => (
              <Select.Option key={driver.id} value={driver.id}>
                {driver.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Truck"
          name="truck"
          rules={[{ required: true, message: "Please input the truck!" }]}
        >
          <Select>
            {trucks.map((truck: any) => (
              <Select.Option key={truck.id} value={truck.id}>
                {truck.name}
              </Select.Option>
            ))}
          </Select>
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
          rules={[
            { required: true, message: "Please input the arrival time!" },
          ]}
        >
       <TimePicker defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
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

export default Page;
