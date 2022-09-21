import React, { Fragment } from 'react';

import InfoBox from '../../components/info-box';
import CheckboxDataEntry from '../data-components/checkbox-data-entry';


interface PlanningDataOfficialDataEntryProps {
    value: any; // TODO: proper structuring!
}

const {useState} = React;

const LongText = ({ content,limit}) => {
  const [showAll, setShowAll] = useState(false);

  const showMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);

  if (content.length <= limit) {
    return <div>{content}</div>
  }
  if (showAll) {
    return <div> 
      {content} 
      <br/>
      <b onClick={showLess}>Shorten description</b>
    </div>
  }
  const toShow = content.substring(0, limit).trim() + "... ";
  return <div> 
    {toShow} 
    <br/>
    <b onClick={showMore}>Show full description</b>
  </div>
}

const Disclaimer = () => { return <Fragment><div><i><u>Disclaimer</u>: these data are currently incomplete and also often do not provide information on minor alterations. For comprehensive information on all applications please visit the local authorities' planning websites.</i></div></Fragment> }

const PlanningDataOfficialDataEntry: React.FC<PlanningDataOfficialDataEntryProps> = (props) => {

    const data = props.value || [];
    if(data.length == 0) {
        return (<Fragment>
                  <InfoBox type='success'>
                  <i>No live planning data available currently for this building polygon via the Planning London DataHub.</i>
                  <br/>
                  <Disclaimer />
                  </InfoBox>
                </Fragment>);
    }
    return (
        <Fragment>
        <InfoBox type='success'>
            <Fragment>
                <div><i>Planning application status is streamed using live data uploaded by local authorities to the <a href={data[0]["data_source_link"]}>{data[0]["data_source"]}</a>.</i></div>
                <br/>
                <div><b>Current planning application status for this site:</b> {data[0]["status"]}</div>
                <div><b>Planning application ID:</b> {data[0]["planning_application_id"]}</div>
                <div><b>Date registered by the planning authority (validation date)</b>: {data[0]["registered_with_local_authority_date"]}</div>
                <div><b>Decision date</b>: {data[0]["decision_date"].toString()}</div>
                <div><b>Planning application link</b>: TODO move here</div>
                <div><b>Description of proposed work</b>: <LongText content = {data[0]["description"]} limit = {400}/></div>
                <div><b>Most recent update by data provider:</b> {data[0]["decision_date"]}</div>
                <br/>
                <Disclaimer />
            </Fragment>
        </InfoBox>
        </Fragment>
        );
};

export default PlanningDataOfficialDataEntry;
