import { UserInfo } from "@vkontakte/vk-bridge";
import { NavIdProps } from "@vkontakte/vkui";

export interface IUserProps extends NavIdProps {
   appearance: 'light' | 'dark';
   fetchedUser?: UserInfo;
}

export interface HomeProps extends NavIdProps {
   fetchedUser?: UserInfo;
}
