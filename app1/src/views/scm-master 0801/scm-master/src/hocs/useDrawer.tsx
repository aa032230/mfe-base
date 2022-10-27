import {Drawer, Modal} from 'antd';
import React, {useState} from 'react';

import {DrawerConfig} from '@src/components/type';

export default (WrapedComp: any) => {
  return (props: any) => {
    const [drawerConfig, setDrawerConfig] = useState<DrawerConfig>({});
    const [modalConfig, setModalConfig] = useState<DrawerConfig>({});

    const openDrawer = (config: DrawerConfig) => {
      console.log('openDrawer', config);
      setDrawerConfig({
        ...drawerConfig,
        ...config,
        visible: true,
      });
    };

    const closeDrawer = () => {
      setDrawerConfig({
        ...drawerConfig,
        visible: false,
      });
    };

    const openModal = (config: DrawerConfig) => {
      console.log('openModal', config);
      setModalConfig({
        ...modalConfig,
        ...config,
        visible: true,
      });
    };

    const closeModal = () => {
      setModalConfig({
        ...modalConfig,
        visible: false,
      });
    };

    return (
      <>
        <WrapedComp
          {...props}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          openModal={openModal}
          closeModal={closeModal}
          drawerConfig={drawerConfig}
          modalConfig={modalConfig}
        />
      </>
    );
  };
};
