import { UserInfo } from "@vkontakte/vk-bridge";
import { NavIdProps } from "@vkontakte/vkui";

export interface IUserProps extends NavIdProps {
   fetchedUser?: UserInfo;
}

export interface HomeProps extends NavIdProps {
   fetchedUser?: UserInfo;
}