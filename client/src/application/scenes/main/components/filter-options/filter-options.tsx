import { Select, DatePicker } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

import { CountryCode, Filters } from 'client/interfaces';
import { countryCodeMapper } from 'client/libs/util';
import moment from 'moment';
import { FilterOptionsWrapper } from './filter-options.styled';

export interface FilterOptionsProps {
  value: Filters;
  setter: React.Dispatch<React.SetStateAction<Filters>>;
}

export function FilterOptions({ value, setter }: FilterOptionsProps) {
  return (
    <FilterOptionsWrapper className="home__content__filters__filter-wrapper">
      <Select
        showSearch
        filterOption={(inputValue, option) => {
          return (
            (option.children as unknown as string)
              .toLowerCase()
              .includes(inputValue.toLowerCase()) ||
            (option.value as string)
              .toLowerCase()
              .includes(inputValue.toLowerCase()) ||
            countryCodeMapper[option.value]?.isoCode
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          );
        }}
        defaultValue="global"
        style={{ width: 120 }}
        onChange={(value) => {
          return setter((prev) => ({
            ...prev,
            timestamp: value === CountryCode.GLOBAL ? null : prev.timestamp,
            country: value as CountryCode,
          }));
        }}
      >
        {Object.entries(CountryCode).map(([countryName, countryISO]) => {
          const countryNameFormatted = countryName
            .split('_')
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(' ');

          return (
            <Option key={countryISO} value={countryISO}>
              {countryNameFormatted}
            </Option>
          );
        })}
      </Select>
      <RangePicker
        disabled={value.country === CountryCode.GLOBAL}
        value={
          value.timestamp
            ? [
                moment(value.timestamp.startDate),
                moment(value.timestamp.endDate),
              ]
            : null
        }
        format={'YYYY-MM-DD'}
        disabledDate={(date) => date.isBefore(moment('2020-01-22'))}
        onChange={([startDate, endDate]) =>
          setter((prev) => ({
            ...prev,
            timestamp: {
              startDate: startDate.format('YYYY-MM-DD'),
              endDate: endDate.format('YYYY-MM-DD'),
            },
          }))
        }
      />
    </FilterOptionsWrapper>
  );
}
