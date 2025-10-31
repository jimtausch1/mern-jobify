import { useState } from 'react';

import Wrapper from '../../assets/wrappers/ChartsContainer';
import AreaChart from './AreaChart';
import BarChart from './BarChart';

interface ChartsContainerProps {
  data: object[];
}

export default function ChartsContainer({ data }: ChartsContainerProps) {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
}
