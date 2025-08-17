import Wrapper from '../assets/wrappers/StatItem';

interface StatItemProps {
  count: number | string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bcg: string;
}

export default function StatItem({ count, title, icon, color, bcg }: StatItemProps) {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
}
