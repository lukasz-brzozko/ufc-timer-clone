/* eslint-disable react/jsx-props-no-spreading */
import {
  CirclePicker, CirclePickerProps, ColorResult, CustomPicker,
} from 'react-color';

interface CustomColorPickerProps extends CirclePickerProps {
  index: number;
}

function CustomColorPicker({ index, ...props }: CustomColorPickerProps) {
  return (
    <div data-index={index}>
      <CirclePicker {...props} />
    </div>
  );
}

export default CustomColorPicker;
