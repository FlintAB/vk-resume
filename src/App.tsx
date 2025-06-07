import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, ConfigProvider } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { ResumeForm, Welcome } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.WELCOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    async function fetchData() {
      try{
      const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);

      // Получение текущего цвета темы
      try {
        const config = await bridge.send('VKWebAppGetConfig');
        setAppearance(config.appearance || 'light');
      } catch (configError) {
        console.warn('Ошибка при подключении к VK config, подключаем стандартное отображение themeColor:', configError);
      }


      setPopout(null);
      } catch (error) {
        console.error('Ошибка VK Bridge:', error);
        setPopout(null);
      }
    }
    fetchData();

    // Подписка на изменение цвета темы
    bridge.subscribe((e) => {
      if (e.detail.type === 'VKWebAppUpdateConfig') {
        setAppearance(e.detail.data.appearance || 'light');
      }
    });

  }, []);

  return (
    <ConfigProvider>
      <SplitLayout>
        <SplitCol>
          <View activePanel={activePanel}>
            <Welcome id={DEFAULT_VIEW_PANELS.WELCOME} fetchedUser={fetchedUser} appearance={appearance}/>
            <ResumeForm id={DEFAULT_VIEW_PANELS.FORM} fetchedUser={fetchedUser} appearance={appearance}/>
          </View>
        </SplitCol>
        {popout}
      </SplitLayout>
    </ConfigProvider>
  );
};
