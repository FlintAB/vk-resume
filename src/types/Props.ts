import { UserInfo } from "@vkontakte/vk-bridge";
import { NavIdProps } from "@vkontakte/vkui";

export interface IUserProps extends NavIdProps, HomeProps {
   appearance: 'light' | 'dark'
}

export interface HomeProps extends NavIdProps {
   fetchedUser?: UserInfo;
}

export interface ISnackBarProps extends IUserProps {
   message: string;
   setSnackBar: (snackBar: React.ReactElement | null) => void;
}
