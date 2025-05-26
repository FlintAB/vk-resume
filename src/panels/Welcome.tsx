import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Avatar, Button, Cell, Group, Headline, Panel, PanelHeader, Spacing } from "@vkontakte/vkui";
import { FC } from "react";
import { IUserProps } from "../types/FetchedUser";

export const Welcome: FC<IUserProps> = ({fetchedUser}) => {
   const {first_name, photo_200} = {...fetchedUser};
   const router = useRouteNavigator();

   return   (
      <Panel id="welcome">
         <PanelHeader>VK CV</PanelHeader>
         {fetchedUser && (
         <Group style={{ textAlign: 'center', padding: '24px'}}>
            <Cell before={photo_200 && <Avatar src={photo_200} />}>
               {`Привет, ${first_name}!`}
            </Cell>
            <Spacing size={16} />
            <Headline weight="2" style={{color: '#000000'}}>Хочешь создать профессиональное резюме за пару минут?</Headline>
            <Spacing size={8} />
            <Button size="s" mode="primary" onClick={() => router.push('/form')}>
               Хочу!
            </Button>
         </Group>
         )}
      </Panel>
   )
}