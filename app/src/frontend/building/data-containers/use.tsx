import React, { Fragment } from 'react';

import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import TextboxDataEntry from '../data-components/textbox-data-entry';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';
import Verification from '../data-components/verification';
import { useDisplayPreferences } from '../../displayPreferences-context';

/**
 * Use view/edit section
 */
const UseView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const switchToIsDomesticMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('is_domestic')
    }
    const { darkLightTheme } = useDisplayPreferences();
      return (
          <Fragment>
              <SelectDataEntry
                  title={dataFields.is_domestic.title}
                  slug="is_domestic"
                  value={props.building.is_domestic}
                  options={["yes", "no", "mixed domestic/non-domestic"]}
                  mode={props.mode}
                  copy={props.copy}
                  onChange={props.onChange}
                  tooltip={dataFields.is_domestic.tooltip}
              />
              <Verification
                  slug="is_domestic"
                  allow_verify={props.user !== undefined && props.building.is_domestic !== null && !props.edited}
                  onVerify={props.onVerify}
                  user_verified={props.user_verified.hasOwnProperty("is_domestic")}
                  user_verified_as={props.user_verified.is_domestic}
                  verified_count={props.building.verified.is_domestic}
              />
              Work from home does not count as office and does not make building non-domestic.
              <button className={`map-switcher-inline ${props.mapColourScale == "is_domestic" ? "enabled-state" : "disabled-state"} btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToIsDomesticMapStyle}>
                    {(props.mapColourScale == "is_domestic")? 'Showing domestic status for specific buildings' : 'Click to see domestic status for specific buildings mapped'}
                </button>
              <InfoBox msg="93% of properties in UK are dwellings so we have set this as the default colour. Can you help us colour-in all non-residential and mixed use buildings, and verify residential buildings too?"></InfoBox>
              <MultiDataEntry
                  title={dataFields.current_landuse_group.title}
                  slug="current_landuse_group"
                  value={props.building.current_landuse_group}
                  mode={props.mode}
                  copy={props.copy}
                  onChange={props.onChange}
                  confirmOnEnter={true}
                  tooltip={dataFields.current_landuse_group.tooltip}
                  placeholder="Type new land use group here"
                  copyable={true}
                  autofill={true}
                  showAllOptionsOnEmpty={true}
              />
              <Verification
                  slug="current_landuse_group"
                  allow_verify={props.user !== undefined && props.building.current_landuse_group !== null && !props.edited}
                  onVerify={props.onVerify}
                  user_verified={props.user_verified.hasOwnProperty("current_landuse_group")}
                  user_verified_as={props.user_verified.current_landuse_group && props.user_verified.current_landuse_group.join(", ")}
                  verified_count={props.building.verified.current_landuse_group}
                  />
              {
                  props.mode != 'view' &&
                  <InfoBox msg="Land use order, shown below, is automatically derived from the land use groups"></InfoBox>
              }
              <DataEntry
                  title={dataFields.current_landuse_order.title}
                  tooltip={dataFields.current_landuse_order.tooltip}
                  slug="current_landuse_order"
                  value={props.building.current_landuse_order}
                  mode={props.mode}
                  disabled={true}
                  copy={props.copy}
                  onChange={props.onChange}
              />
              <SelectDataEntry
                  title={dataFields.current_landuse_source.title}
                  slug="current_landuse_source"
                  value={props.building.current_landuse_source}
                  mode={props.mode}
                  copy={props.copy}
                  onChange={props.onChange}
                  tooltip={dataFields.current_landuse_source.tooltip}
                  placeholder={dataFields.current_landuse_source.example}
                  options={dataFields.current_landuse_source.items}
                  />
              <Verification
                  slug="current_landuse_source"
                  allow_verify={props.user !== undefined && props.building.current_landuse_source !== null && !props.edited}
                  onVerify={props.onVerify}
                  user_verified={props.user_verified.hasOwnProperty("current_landuse_source")}
                  user_verified_as={props.user_verified.current_landuse_source}
                  verified_count={props.building.verified.current_landuse_source}
                  />
        {(props.building.current_landuse_source == "Expert/personal knowledge of building" ||
            props.building.current_landuse_source == "Online streetview image" ||
            props.building.current_landuse_source == null) ? <></> :
            <><MultiDataEntry
                title={dataFields.current_landuse_link.title}
                slug="current_landuse_link"
                value={props.building.current_landuse_link}
                mode={props.mode}
                copy={props.copy}
                onChange={props.onChange}
                tooltip={dataFields.current_landuse_link.tooltip}
                placeholder="https://..."
                editableEntries={true}
                isUrl={true}
                />
            <Verification
                slug="current_landuse_link"
                allow_verify={props.user !== undefined && props.building.current_landuse_link !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("current_landuse_link")}
                user_verified_as={props.user_verified.current_landuse_link}
                verified_count={props.building.verified.current_landuse_link}
                />
            </>
        }
          </Fragment>
        );
};
const UseContainer = withCopyEdit(UseView);

export default UseContainer;
