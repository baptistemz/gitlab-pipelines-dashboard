import React from 'react';
import _ from 'lodash';
import PipeLineListItem from './PipeLineListItem'

const PipeLineList = ({ list }) => {
  const squashedList = _.groupBy(list, 'ref');
  console.log("squashedList", squashedList)
  return(
    <div>
      {Object.keys(squashedList).map((key, index) => {
        return(
          <PipeLineListItem key={index} pipelineCalls={squashedList[key]} />
        )
      })}
    </div>
  )
}



export default PipeLineList;
