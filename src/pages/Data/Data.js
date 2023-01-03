import React, { useState } from "react";
import { ApiData } from "./Api_data";
import { Switch } from "../../components/Switch/Switch";
import { TimePickerComponent } from "../../components/TimePicker/TimePicker";

export const Data = () => {
  const [uiData, setUIData] = useState(ApiData);

  const changeHandler = (elemid, timeSlotId, shift, updatedTime) => {
    setUIData((uiData) => {
      const updatedUIData = [...uiData];
      const elementIndex = updatedUIData.findIndex(
        (data) => data._id === elemid
      );
      const updatedElement = updatedUIData[elementIndex];
      const TimeSlotIndex = updatedElement.timeSlots.findIndex(
        (data) => data._id === timeSlotId
      );
      const updatedElementSlot = updatedElement.timeSlots[TimeSlotIndex];
      if (validate(updatedElement.timeSlots[TimeSlotIndex - 1], updatedTime)) {
        updatedElementSlot[shift].time = updatedTime;
      } else {
        return updatedUIData;
      }
      updatedElement.timeSlots[TimeSlotIndex] = updatedElementSlot;
      updatedUIData[elementIndex] = updatedElement;
      return updatedUIData;
    });
  };

  const toggleHandler = (elemid) => {
    setUIData((uiData) => {
      const updatedUIData = [...uiData];
      const updatedUIDataElement = updatedUIData.find(
        (data) => data._id === elemid
      );
      updatedUIDataElement.toggle = !updatedUIDataElement.toggle;
      updatedUIData[elemid] = updatedUIDataElement;
      return updatedUIData;
    });
  };

  const validate = (arr, currentTime) => {
    if (arr) {
      let startTime = arr["startsAt"].time;
      let endTime = arr["endsAt"].time;
      let current = currentTime;
      if (current >= startTime && current <= endTime) {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <div className="w-full h-full  flex justify-center items-center">
      <table className="w-4/5 h-52 p-3 border-2 border-solid border-cyan-600">
        <tr>
          <th>Day</th>
          <th></th>
          <th>Start</th>
          <th>End</th>
        </tr>
        {uiData?.length > 0 &&
          uiData.map((rowElement) => {
            return rowElement.timeSlots.map((slot, index) => {
              return (
                <tr key={slot._id}>
                  <td className="text-center">
                    {index === 0 && <p>{slot.startsAt.day}</p>}
                  </td>
                  <td className="text-center ">
                    {index === 0 && (
                      <Switch
                        labelText={slot.startsAt.day + rowElement._id}
                        check={rowElement.toggle}
                        color="#EF476F"
                        toggle={toggleHandler.bind(this, rowElement._id)}
                      />
                    )}
                  </td>
                  {rowElement.toggle && (
                    <>
                      <td className={`text-center`}>
                        <TimePickerComponent
                          change={changeHandler.bind(
                            this,
                            rowElement._id,
                            slot._id,
                            "startsAt"
                          )}
                          value={slot.startsAt.time}
                          nextDay={slot.startsAt.day !== slot.endsAt.day}
                        />
                      </td>
                      <td className={`text-center `}>
                        <TimePickerComponent
                          change={changeHandler.bind(
                            this,
                            rowElement._id,
                            slot._id,
                            "endsAt"
                          )}
                          value={slot.endsAt.time}
                          nextDay={slot.startsAt.day !== slot.endsAt.day}
                        />
                        {slot.startsAt.day !== slot.endsAt.day && (
                          <p>{slot.endsAt.day}</p>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              );
            });
          })}
      </table>
    </div>
  );
};
