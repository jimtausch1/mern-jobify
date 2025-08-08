import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import { JOB_STATUS } from "../utils/constants";
import StatItem from "./StatItem";

interface StatsContainerProps {
  defaultStats: typeof JOB_STATUS;
}

export default function StatsContainer({ defaultStats }: StatsContainerProps) {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats?.PENDING || 0,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "interviews scheduled",
      count: defaultStats?.INTERVIEW || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: defaultStats?.DECLINED || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
}
