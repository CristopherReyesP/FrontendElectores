import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

const formatDate = (date, format, locale) => {
  return dateFnsFormat(date, format, { locale });
}

export default function InputFecha({setVotante, votante}) {
  const FORMAT = 'dd/MM/yyyy';

 const handleDayChange = ( day ) => {
     if (day !== undefined ) {
         let n = day.toLocaleDateString();
        setVotante({
            ...votante,
            fechaNacimiento: n
          });
     }
     return
    }
    
  return (
    <DayPickerInput
      inputProps={{ style: { width: '170%'} }}
      formatDate={formatDate}
      format={FORMAT}
      parseDate={parseDate}
      onDayChange={handleDayChange}
      placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
      
      />
  );
}