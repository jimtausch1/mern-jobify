import Wrapper from "../assets/wrappers/StatItem";

interface StatItemProps {
  count: number | string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bcg: string;
}

export default function StatItem({ count, title, icon, color }: StatItemProps) {
  return (
    // <Wrapper color={color} bcg={bcg}></Wrapper>
    <Wrapper color={color}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
}
