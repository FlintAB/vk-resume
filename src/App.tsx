import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Welcome } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { ResumeForm } from './panels/ResumeForm';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.WELCOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);

  useEffect(() => {
    async function fetchData() {
      try{
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
      } catch (error) {
        console.error('Ошибка VK Bridge:', error);
        setPopout(null);
      }
    }
    fetchData();
  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Welcome id={DEFAULT_VIEW_PANELS.WELCOME} fetchedUser={fetchedUser}/>
          <ResumeForm id={DEFAULT_VIEW_PANELS.FORM} fetchedUser={fetchedUser}/>
        </View>
      </SplitCol>
      {popout}
    </SplitLayout>
  );
};
