import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Avatar, Button, Cell, Group, Headline, Panel, PanelHeader, Spacing } from "@vkontakte/vkui";
import { FC } from "react";
import { IUserProps } from "../types/Props";
import { themeColor } from "../constants/themeColors";


export const Welcome: FC<IUserProps> = ({fetchedUser, appearance}) => {
   const {first_name, photo_200} = {...fetchedUser};
   const router = useRouteNavigator();
   const { primaryText, secondaryText } = themeColor[appearance];

   return   (
      <Panel id="welcome">
         <PanelHeader>VK CV</PanelHeader>
         {fetchedUser && (
         <Group style={{ textAlign: 'center', padding: '24px'}}>
            <Cell before={photo_200 && <Avatar src={photo_200} />}>
               {`Привет, ${first_name}!`}
            </Cell>

            <Spacing size={16} />

            <Headline weight="2" style={{color: primaryText}}>Хочешь создать профессиональное резюме за пару минут?</Headline>

            <Spacing size={8} />

            <Headline weight="3" style={{color: secondaryText}}>Желаем удачи в поиске работы!</Headline>

            <Spacing size={24}/>

            <Button size="s" mode="primary" onClick={() => router.push('/form')}>
               Хочу!
            </Button>
         </Group>
         )}
      </Panel>
   )
}