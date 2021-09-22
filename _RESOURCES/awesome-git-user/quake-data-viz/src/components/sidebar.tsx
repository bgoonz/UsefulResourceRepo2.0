import { DataList } from "../components/dataList";
import { Chart } from "../components/chart";
import "./styles/sidebar.css";

export const Sidebar = ({
  frequency,
  name,
  quakes,
}: {
  frequency: string;
  name: string;
  quakes: any;
}) => {
  return (
    <div className="sidebar">
      <DataList frequency={frequency} />

      <Chart name={name} quakes={quakes} />
    </div>
  );
};
