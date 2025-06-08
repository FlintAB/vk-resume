import { Snackbar } from "@vkontakte/vkui";
import { themeColor } from "../constants/themeColors"
import { Icon16Done, Icon16ErrorCircleOutline } from "@vkontakte/icons";
import { ISnackBarProps } from "../types/Props";

export const showSuccessSnackBar = ({ message, setSnackBar, appearance }: ISnackBarProps) => {
   const { accent } = themeColor[appearance];

   setSnackBar(
      <Snackbar onClose={() => setSnackBar(null)} before={<Icon16Done fill={accent} />} duration={3000}>
         {message}
      </Snackbar>
   )
}

export const showErrorSnackBar = ({ message, setSnackBar }: ISnackBarProps) => {
   setSnackBar(
      <Snackbar onClose={() => setSnackBar(null)} before={<Icon16ErrorCircleOutline fill='#E646646' />} duration={3000}>
         {message}
      </Snackbar>
   )
}